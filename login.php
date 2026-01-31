<?php
session_start();
include 'connect.php';

if(isset($_POST['username'])){

    $username=mysqli_real_escape_string($conn,$_POST['username']);
    $password=$_POST['password'];

    $sql="select * from `users` where username='$username' OR email='$username'";
    $result=mysqli_query($conn,$sql);

    if(mysqli_num_rows($result) == 1){
        $row = mysqli_fetch_assoc($result);

        if(password_verify($password, $row['password'])){
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
           header("Location: dashboard.php");
           exit();

        } else{
            echo "Invalid password.";
        }
    } else{
        echo "User not found.";
    }
} 


?>