import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";
import { baseUrl } from "../Url";
import { BiMap, BiSolidMap } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { FaMapMarkedAlt } from "react-icons/fa";

const Column = styled.div`
  display: flex;
  height: 100%;
  align-items: start;
  padding: 16px 0;
  justify-content: center;
  background-color: white;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  /* Remove bottom border for small screens (sm) */
  @media (max-width: 576px) {
    border-bottom: 1px solid #000; /* Add your desired border style here */
    border-left: none;
    border-right: none;
    border-top: none;
  }
`;
const Left = styled.div`
  display: flex;
  background-color: white;
  height: 100%;
  border-left: 1px solid #ccc;
  align-items: start;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  /* Remove bottom border for small screens (sm) */
  @media (max-width: 576px) {
    border-bottom: 1px solid #000; /* Add your desired border style here */
    border-left: none;
    border-right: none;
    border-top: none;
  }
`;

const ToIcon = styled(FaMapMarkedAlt)`
  width: 24px;
  height: 24px;
  margin-right: 2rem;
`;
const FromIcon = styled(BiSolidMap)`
  width: 24px;
  height: 24px;
  margin-right: 2rem;
`;
const Calender = styled(SlCalender)`
  width: 24px;
  height: 24px;
  margin-right: 2rem;
`;

const Text = styled.div`
  font-size: 16px;
  margin-top: 8px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const Option = styled.option`
  padding: 8px;
`;

// Styled component for the button in the 4th column
const ActionButton = styled.button`
  color: #fff;
  border: none;
  border-radius: 0% !important;
  height: 100%;
  outline: none !important;
  padding: 12px 24px;
  outline: none;
  width: 100%;
  /* Remove bottom border for small screens (sm) */
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const DateParagraph = styled.p`
  font-size: 18px; /* Customize the font size */
  line-height: 1.2; /* Adjust line height for spacing */
  margin: 0; /* Remove default margin */
`;

const DateInput = styled.button`
  line-height: 1.2; /* Adjust line height for spacing */

  background-color: transparent;
  border: none;
  padding: 8px; /* Customize padding */
`;

// Styled component for the year (larger font)
const Year = styled.p`
  margin: 0;
  font-size: 24px; // Set the font size for the year
`;

const SearchPanel = ({ onSearch }) => {
  const [destinations, setDestinations] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    // Fetch destinations
    axios
      .get(`${baseUrl}/bus/destinations`)
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });

    // Fetch sources
    axios
      .get(`${baseUrl}/bus/sources`)
      .then((response) => {
        setSources(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sources:", error);
      });
  }, []);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false); // Close the calendar after selecting a date
  };

  const handleDropdownChange = (e) => {
    setSelectedDestination(e.target.value);
  };
  const handleSource = (e) => {
    setSelectedSource(e.target.value);
  };

  const handleSearch = () => {
    // Extract the year, month, and day components
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to the month since it's zero-based
    const day = selectedDate.getDate().toString().padStart(2, "0");

    // Create the custom date string in the format you want (30-9)
    const customDateString = `${year}-${month}-${day}`;
    console.log(
      customDateString,
      selectedDestination,
      selectedSource,
      selectedDate
    );
    axios
      .get(
        `${baseUrl}/bus/search?destination=${selectedDestination}&source=${selectedSource}&date=${customDateString}`
      )
      .then((response) => {
        // Call the parent component's onSearch function with the search results
        onSearch(response.data);
      })
      .catch((error) => {
        console.error("Error searching for buses:", error);
      });
  };

  return (
    <div
      className="container-fluid p-0 "
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "60rem",
      }}
    >
      <div className="row  p-3 w-100 m-0 justify-content-center">
        <div className="col-sm-3 p-0 ">
          {/* Column 1 */}
          <Left>
            <FromIcon src="icon1.png" alt="Icon 1" />
            <div>
              <Text>From</Text>
              <DropdownContainer>
                <Select onChange={handleSource} value={selectedSource}>
                  <Option disabled value="">
                    Source
                  </Option>

                  {sources.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </DropdownContainer>
            </div>
          </Left>
        </div>
        <div className="col-sm-3 p-0">
          <Column>
            <ToIcon src="icon2.png" alt="Icon 2" />
            <div>
              <Text>To</Text>
              <DropdownContainer>
                <Select
                  onChange={handleDropdownChange}
                  value={selectedDestination}
                >
                  <Option disabled value="">
                    Destination
                  </Option>
                  {destinations.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </DropdownContainer>
            </div>
          </Column>
        </div>
        <div className="col-sm-3 p-0">
          <Column>
            <Calender src="icon3.png" alt="Icon 3" />
            <div className="d-flex align-items-center">
              <Text>Date</Text>
              <DateInput onClick={toggleCalendar}>
                <DateParagraph>
                  {selectedDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </DateParagraph>

                <Year>
                  {selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                  })}
                </Year>
              </DateInput>

              {isCalendarOpen && (
                <Calendar
                  className="absolute-calendar" // Add a class name for better targeting
                  onChange={handleDateChange}
                  value={selectedDate}
                  onClickDay={handleDateChange} // Close the calendar when a date is clicked
                />
              )}
            </div>
          </Column>
        </div>
        <div className="col-sm-2 p-0">
          <ActionButton className="btn btn-dark" onClick={handleSearch}>
            Search
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
