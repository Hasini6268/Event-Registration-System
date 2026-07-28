const API_URL = "http://localhost:5000/api";

document
    .getElementById("loginForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");
        message.innerText = "";

        try {

            const response = await fetch(`${API_URL}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok && data.success) {

                // Save token and user details
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login Successful!");

                // Redirect based on role
                if (data.user.role === "admin") {

                    window.location.href = "admin/admin-dashboard.html";

                } else {

                    window.location.href = "events.html";

                }

            } else {

                message.innerText = data.message || "Invalid email or password.";

            }

        } catch (error) {

            console.error(error);

            message.innerText = "Unable to connect to the server. Please try again.";

        }

    });