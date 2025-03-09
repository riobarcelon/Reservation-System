<?php
// signup.php

// Database connection
$servername = "localhost"; // o ang iyong database server
$username = "root"; // ilagay ang iyong database username
$password = ""; // ilagay ang iyong database password
$dbname = "reservation"; // pangalan ng database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $usrname = $_POST['usrname'];
    $pass = $_POST['pass'];
    $confirmpass = $_POST['confirmpass'];

    // Check if passwords match
    if ($pass !== $confirmpass) {
        echo "Passwords do not match.";
        exit();
    }

    // Hash the password
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO signup (fname, lname, usrname, pass) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fname, $lname, $usrname, $hashed_pass);
    
    // Execute statement
    if ($stmt->execute()) {
        echo "Sign up successful!";
        header("Location: index.html");
        exit();
    } else {
        echo "Error: " . $stmt->error; // I-print ang error message
    }
    
    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>