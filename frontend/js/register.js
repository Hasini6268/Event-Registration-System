const API_URL = "https://event-registration-system-1-yze2.onrender.com/api";

const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!fullName || !email || !password) {
        message.innerText = "Please fill all fields";
        return;
    }

    try {

        message.innerText = "Registering...";

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

        console.log("Register Response:", data);


        if (response.ok && data.success) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            message.innerText = data.message || "Registration failed";

        }


    } catch (error) {

        console.error("Register Error:", error);

        message.innerText =
            "Cannot connect to server. Please try again later.";

    }

});