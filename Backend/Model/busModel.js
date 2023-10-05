const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  isBooked: [
    {
      seatNo: {
        type: Number,
        required: true,
      },
      booked: { type: Boolean, default: false },
    },
  ],
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = {
  Bus,
};
