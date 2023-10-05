import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Ticket from "../Components/Ticket";
import styled from "styled-components";

import axios from "axios";
import { baseUrl } from "../Url";
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  width: 100px; /* Adjust the width as needed */
`;

const ProfileImg = styled.img`
  width: 100%;
  height: auto;
`;

const BottomContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Profile = () => {
  const [myTickets, setMyTickets] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("_id");

    axios
      .get(`${baseUrl}/ticket/tickets/${userId}`)
      .then((response) => {
        setMyTickets(response.data);
        console.log(response.data);
        // Handle the fetched tickets as needed, e.g., display them in the UI
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Header />
      </div>
      <ProfileContainer className="container">
        <BottomContainer>
          <h2>My Tickets</h2>
          <div style={{ minWidth: "85vw" }} className="row ">
            {myTickets.map((ticket) => (
              <div className="col-12 col-sm-6 col-lg-4 p-0">
                <Ticket data={ticket} />
              </div>
            ))}
          </div>
        </BottomContainer>
      </ProfileContainer>
    </div>
  );
};

export default Profile;
