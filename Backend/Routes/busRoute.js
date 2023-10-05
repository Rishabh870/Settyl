const express = require("express");
const router = express.Router();
const { Bus } = require("../Model/busModel"); // Import the Bus model

// Create a new bus
router.post("/create", async (req, res) => {
  try {
    let { source, destination, totalSeats } = req.body;
    console.log(req.body);
    source = source.trim();
    destination = destination.trim();
    // Create an array of seats with default values
    const isBooked = Array.from({ length: totalSeats }, (_, seatNo) => ({
      seatNo: seatNo + 1,
    }));

    const newBus = new Bus({
      ...req.body,
      isBooked,
      source,
      destination,
    });

    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

// Define a route to search for buses
router.get("/search", async (req, res) => {
  try {
    const { destination, source, date } = req.query;
    console.log(destination, source, date);

    // Query the buses collection based on the provided criteria
    const buses = await Bus.find({
      destination,
      source,
      departureTime: { $gte: new Date(date) },
    });

    // Send the matching buses as a response
    res.json({ buses });
  } catch (error) {
    console.error("Error searching for buses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a bus by ID
router.get("/buses/:id", async (req, res) => {
  const busId = req.params.id;

  try {
    // Find the bus by its MongoDB ObjectId
    const bus = await Bus.findById(busId);

    // Check if the bus exists
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Return the bus data
    res.status(200).json(bus);
  } catch (error) {
    console.error("Get bus by ID error:", error);
    res.status(500).json({ error: "Failed to retrieve bus by ID" });
  }
});

// Route to get unique destinations of all buses
router.get("/destinations", async (req, res) => {
  try {
    const buses = await Bus.find({});
    const destinations = [...new Set(buses.map((bus) => bus.destination))];
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get unique sources of all buses
router.get("/sources", async (req, res) => {
  try {
    const buses = await Bus.find({});
    const sources = [...new Set(buses.map((bus) => bus.source))];
    console.log(sources);

    res.json(sources);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
