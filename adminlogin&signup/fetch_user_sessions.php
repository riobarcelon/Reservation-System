<?php
include 'connection.php';

$sql = "SELECT username, login_time, status FROM user_sessions";
$result = $conn->query($sql);

$sessions = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $sessions[] = $row;
    }
}

echo json_encode($sessions);

$conn->close();
?>