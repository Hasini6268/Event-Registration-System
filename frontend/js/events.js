const API_URL = "http://localhost:5000/api/events";

// ======================
// Load All Events
// ======================

async function loadEvents() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        const container = document.getElementById("eventsContainer");
        container.innerHTML = "";

        if (!response.ok) {

            container.innerHTML = `<h3>${data.message || "Failed to load events."}</h3>`;
            return;

        }

        if (!data.events || data.events.length === 0) {

            container.innerHTML = `
                <div class="empty-message">
                    <h2>No Events Available</h2>
                    <p>Please check back later.</p>
                </div>
            `;
            return;

        }

        data.events.forEach(event => {

            const availableSeats =
                event.maxParticipants - (event.registeredParticipants || 0);

            const badgeColor =
                availableSeats > 0 ? "#16a34a" : "#dc2626";

            const card = document.createElement("div");
            card.className = "event-card";

            card.innerHTML = `

                <div style="
                    height:180px;
                    background:linear-gradient(135deg,#2563eb,#1e40af);
                    border-radius:12px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    color:white;
                    font-size:60px;
                    margin-bottom:20px;
                ">
                    🎉
                </div>

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:15px;
                ">

                    <span style="
                        background:#dbeafe;
                        color:#2563eb;
                        padding:6px 12px;
                        border-radius:20px;
                        font-size:13px;
                        font-weight:600;
                    ">
                        ${event.category || "General"}
                    </span>

                    <span style="
                        background:${badgeColor};
                        color:white;
                        padding:6px 12px;
                        border-radius:20px;
                        font-size:13px;
                    ">
                        ${availableSeats > 0 ? "Open" : "Full"}
                    </span>

                </div>

                <h2>${event.title}</h2>

                <p style="margin-bottom:15px;">
                    ${event.description}
                </p>

                <hr style="margin:15px 0;">

                <p><strong>📅 Date:</strong> ${new Date(event.date).toDateString()}</p>

                <p><strong>🕒 Time:</strong> ${event.time}</p>

                <p><strong>📍 Venue:</strong> ${event.venue}</p>

                <p><strong>👥 Seats:</strong> ${event.registeredParticipants || 0} / ${event.maxParticipants}</p>

                <p><strong>✅ Available:</strong> ${availableSeats}</p>

                <button
                    onclick="registerEvent('${event._id}')"
                    ${availableSeats <= 0 ? "disabled" : ""}
                >
                    ${availableSeats > 0 ? "Register Now" : "Event Full"}
                </button>

            `;

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

        document.getElementById("eventsContainer").innerHTML = `
            <div class="empty-message">
                <h2>Server Error</h2>
                <p>Unable to load events.</p>
            </div>
        `;

    }

}

// ======================
// Register Event
// ======================

async function registerEvent(eventId) {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");
        window.location.href = "login.html";
        return;

    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/registrations/register",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },

                body: JSON.stringify({

                    eventId

                })

            }

        );

        const data = await response.json();

        if (response.ok && data.success) {

            alert("🎉 Event Registered Successfully!");

            loadEvents();

        } else {

            alert(data.message || "Registration failed.");

        }

    }

    catch (error) {

        console.error(error);

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
// Load Events
// ======================

window.onload = function () {

    loadEvents();

};