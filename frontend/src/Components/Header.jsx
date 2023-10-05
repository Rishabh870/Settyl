import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiAddCircleLine } from "react-icons/ri"; // Import the plus icon
import NewBusModal from "./NewBusModal";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  border-bottom: 1px solid #ccc;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const LeftPart = styled.div`
  display: flex;
  align-items: center;
`;

const SiteName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const RightPart = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none !important;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PlusIcon = styled(RiAddCircleLine)`
  font-size: 30px;
  cursor: pointer;
`;

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if _id is present in local storage
    const userId = localStorage.getItem("_id");

    if (userId) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleLogoutClick = () => {
    // Implement your logout logic here
    // Remove the _id from local storage
    localStorage.removeItem("_id");
    setIsLoggedIn(false); // Update state to indicate user is logged out
  };

  const openModal = () => {
    setModalOpen(true);
    console.log("open");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Use navigate to redirect to the /login page
    navigate("/login");
  };
  const Profile = () => {
    // Use navigate to redirect to the /login page
    navigate("/profile");
  };
  const Title = () => {
    // Use navigate to redirect to the /login page
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Container className="container">
        <LeftPart>
          <SiteName onClick={Title}>Book Bus</SiteName>
        </LeftPart>
        <RightPart>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
            onClick={openModal}
          >
            <PlusIcon />
          </button>
          {isLoggedIn ? (
            <LoginButton onClick={handleLogoutClick}>Logout</LoginButton>
          ) : (
            <LoginButton onClick={handleLoginClick}>Login</LoginButton>
          )}
          <Avatar
            onClick={Profile}
            src="https://picsum.photos/200"
            alt="Profile"
          />
        </RightPart>
      </Container>
      <NewBusModal isOpen={isModalOpen} closeModal={closeModal} />
    </HeaderContainer>
  );
};

export default Header;
