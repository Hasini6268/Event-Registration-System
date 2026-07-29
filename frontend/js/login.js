const API_URL = "https://event-registration-system-1-yze2.onrender.com/api";


const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");


if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();


        message.innerText = "";


        if (!email || !password) {

            message.innerText = "Please enter email and password.";

            return;

        }


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


            console.log("Login Response:", data);



            if (response.ok && data.success) {


                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                alert("Login Successful!");


                if (data.user.role === "admin") {


                    window.location.href =
                        "admin/admin-dashboard.html";


                } else {


                    window.location.href =
                        "events.html";


                }


            } else {


                message.innerText =
                    data.message || "Invalid email or password.";


            }


        } catch (error) {


            console.error("Login Error:", error);


            message.innerText =
                "Unable to connect to server. Please try again later.";


        }


    });

}