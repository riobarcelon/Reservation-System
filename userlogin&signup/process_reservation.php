<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Debug: Print received data
        error_log("POST Data: " . print_r($_POST, true));
        
        // Get the time from timeSlot
        $timeSlot = isset($_POST['timeSlot']) ? $_POST['timeSlot'] : null;
        
        if (!$timeSlot) {
            throw new Exception("Time slot is required");
        }

        $sql = "INSERT INTO config (
            id_number, 
            last_name, 
            first_name, 
            middle_name, 
            reservation_date,
            reservation_time,
            campus,
            equipment,
            cable_type,
            connection_type
        ) VALUES (
            :id_number,
            :last_name,
            :first_name,
            :middle_name,
            :reservation_date,
            :reservation_time,
            :campus,
            :equipment,
            :cable_type,
            :connection_type
        )";
        
        $stmt = $pdo->prepare($sql);

        // Convert date and time to proper format
        $date = date('Y-m-d', strtotime($_POST['reservationDate']));
        $time = date('H:i:s', strtotime($timeSlot));

        // Bind parameters
        $stmt->bindParam(':id_number', $_POST['idNumber']);
        $stmt->bindParam(':last_name', $_POST['lastName']);
        $stmt->bindParam(':first_name', $_POST['firstName']);
        $stmt->bindParam(':middle_name', $_POST['middleName']);
        $stmt->bindParam(':reservation_date', $date);
        $stmt->bindParam(':reservation_time', $time);
        $stmt->bindParam(':campus', $_POST['campus']);
        $stmt->bindParam(':equipment', $_POST['equipment']);
        $stmt->bindParam(':cable_type', $_POST['cable_type']);
        $stmt->bindParam(':connection_type', $_POST['connection_type']);

        // Debug: Print bound parameters
        error_log("Bound parameters: " . print_r([
            'date' => $date,
            'time' => $time,
            'timeSlot' => $timeSlot
        ], true));

        if ($stmt->execute()) {
            header("Location: reservation.html?status=success");
        } else {
            header("Location: reservation.html?status=error&message=Failed to insert data");
        }
        exit();

    } catch(Exception $e) {
        error_log("Error: " . $e->getMessage());
        header("Location: reservation.html?status=error&message=" . urlencode($e->getMessage()));
        exit();
    }
}
?>