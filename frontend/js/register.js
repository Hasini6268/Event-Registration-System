const API_URL = "http://localhost:5000/api";

document
.getElementById("registerForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${API_URL}/auth/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullName,
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            document.getElementById("message").innerText = data.message;

        }

    } catch (error) {

        document.getElementById("message").innerText = "Server Error";

    }

});