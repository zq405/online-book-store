<?php
header('Content-Type: application/json');

include 'connect.php';

$username = '';
if(isset($_GET['username'])) $username = $_GET['username'];
if(isset($_POST['username'])) $username = $_POST['username'];

if(empty($username)){
    echo json_encode(['available' => false]);
    exit;
}

$username = mysqli_real_escape_string($conn, $username);

$sql = "SELECT id FROM users WHERE username = '$username' LIMIT 1";
$res = mysqli_query($conn, $sql);

if(!$res){
    echo json_encode(['available' => false, 'error' => 'Query failed: ' . mysqli_error($conn)]);
} elseif(mysqli_num_rows($res) > 0){
    echo json_encode(['available' => false]);
} else {
    echo json_encode(['available' => true]);
}
?>
