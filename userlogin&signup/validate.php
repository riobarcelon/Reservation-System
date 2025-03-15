<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['user'];
    $password = $_POST['pass'];
    
    // Nag-update ng SQL query para kumonekta sa "signup" table
    $sql = "SELECT * FROM signup WHERE usrname=? AND pass=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo "success";
    } else {
        echo "error";
    }
    
    $stmt->close();
    $conn->close();
}
?>