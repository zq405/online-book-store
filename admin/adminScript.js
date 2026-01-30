//logout function

function logout() {
    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("currentAdminUser");
        window.location.href = "adminLogin.html";
    }
}

//login function
document.addEventListener("DOMContentLoaded", function() {

    //admin username n password
    const adminCredentials = {
        username: "ku",
        email: "ku@bookverse.com",
        password: "admin123"
    };

    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMessage");

    if (loginForm) {
        
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const usernameInput = document.getElementById("username").value.trim();
            const passwordInput = document.getElementById("password").value.trim();
            
            if(errorMsg) errorMsg.style.display = "none";
            
            if (usernameInput === "" || passwordInput === "") {
                showError("Please enter both username and password.");
                return;
            }
            
            if ((usernameInput === adminCredentials.username || usernameInput === adminCredentials.email) && 
                passwordInput === adminCredentials.password) {
                
                //save user to localStorage so dashboard can display the name
                localStorage.setItem("currentAdminUser", usernameInput);

                //visual feedback (User)
                const btn = loginForm.querySelector("button");
                btn.textContent = "Success! Redirecting...";
                btn.style.backgroundColor = "#2ecc71";
                
                setTimeout(function() {
                    window.location.href = "adminDashboard.html";
                }, 1000);

            } else {
                //failure
                showError("Invalid username or password.");
                document.getElementById("password").value = "";
            }
        });
    }

    function showError(msg) {
        if(errorMsg) {
            errorMsg.textContent = msg;
            errorMsg.style.display = "block";
        } else {
            alert(msg);
        }
    }
});