const express = require("express");
const router = express.Router();
const { Ticket } = require("../Model/ticketModel"); // Import the Ticket model
const { Bus } = require("../Model/busModel"); // Import the Bus model

// Create a new ticket
router.post("/tickets", async (req, res) => {
  const { seatNo, price, userId, busId } = req.body;

  try {
    // Find the bus by busId
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Initialize an array to store the updated seats
    const updatedSeats = [];

    // Iterate through the seat numbers in the array
    for (const selectedSeatNo of seatNo) {
      // Find and update the selected seat in isBooked array
      const selectedSeat = bus.isBooked.find(
        (seat) => seat.seatNo === selectedSeatNo
      );

      if (!selectedSeat) {
        return res
          .status(404)
          .json({ error: `Seat ${selectedSeatNo} not found` });
      }

      // Check if the seat is already booked
      if (selectedSeat.booked) {
        return res
          .status(400)
          .json({ error: `Seat ${selectedSeatNo} is already booked` });
      }

      // Update the selected seat's booked status to true
      selectedSeat.booked = true;

      // Add the updated seat to the array
      updatedSeats.push(selectedSeat);
    }

    // Save the bus with the updated seats
    await bus.save();

    // Create a single ticket with an array of seat numbers
    const newTicket = new Ticket({
      seatNo: seatNo, // Assign the array of seat numbers
      price,
      user: userId,
      bus: busId,
    });

    const savedTicket = await newTicket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Ticket creation error:", error);
    res.status(500).json({ error: "Failed to create a new ticket" });
  }
});

// Define a route to get all tickets for a specific user
router.get("/tickets/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the request params

    // Use Mongoose to find all tickets where the 'user' field matches the user ID
    const tickets = await Ticket.find({ user: userId }).populate("bus"); // Optionally, populate the 'bus' field if needed

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

module.exports = router;
