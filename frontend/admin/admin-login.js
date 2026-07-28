console.log("admin-login.js loaded");
alert("admin-login.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("adminLoginForm");

    if (!form) {
        alert("Error: adminLoginForm not found!");
        return;
    }

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        alert("Login button clicked");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");
        message.innerHTML = "";

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log(data);
            alert(JSON.stringify(data));

            if (response.ok && data.success) {

                if (data.user.role === "admin") {

                    localStorage.setItem("token", data.token);

                    message.innerHTML = "Login Successful";

                    alert("Admin Login Successful!");

                    window.location.href = "admin-dashboard.html";

                } else {

                    message.innerHTML = "You are not an admin.";
                    alert("This account is not an admin.");

                }

            } else {

                message.innerHTML = data.message || "Invalid email or password.";
                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            message.innerHTML = "Server error.";

            alert("Server Error: " + error.message);

        }

    });

});