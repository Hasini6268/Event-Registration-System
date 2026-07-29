// ===========================================
// Dashboard Script
// ===========================================


// API URL

const API_URL = "https://event-registration-system-1-yze2.onrender.com/api";


// ===========================================
// Authentication Check
// ===========================================

const token = localStorage.getItem("token");


if (!token) {

    alert("Please login first!");

    window.location.href = "login.html";

}


// ===========================================
// Welcome Message
// ===========================================

const user = JSON.parse(localStorage.getItem("user"));


if (user && user.fullName) {

    const welcomeMessage =
        document.getElementById("welcomeMessage");


    if (welcomeMessage) {

        welcomeMessage.innerHTML = `
            Welcome, <span style="color:#facc15;">
            ${user.fullName}
            </span>
        `;

    }

}


// ===========================================
// Load Dashboard Data
// ===========================================

async function loadDashboard() {


    try {


        // -------------------------------
        // Total Events
        // -------------------------------


        const eventsResponse = await fetch(
            `${API_URL}/events`
        );


        const eventsData = await eventsResponse.json();


        document.getElementById("totalEvents").innerText =
            eventsData.events
                ? eventsData.events.length
                : 0;



        // -------------------------------
        // My Registrations
        // -------------------------------


        const registrationResponse = await fetch(
            `${API_URL}/registrations/my`,
            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }
        );


        const registrationData =
            await registrationResponse.json();



        let active = 0;

        let cancelled = 0;



        if (registrationData.registrations) {


            registrationData.registrations.forEach(
                registration => {


                    if (registration.status === "Registered") {


                        active++;


                    } else {


                        cancelled++;


                    }


                }
            );


        }



        document.getElementById("myRegistrations").innerText =
            active;


        document.getElementById("cancelledRegistrations").innerText =
            cancelled;



    }


    catch (error) {


        console.error("Dashboard Error:", error);


        alert("Unable to load dashboard.");


    }


}



// ===========================================
// Logout
// ===========================================


const logoutBtn = document.getElementById("logoutBtn");


if (logoutBtn) {


    logoutBtn.addEventListener("click", () => {


        if (confirm("Are you sure you want to logout?")) {


            localStorage.removeItem("token");

            localStorage.removeItem("user");


            alert("Logged Out Successfully!");


            window.location.href = "login.html";


        }


    });


}



// ===========================================
// Load Dashboard
// ===========================================


window.onload = () => {

    loadDashboard();

};