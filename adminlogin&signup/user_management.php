<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reservation";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'login') {
    $username = $_POST['user'];
    $password = $_POST['pass'];
    
    // Nag-update ng SQL query para kumonekta sa "signup" table
    $sql = "SELECT * FROM signup WHERE usrname=? AND pass=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Kapag matagumpay ang pag-login
        $login_time = date('Y-m-d H:i:s');
        $status = 'online';

        // I-save ang session sa database
        $stmt = $conn->prepare("INSERT INTO user_sessions (username, login_time, status) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $login_time, $status);
        $stmt->execute();

        $_SESSION['username'] = $username;
        echo "success";
    } else {
        echo "error";
    }
    
    $stmt->close();
}

// Handle logout
if (isset($_POST['action']) && $_POST['action'] == 'logout') {
    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $status = 'offline';

        // I-update ang status sa database
        $stmt = $conn->prepare("UPDATE user_sessions SET status = ? WHERE username = ?");
        $stmt->bind_param("ss", $status, $username);
        $stmt->execute();

        session_destroy();
        echo "logged out";
    }
}

// Monitoring online users
if (isset($_POST['action']) && $_POST['action'] == 'monitor') {
    $result = $conn->query("SELECT username, login_time FROM user_sessions WHERE status = 'online'");
    while ($row = $result->fetch_assoc()) {
        echo "User: " . $row['username'] . " - Login Time: " . $row['login_time'] . "<br>";
    }
}

$conn->close();
?>