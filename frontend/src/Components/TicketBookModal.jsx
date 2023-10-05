import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../Url";
import { toast } from "react-toastify";

const ModalContent = styled.div`
  width: 100%;
`;
const Modals = styled(Modal)`
  .modal-dialog {
    max-width: 100%; /* Adjust the width as needed */
    width: 750px;
    @media (max-width: 564px) {
      width: 300px;
      margin: auto;
    }
  }
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

// Styled component for the bus layout container

const BusLayout = styled.div`
  display: grid;
  border: 1px solid #dee2e6;
  width: 260px;
  height: fit-content;
  padding: 2rem;
  margin: 1rem auto;
  border-radius: 5px;
  grid-template-columns: 40px repeat(1, 1fr) 40px; // First column is 40px wide, then two more columns per row
  gap: 16px; // Adjust the gap between seats as needed

  @media (max-width: 576px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const SeatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 2rem;
`;

// Wrapper for the seat
const Seat = styled.button`
  width: 35px;
  height: 60px;
  background-color: transparent;
  outline: none !important;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  position: relative;
  justify-content: center;
  cursor: pointer; // Add cursor pointer for clickable seats
  border-color: ${(props) =>
    props.isSelected
      ? "green"
      : "#ccc"}; // Change background color based on isSelected
`;

// Backrest of the seat
const Head = styled.div`
  width: 20px;
  height: 10px;
  position: absolute;
  bottom: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isSelected
      ? "green"
      : "transparent"}; // Change head color based on isSelected
`;
const CheckOut = styled.div`
  margin: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const SelectedList = styled.div`
  padding: 0;
  display: flex;
  margin: 0;
`;

const List = styled.p`
  font-size: 16px;
  margin: 0;
`;

const Price = styled.p`
  font-size: 16px;
  margin-top: 16px;
`;

const CheckoutButton = styled.button`
  border-radius: 0% !important;
  color: #fff;
  outline: none !important;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;
`;
const TicketBookModal = ({
  isOpen,
  closeModal,
  seats,
  price,
  busId,
  busName,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  const handleCheckout = async () => {
    try {
      // Retrieve userId from local storage
      const userId = localStorage.getItem("_id");
      if (selectedSeats.length == 0) {
        toast.error("Please select at least one seat");
        return;
      }

      // Create the ticket data
      const ticketData = {
        seatNo: selectedSeats,
        price: totalAmount,
        userId,
        busId,
      };

      // Send a POST request to create a new ticket
      const response = await axios.post(
        `${baseUrl}/ticket/tickets`,
        ticketData
      );

      // Handle the response, e.g., show a success message
      toast.success("Ticket booked successfully");
      window.location.reload();

      closeModal();
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error("Error creating ticket:", error);
    }
  };

  const totalAmount = selectedSeats.length * price;

  return (
    <div>
      {" "}
      <Modals show={isOpen} onHide={closeModal}>
        <ModalContent className=" d-flex justify-content-center">
          <div className="row p-0 w-100 ">
            <LeftDiv className="col p-0 ">
              <BusLayout>
                {seats.map((seat) => (
                  <SeatWrapper key={seat.seatNo}>
                    <Seat
                      isSelected={selectedSeats.includes(seat.seatNo)}
                      onClick={() => handleSeatClick(seat.seatNo)}
                      disabled={seat.booked} // Add the disabled attribute based on the 'booked' status
                    >
                      {seat.seatNo}

                      <Head isSelected={selectedSeats.includes(seat.seatNo)} />
                    </Seat>
                  </SeatWrapper>
                ))}
              </BusLayout>
            </LeftDiv>
            <RightDiv className="col p-0">
              <CheckOut>
                <Title>{busName}</Title>

                <SelectedList className="row">
                  {selectedSeats.map((seatNumber) => (
                    <List className="col-3 p-0" key={seatNumber}>
                      Seat {seatNumber},
                    </List>
                  ))}
                </SelectedList>
                <Price>Total Price: ${totalAmount}</Price>
                <CheckoutButton
                  className="btn btn-dark"
                  onClick={handleCheckout}
                >
                  Checkout
                </CheckoutButton>
              </CheckOut>{" "}
            </RightDiv>
          </div>
        </ModalContent>
      </Modals>
    </div>
  );
};

export default TicketBookModal;
