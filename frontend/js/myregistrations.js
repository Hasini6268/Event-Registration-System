const API_URL = "https://event-registration-system-1-yze2.onrender.com/api/registrations";


// ======================
// Load My Registrations
// ======================

async function loadRegistrations() {

    const token = localStorage.getItem("token");


    if (!token) {

        alert("Please login first!");

        window.location.href = "login.html";

        return;

    }


    try {


        const response = await fetch(`${API_URL}/my`, {

            headers: {

                "Authorization": `Bearer ${token}`

            }

        });


        const data = await response.json();


        const container =
            document.getElementById("registrationContainer");


        container.innerHTML = "";


        if (!response.ok) {


            container.innerHTML =
                `<h3>${data.message || "Failed to load registrations."}</h3>`;


            return;

        }



        if (!data.success ||
            !data.registrations ||
            data.registrations.length === 0) {


            container.innerHTML =
                "<h3>No registrations found.</h3>";


            return;

        }



        data.registrations.forEach(registration => {


            const event = registration.event;


            const card = document.createElement("div");


            card.className = "event-card";



            if (!event) {


                card.innerHTML = `

                    <h2>Event Deleted</h2>

                    <p>This event is no longer available.</p>

                    <p>
                        <strong>Status:</strong>
                        ${registration.status}
                    </p>

                `;


            } else {


                card.innerHTML = `

                    <h2>${event.title}</h2>

                    <p>${event.description}</p>

                    <p>
                        <strong>📅 Date:</strong>
                        ${new Date(event.date).toDateString()}
                    </p>

                    <p>
                        <strong>🕒 Time:</strong>
                        ${event.time}
                    </p>

                    <p>
                        <strong>📍 Venue:</strong>
                        ${event.venue}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${registration.status}
                    </p>


                    <button onclick="cancelRegistration('${registration._id}')">
                        Cancel Registration
                    </button>

                `;


            }


            container.appendChild(card);


        });


    }


    catch (error) {


        console.error("Registration Error:", error);


        document.getElementById("registrationContainer").innerHTML =
            "<h3>Server Error. Unable to load registrations.</h3>";

    }


}



// ======================
// Cancel Registration
// ======================

async function cancelRegistration(id) {


    const token = localStorage.getItem("token");


    if (!confirm("Are you sure you want to cancel this registration?")) {

        return;

    }



    try {


        const response = await fetch(`${API_URL}/cancel/${id}`, {


            method: "PUT",


            headers: {


                "Authorization": `Bearer ${token}`


            }


        });



        const data = await response.json();



        if (response.ok && data.success) {


            alert(
                data.message ||
                "Registration cancelled successfully."
            );


            loadRegistrations();



        } else {


            alert(
                data.message ||
                "Unable to cancel registration."
            );


        }



    }


    catch (error) {


        console.error("Cancel Error:", error);


        alert("Server Error.");

    }


}



// ======================
// Logout
// ======================

const logoutBtn = document.getElementById("logoutBtn");


if (logoutBtn) {


    logoutBtn.addEventListener("click", () => {


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        alert("Logged Out Successfully!");


        window.location.href = "login.html";


    });


}



// ======================
// Load Page
// ======================

window.onload = function () {

    loadRegistrations();

};