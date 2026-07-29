const API_URL = "https://event-registration-system-1-yze2.onrender.com/api";


document.addEventListener("DOMContentLoaded", () => {


    const form = document.getElementById("adminLoginForm");


    if (!form) {

        console.error("adminLoginForm not found!");

        return;

    }



    form.addEventListener("submit", async function (e) {


        e.preventDefault();



        const email =
            document.getElementById("email").value.trim();


        const password =
            document.getElementById("password").value.trim();


        const message =
            document.getElementById("message");


        message.innerHTML = "";



        try {



            const response = await fetch(
                `${API_URL}/auth/login`,
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



            console.log("Admin Login Response:", data);



            if (response.ok && data.success) {



                if (data.user.role === "admin") {



                    localStorage.setItem(
                        "token",
                        data.token
                    );


                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );



                    alert("Admin Login Successful!");



                    window.location.href =
                        "admin-dashboard.html";



                } else {



                    message.innerHTML =
                        "You are not an admin.";


                }



            } else {



                message.innerHTML =
                    data.message ||
                    "Invalid email or password.";


            }




        } catch (error) {



            console.error(
                "Admin Login Error:",
                error
            );


            message.innerHTML =
                "Unable to connect to server.";


        }



    });


});