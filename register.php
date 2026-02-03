<?php

include 'connect.php';

$error = '';
if(isset($_POST['fullname'])){

    $fullname=mysqli_real_escape_string($conn,$_POST['fullname']);
    $username=mysqli_real_escape_string($conn,$_POST['username']);
    $email=mysqli_real_escape_string($conn,$_POST['email']);
    $password=$_POST['password'];
    $confirm=$_POST['confirm_password'];

    if($password !== $confirm){
        $error = "Passwords do not match";
    }

    // Check username uniqueness
    if(empty($error)){
        $check = mysqli_query($conn, "SELECT id FROM users WHERE username = '$username' LIMIT 1");
        if($check && mysqli_num_rows($check) > 0){
            $error = "Username already exists. Please choose another.";
        }
    }

    if(empty($error)){
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql="insert into `users` (fullname, username, email, password) values ('$fullname', '$username', '$email', '$hashed_password')";
        
        if(mysqli_query($conn,$sql)){
            header('Location: signup_success.php');
            exit();
        } else{
            $error = "Error: ". mysqli_error($conn);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - BookVerse</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fbff;
            color: #333;
            margin: 0;
        }
        .login-container {
            max-width: 400px;
            margin: 5rem auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(13, 71, 161, 0.08);
            padding: 2.5rem 2rem 2rem 2rem;
        }
        .login-title {
            text-align: center;
            color: #0d47a1;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            font-weight: bold;
        }
        .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .login-form > div {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
        .login-form label {
            font-weight: 500;
            margin-bottom: 0.3rem;
        }
        .login-form input[type="text"],
        .login-form input[type="email"],
        .login-form input[type="password"] {
            padding: 0.9rem 1rem;
            border: 1.5px solid #bbdefb;
            border-radius: 5px;
            font-size: 1rem;
            background: #f4faff;
            transition: border 0.3s;
            width: 100%;
            box-sizing: border-box;
        }
        .login-form input::placeholder {
            color: #888;
            opacity: 1;
            padding-left: 0;
        }
        .login-form input:focus {
            border: 1.5px solid #0d47a1;
            outline: none;
        }
        .login-btn {
            padding: 0.9rem;
            background: #0d47a1;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background 0.3s;
        }
        .login-btn:hover {
            background: #1565c0;
        }
        .login-links {
            text-align: center;
            margin-top: 1.2rem;
        }
        .login-links a {
            color: #0d47a1;
            text-decoration: none;
            margin: 0 0.5rem;
            font-weight: 500;
            transition: color 0.3s;
        }
        .login-links a:hover {
            color: #1565c0;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-title">Create Your BookVerse Account</div>
        <?php if(!empty($error)){ echo '<div style="color:#d32f2f;margin-bottom:10px;">'.htmlspecialchars($error).'</div>'; } ?>
        <form class="login-form" method="POST" action="register.php">
            <div>
                <label for="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" placeholder="Your full name" required>
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" required>
            </div>
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Choose a username" required>
                <div id="username-msg" style="margin-top:6px;font-size:0.95rem;color:#d32f2f;"></div>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Create a password" required>
            </div>
            <div>
                <label for="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Repeat your password" required>
            </div>
            <button type="submit" id="signup-btn" class="login-btn">Sign Up</button>
        </form>
        <div class="login-links">
            Already have an account? <a href="Login.html">Login</a>
        </div>
    </div>
    <script>
        (function(){
            const username = document.getElementById('username');
            const msg = document.getElementById('username-msg');
            const signupBtn = document.getElementById('signup-btn');
            let timer = null;
            let lastChecked = '';
            let available = true;

            function setState(isAvailable, text){
                available = isAvailable;
                if(isAvailable){
                    msg.style.color = '#2e7d32';
                } else {
                    msg.style.color = '#d32f2f';
                }
                msg.textContent = text;
                signupBtn.disabled = !isAvailable;
            }

            function checkUsername(name){
                if(!name) { setState(false, 'Enter a username'); return; }
                if(name === lastChecked) return;
                lastChecked = name;
                fetch('check_username.php?username=' + encodeURIComponent(name))
                    .then(r=>r.json())
                    .then(data=>{
                        if(data.available){
                            setState(true, 'Username is available');
                        } else {
                            setState(false, 'Username already taken — please choose another');
                        }
                    })
                    .catch(()=>{
                        setState(false, 'Could not verify username');
                    });
            }

            username.addEventListener('input', function(){
                msg.textContent = '';
                signupBtn.disabled = true;
                clearTimeout(timer);
                const val = this.value.trim();
                timer = setTimeout(()=> checkUsername(val), 400);
            });

            document.querySelector('form.login-form').addEventListener('submit', function(e){
                if(!available){
                    e.preventDefault();
                    username.focus();
                }
            });
        })();
    </script>
</body>
</html>