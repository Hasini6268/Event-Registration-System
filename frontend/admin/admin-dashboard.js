console.log("admin-dashboard.js loaded");

// ======================
// Check Login
// ======================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "admin-login.html";
}

// ======================
// Logout
// ======================

function logout() {
    localStorage.removeItem("token");
    window.location.href = "admin-login.html";
}

// ======================
// Add Event
// ======================

async function addEvent() {

    const title = document.getElementById("eventTitle").value.trim();
    const description = document.getElementById("eventDescription").value.trim();
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const venue = document.getElementById("eventVenue").value.trim();
    const maxParticipants = Number(document.getElementById("maxParticipants").value);

    const message = document.getElementById("eventMessage");

    if (!title || !description || !date || !time || !venue || !maxParticipants) {
        message.innerHTML = "Please fill all required fields.";
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description,
                date,
                time,
                venue,
                maxParticipants
            })
        });

        const data = await response.json();

        if (response.ok) {

            message.innerHTML = "Event created successfully.";

            document.getElementById("eventTitle").value = "";
            document.getElementById("eventDescription").value = "";
            document.getElementById("eventDate").value = "";
            document.getElementById("eventTime").value = "";
            document.getElementById("eventVenue").value = "";
            document.getElementById("maxParticipants").value = "";

            viewEvents();

        } else {

            message.innerHTML = data.message;

        }

    } catch (error) {

        console.log(error);
        message.innerHTML = "Server Error.";

    }

}

// ======================
// View Events
// ======================

async function viewEvents() {

    try {

        const response = await fetch("http://localhost:5000/api/events", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        const container = document.getElementById("eventList");

        container.innerHTML = "";

        if (!data.events || data.events.length === 0) {

            container.innerHTML = "<p>No events found.</p>";
            return;

        }

        data.events.forEach(event => {

            const card = document.createElement("div");

            card.className = "event-card";

            card.innerHTML = `
                <h3>${event.title}</h3>

                <p>${event.description}</p>

                <p><strong>Date:</strong> ${event.date}</p>

                <p><strong>Time:</strong> ${event.time}</p>

                <p><strong>Venue:</strong> ${event.venue}</p>

                <p><strong>Maximum Participants:</strong> ${event.maxParticipants}</p>

                <button onclick="editEvent('${event._id}')">
                    Edit Event
                </button>

                <button onclick="deleteEvent('${event._id}')">
                    Delete Event
                </button>

                <hr>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.log(error);

    }

}

// ======================
// Edit Event
// ======================

async function editEvent(id) {

    const title = prompt("Enter new Event Title");

    if (title === null) return;

    const description = prompt("Enter new Description");

    if (description === null) return;

    const date = prompt("Enter new Date (YYYY-MM-DD)");

    if (date === null) return;

    const time = prompt("Enter new Time (HH:MM)");

    if (time === null) return;

    const venue = prompt("Enter new Venue");

    if (venue === null) return;

    const maxParticipants = prompt("Enter Maximum Participants");

    if (maxParticipants === null) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/events/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    title,
                    description,
                    date,
                    time,
                    venue,
                    maxParticipants
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Event updated successfully.");

            viewEvents();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// ======================
// Delete Event
// ======================

async function deleteEvent(id) {

    if (!confirm("Are you sure you want to delete this event?")) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/events/${id}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Event deleted successfully.");

            viewEvents();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

    }

}

// ======================
// View Registrations
// ======================

async function viewRegistrations() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/registrations",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        const container = document.getElementById("registrationsContainer");

        container.innerHTML = "";

        if (!response.ok) {

            container.innerHTML = `<p>${data.message}</p>`;
            return;

        }

        if (!data.registrations || data.registrations.length === 0) {

            container.innerHTML = "<p>No registrations found.</p>";
            return;

        }

        data.registrations.forEach(registration => {

            const card = document.createElement("div");

            card.className = "event-card";

            card.innerHTML = `
                <h3>${registration.event ? registration.event.title : "Event Deleted"}</h3>

                <p><strong>User:</strong> ${registration.user ? registration.user.fullName : "Unknown"}</p>

                <p><strong>Email:</strong> ${registration.user ? registration.user.email : "N/A"}</p>

                <p><strong>Date:</strong> ${registration.event ? registration.event.date : "N/A"}</p>

                <p><strong>Venue:</strong> ${registration.event ? registration.event.venue : "N/A"}</p>

                <p><strong>Status:</strong> ${registration.status}</p>

                <hr>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.log(error);

        document.getElementById("registrationsContainer").innerHTML =
            "<p>Failed to load registrations.</p>";

    }

}

// ======================
// Load Dashboard
// ======================

window.onload = function () {

    viewEvents();

};