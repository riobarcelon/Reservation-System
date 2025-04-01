<?php
   header('Content-Type: application/json');

   // Database connection
   $servername = "localhost";
   $username = "root"; // Default XAMPP username
   $password = ""; // Default XAMPP password
   $dbname = "reservation"; // Your database name

   $conn = new mysqli($servername, $username, $password, $dbname);

   // Check connection
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   }

   $method = $_SERVER['REQUEST_METHOD'];

   if ($method === 'POST') {
       $username = $_POST['username'];
       $date = $_POST['reservationDate'];
       $time_slot = $_POST['timeSlot'];

       $sql = "INSERT INTO reservations (username, date, time_slot) VALUES ('$username', '$date', '$time_slot')";

       if ($conn->query($sql) === TRUE) {
           echo json_encode(['status' => 'success']);
       } else {
           echo json_encode(['status' => 'error', 'message' => $conn->error]);
       }
   } else {
       http_response_code(405);
       echo json_encode(['error' => 'Method not allowed']);
   }

   $conn->close();
   ?>