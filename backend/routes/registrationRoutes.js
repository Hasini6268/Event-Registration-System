const express = require("express");
const router = express.Router();

const {
    registerEvent,
    cancelRegistration,
    myRegistrations,
    getAllRegistrations
} = require("../controllers/registrationController");

const { protect } = require("../middleware/authMiddleware");

// ==============================
// User Routes
// ==============================

// Register for an Event
router.post("/register", protect, registerEvent);

// Cancel Registration
router.put("/cancel/:id", protect, cancelRegistration);

// View Logged-in User Registrations
router.get("/my", protect, myRegistrations);

// ==============================
// Admin Route
// ==============================

// View All Registrations
router.get("/", protect, getAllRegistrations);

module.exports = router;