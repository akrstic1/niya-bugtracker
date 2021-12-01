const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    commenter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const assignSchema = new mongoose.Schema({
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  assignedToUser_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedByUser_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    submitter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    assigns: [assignSchema],
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tickets: [ticketSchema],
});

module.exports = mongoose.model("Project", projectSchema);
