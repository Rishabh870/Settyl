import React from "react";
import styled from "styled-components";

const TicketContainer = styled.div`
  padding: 16px;
  width: 100%;
`;

const TicketInfo = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  flex-direction: column;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const InfoValue = styled.span``;
const Ticket = ({ data }) => {
  // Destructure data object
  const { bus, price, seatNo } = data;

  console.log(data);
  return (
    <TicketContainer>
      <TicketInfo>
        <InfoItem>
          <InfoLabel>Bus Name:</InfoLabel>
          <InfoValue>{bus.busName}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Source:</InfoLabel>
          <InfoValue>{bus.source}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Destination:</InfoLabel>
          <InfoValue>{bus.destination}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Departure:</InfoLabel>
          <InfoValue>
            {new Date(bus.departureTime).toLocaleString().slice(0, -2)}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Arrival:</InfoLabel>
          <InfoValue>
            {new Date(bus.arrivalTime).toLocaleString().slice(0, -2)}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Price:</InfoLabel>
          <InfoValue>${price}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Seat No:</InfoLabel>
          <InfoValue>{seatNo.join(", ")}</InfoValue>
        </InfoItem>
      </TicketInfo>
    </TicketContainer>
  );
};

export default Ticket;
