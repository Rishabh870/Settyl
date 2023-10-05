import React, { useState } from "react";
import styled from "styled-components";
import TicketBookModal from "./TicketBookModal";
// Styled component for the bus card
const BusCardWrapper = styled.div`
  border: 1px solid #dee2e6;
  padding: 16px;
  display: flex;
  flex-wrap: wrap; // Allow content to wrap to the next line on smaller screens
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
`;

const BusDetail = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
  text-align: center;
  flex: 1; // Equal width for all columns on all screen sizes
`;

const BookTicketButton = styled.button`
  border-radius: 0% !important;
  color: #fff;
  border: none;
  outline: none !important;
  padding: 8px 16px;
  cursor: pointer;
  flex: 1; // Equal width for the button on all screen sizes
`;

const BusCard = ({
  busName,
  departureTime,
  arrivalTime,
  source,
  destination,
  price,
  totalSeat,
  isBooked,
  busId,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const departure = new Date(departureTime);

  // Get the hours, minutes, and seconds
  const departurehours = departure.getUTCHours();
  const departureminutes = departure.getUTCMinutes();

  // Format the time as HH:mm:ss (24-hour format)
  const departured = `${departurehours
    .toString()
    .padStart(2, "0")}:${departureminutes.toString().padStart(2, "0")}`;

  const arrival = new Date(arrivalTime);

  // Get the hours, minutes, and seconds
  const hours = arrival.getUTCHours();
  const minutes = arrival.getUTCMinutes();

  // Format the time as HH:mm:ss (24-hour format)
  const arrive = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <BusCardWrapper className="container">
      <div className="row w-100 p-0 align-items-center">
        <BusDetail className="col-12 col-sm-6 col-md-4">{busName}</BusDetail>
        <BusDetail className="col-6 col-sm-3 col-md-4">{departured}</BusDetail>
        <BusDetail className="col-6 col-sm-3 col-md-2">{arrive}</BusDetail>
        <BusDetail className="col-6 col-sm-3 col-md-2">{source}</BusDetail>
        <BusDetail className="col-6 col-sm-3 col-md-2">{destination}</BusDetail>
        <BusDetail className="col-6 col-sm-3 col-md-2">${price}</BusDetail>
        <BookTicketButton
          className="col-12 col-sm-6 col-md-4 btn btn-dark"
          onClick={openModal}
        >
          Ticket
        </BookTicketButton>
      </div>

      <TicketBookModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        seats={isBooked}
        busName={busName}
        price={price}
        busId={busId}
      />
    </BusCardWrapper>
  );
};

export default BusCard;
