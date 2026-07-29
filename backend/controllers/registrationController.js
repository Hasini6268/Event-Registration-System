const Registration = require("../models/Registration");
const Event = require("../models/Event");

// ==========================================
// Register for an Event
// ==========================================

const registerEvent = async (req, res) => {
    try {

        const userId = req.user.id;
        const { eventId } = req.body;

        // Check Event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Check if Event is Full
        if (event.registeredParticipants >= event.maxParticipants) {
            return res.status(400).json({
                success: false,
                message: "Event is Full"
            });
        }

        // Check Duplicate Registration
        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId,
            status: "Registered"
        });

        if (existingRegistration) {
            return res.status(400).json({
                success: false,
                message: "You have already registered for this event"
            });
        }

        // Create Registration
        const registration = await Registration.create({
            user: userId,
            event: eventId,
            status: "Registered"
        });

        // Increase Registered Participants
        event.registeredParticipants += 1;
        await event.save();

        res.status(201).json({
            success: true,
            message: "Event Registered Successfully",
            registration
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================================
// Cancel Registration
// ==========================================

const cancelRegistration = async (req, res) => {

    try {

        const userId = req.user.id;
        const { id } = req.params;

        const registration = await Registration.findOne({
            _id: id,
            user: userId,
            status: "Registered"
        });

        if (!registration) {

            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });

        }

        registration.status = "Cancelled";
        await registration.save();

        const event = await Event.findById(registration.event);

        if (event && event.registeredParticipants > 0) {

            event.registeredParticipants -= 1;
            await event.save();

        }

        res.status(200).json({
            success: true,
            message: "Registration Cancelled Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// View My Registrations
// ==========================================

const myRegistrations = async (req, res) => {

    try {

        const registrations = await Registration.find({
            user: req.user.id
        })
            .populate("event")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// View All Registrations (Admin)
// ==========================================

const getAllRegistrations = async (req, res) => {

    try {

        const registrations = await Registration.find()
            .populate("user", "fullName email")
            .populate("event", "title date venue")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// Export Functions
// ==========================================

module.exports = {
    registerEvent,
    cancelRegistration,
    myRegistrations,
    getAllRegistrations
};