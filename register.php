<?php

include 'connect.php';

if(isset($_POST['fullname'])){

    $fullname=mysqli_real_escape_string($conn,$_POST['fullname']);
    $username=mysqli_real_escape_string($conn,$_POST['username']);
    $email=mysqli_real_escape_string($conn,$_POST['email']);
    $password=$_POST['password'];
    $comfirm=$_POST['comfirm-password'];

    if($password !== $comfirm){
        die("Passwords do not match");
    }
    
    if (password!== $comfirm){
        echo "Password do not match";
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql="insert into `users` (fullname, username, email, password) values ('$fullname', '$username', '$email', '$hashed_password')";
    
    if(mysqli_query($conn,$sql)){
        echo "Registration successful! <a href='login.html'>Login here</a>";
    } else{
        echo "Error: ". mysqli_error($conn);
    }
}