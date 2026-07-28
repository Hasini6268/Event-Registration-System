const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    maxParticipants: {
      type: Number,
      required: true,
    },

    registeredParticipants: {
      type: Number,
      default: 0,
    },

    /* NEW OPTIONAL FIELDS */

    organizer: {
      type: String,
      default: "College Event Committee",
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);