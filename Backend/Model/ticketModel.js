const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  // Add any ticket-specific fields here
  // For example, seat number, ticket price, etc.
  seatNo: [{ type: Number, required: true }],
  price: {
    type: Number,
    required: true,
  },
  // Reference to the user who booked the ticket
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Reference to the bus associated with the ticket
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = {
  Ticket,
};
