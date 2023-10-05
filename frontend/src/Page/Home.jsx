import React, { useEffect, useState } from "react";
import SearchPanel from "../Components/SearchPanel";
import BusDetail from "../Components/BusDetail";
import Header from "../Components/Header";
import styled from "styled-components";
import Img from "../Images/Bus.jpg";

const Search = styled.div`
  background-image: url(${Img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0;
  @media (min-width: 576px) {
    padding-top: 15rem;
  }
`;
const COntainer = styled.div``;
const Home = () => {
  const headings = [
    "Name",
    "Departure ",
    "Arrival ",
    "Source",
    "Destination",
    "Price",
    "Books",
  ];

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    // Handle the search results received from the child component
    setSearchResults([]);
    setSearchResults(results.buses);
  };
  useEffect(() => {}, [searchResults]);

  return (
    <COntainer>
      <div style={{ backgroundColor: "white" }}>
        <Header />
      </div>
      <Search>
        <SearchPanel onSearch={handleSearch} />
      </Search>
      {searchResults.length > 0 && Array.isArray(searchResults) ? (
        <div className="container-fluid">
          {/* Header Section */}
          <div
            style={{ padding: "16px" }}
            className="mt-5 container d-none d-sm-flex justify-content-space-around font-weight-bold text-center"
          >
            {headings.map((heading, index) => (
              <div key={index} className="col">
                {heading}
              </div>
            ))}
          </div>

          {/* Bus Details */}
          <div className="container-fluid">
            {searchResults.map((bus, index) => (
              <BusDetail
                key={index}
                busName={bus.busName}
                departureTime={bus.departureTime}
                arrivalTime={bus.arrivalTime}
                source={bus.source}
                destination={bus.destination}
                price={bus.price}
                totalSeat={bus.totalSeat}
                isBooked={bus.isBooked}
                busId={bus._id}
              />
            ))}
            {/* Display a message if no results are found */}
          </div>
        </div>
      ) : (
        ""
      )}
    </COntainer>
  );
};

export default Home;
