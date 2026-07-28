const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

// Create Event (Protected)
router.post("/", protect, createEvent);

// Get All Events (Public)
router.get("/", getAllEvents);

// Get Single Event (Public)
router.get("/:id", getSingleEvent);

// Update Event (Protected)
router.put("/:id", protect, updateEvent);

// Delete Event (Protected)
router.delete("/:id", protect, deleteEvent);

module.exports = router;