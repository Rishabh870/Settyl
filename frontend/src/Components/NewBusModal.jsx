// BusModal.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Form } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../Url";

const BusModal = ({ isOpen, closeModal, seats }) => {
  const [formData, setFormData] = useState({
    busName: "",
    departureTime: "",
    arrivalTime: "",
    source: "",
    destination: "",
    price: "",
    totalSeats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepartureTimeChange = (time) => {
    setFormData({ ...formData, departureTime: time });
  };

  const handleArrivalTimeChange = (time) => {
    setFormData({ ...formData, arrivalTime: time });
  };

  const handleSubmit = async () => {
    try {
      // Send a POST request to your backend API to create a new bus
      const response = await axios.post(`${baseUrl}/bus/create`, formData);

      // Check if the request was successful
      if (response.status === 201) {
        // Handle success, e.g., show a success message, reset the form, or close the modal
        console.log("Bus created successfully:", response.data);

        // Reset the form
        setFormData({
          busName: "",
          departureTime: "",
          arrivalTime: "",
          source: "",
          destination: "",
          price: "",
          totalSeats: "",
        });

        // After successful submission, close the modal
        window.location.reload();
        closeModal();
      } else {
        // Handle any errors or display an error message
        console.error("Error creating a new bus:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating a new bus:", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Header>
        <Modal.Title>Bus Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="busName">
            <Form.Label>Bus Name:</Form.Label>
            <Form.Control
              type="text"
              name="busName"
              value={formData.busName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="departureTime">
            <Form.Label>Departure Time:</Form.Label>
            <div>
              <DatePicker
                selected={formData.departureTime}
                onChange={handleDepartureTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select Date and Time"
                className="custom-datepicker-input"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="arrivalTime">
            <Form.Label>Arrival Time:</Form.Label>
            <div>
              <DatePicker
                selected={formData.arrivalTime}
                onChange={handleArrivalTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select Date and Time"
                className="custom-datepicker-input"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="source">
            <Form.Label>Source:</Form.Label>
            <Form.Control
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="destination">
            <Form.Label>Destination:</Form.Label>
            <Form.Control
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="totalSeats">
            <Form.Label>Total Seats:</Form.Label>
            <Form.Control
              type="text"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{ borderRadius: "0px !important" }}
          className="btn btn-dark"
          variant="primary"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BusModal;
