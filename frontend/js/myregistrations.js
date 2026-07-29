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


    const container = document.getElementById("registrationContainer");


    if (!container) {

        console.error("registrationContainer not found");

        return;

    }


    try {


        const response = await fetch(
            `${API_URL}/my`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        console.log(
            "My Registrations Response:",
            data
        );


        container.innerHTML = "";


        if (!response.ok) {


            container.innerHTML = `

                <div class="empty-message">

                    <h3>
                        ${data.message || "Failed to load registrations."}
                    </h3>

                </div>

            `;

            return;

        }



        if (
            !data.registrations ||
            data.registrations.length === 0
        ) {


            container.innerHTML = `

                <div class="empty-message">

                    <h2>
                        No Registrations Found
                    </h2>

                    <p>
                        Register for an event to see it here.
                    </p>

                </div>

            `;

            return;

        }



        data.registrations.forEach(registration => {


            const event = registration.event;


            const card = document.createElement("div");


            card.className = "event-card";



            if (!event) {


                card.innerHTML = `

                    <h2>
                        Event Removed
                    </h2>

                    <p>
                        This event is no longer available.
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${registration.status}
                    </p>

                `;


            } else {


                card.innerHTML = `

                    <h2>
                        ${event.title}
                    </h2>


                    <p>
                        ${event.description}
                    </p>


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



                    ${
                        registration.status === "Registered"

                        ?

                        `
                        <button onclick="cancelRegistration('${registration._id}')">
                            Cancel Registration
                        </button>
                        `

                        :

                        `
                        <button disabled>
                            Cancelled
                        </button>
                        `

                    }

                `;

            }



            container.appendChild(card);


        });



    } catch (error) {


        console.error(
            "Load Registrations Error:",
            error
        );


        container.innerHTML = `

            <div class="empty-message">

                <h2>
                    Server Error
                </h2>

                <p>
                    Unable to load registrations.
                </p>

            </div>

        `;

    }

}




// ======================
// Cancel Registration
// ======================

async function cancelRegistration(id) {


    const token = localStorage.getItem("token");


    if (
        !confirm(
            "Are you sure you want to cancel this registration?"
        )
    ) {

        return;

    }



    try {


        const response = await fetch(
            `${API_URL}/cancel/${id}`,
            {

                method: "PUT",

                headers: {

                    "Authorization":
                    `Bearer ${token}`

                }

            }
        );



        const data = await response.json();



        console.log(
            "Cancel Response:",
            data
        );



        if (response.ok) {


            alert(
                "Registration cancelled successfully."
            );


            loadRegistrations();


        } else {


            alert(
                data.message ||
                "Unable to cancel registration."
            );

        }



    } catch(error) {


        console.error(
            "Cancel Error:",
            error
        );


        alert(
            "Server Error."
        );


    }

}





// ======================
// Logout
// ======================

const logoutBtn =
    document.getElementById("logoutBtn");



if (logoutBtn) {


    logoutBtn.addEventListener(
        "click",
        () => {


            localStorage.removeItem("token");

            localStorage.removeItem("user");


            alert(
                "Logged Out Successfully!"
            );


            window.location.href =
                "login.html";


        }
    );


}




// ======================
// Page Load
// ======================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        loadRegistrations();

    }
);