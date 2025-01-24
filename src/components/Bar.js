import React, { useEffect, useState } from "react";
import mainlogo from "../Assets/mainlogo.png";
import locationmarker from "../Assets/locationmarker.svg";
import "../App.css";
import { Link } from "react-router-dom";

export default function Bar({ handleSearch, setParentState, setMapCenter }) {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Function to check the scroll position
  const handleScroll = () => {
    setIsVisible(false)
    if (window.scrollY > 1) {  // Change this value as needed
      setIsScrolled(true);  // Add the scrolled class
      

    } else {
      setIsScrolled(false);  // Remove the scrolled class
    }
  };

  // Add event listener on mount and remove on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





  // Toggle visibility of content when 'Set Location' is clicked
  const handleSearchh = () => {
    setIsVisible(!isVisible);
  };
  const handleKeyDown = (e) => {
    console.log("function from bar calling");
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  const handleSetCurrentLocation = () => {
    console.log("Getting current location...");
    
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          console.log("Current Location: ", lat, lng); // Debugging log
  
          // Update the map center to the current location
          setMapCenter({ lat, lng });
  
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Failed to get current location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div className="App bg-white">
      <nav     className={`navbar-expand-lg border border-bottom py-3 navside navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div class="container-fluid mx-4">
          <a class="navbar-brand me-1" href="#">
            <Link to="/">
              <img
                src={mainlogo} // Dynamically set the image based on city name
                alt="Look4Ads"
                style={{ width: "150px", height: "31px" }}
                // Adjust image size and spacing
              />
            </Link>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <div className="d-flex hlocation">
                    <img
                      src="https://lamar.com/etc.clientlibs/lamar/clientlibs/clientlib-site/resources/images/icons/location.svg"
                      alt="logo"
                      style={{ width: "16px", height: "16px" }}
                    />
                    <div className="bId" onClick={handleSearchh}>
                      Set Location
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <div class="barresp">
              <div className="pnumber">Land Owners</div>
              <div className="bcontact">
                <Link
                  to="/Contact"
                  style={{ textDecoration: "none", color: "#404856" }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isVisible && (
        <div className="popup-content border rounded-4 custom-input">
          <input
            placeholder="Search by zip code"
            className="border py-2 ms-1"
            style={{
              borderRadius: "12px",
              width: "220px",
              paddingLeft: "40px", // Add padding to create space for the icon
              backgroundImage: `url('https://lamar.com/etc.clientlibs/lamar/clientlibs/clientlib-site/resources/images/icons/search.svg')`,
              backgroundSize: "20px 20px", // Adjust icon size
              backgroundPosition: "10px center", // Position the icon inside the input field
              backgroundRepeat: "no-repeat",
              color: "#404856",
              fontWeight: "bold",
            }}
            onChange={(e) => setParentState(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <button
            className="rounded-pill text-white my-2 ms-1 py-2"
            style={{
              backgroundColor: "#115740",
              width: "220px",
              backgroundImage: `url('https://lamar.com/etc.clientlibs/lamar/clientlibs/clientlib-site/resources/images/icons/crosshair.svg')`,
              backgroundSize: "23px 23px", // Adjust icon size
              backgroundPosition: "25px center", // Position the icon inside the input field
              backgroundRepeat: "no-repeat",
            }}
            onClick={handleSetCurrentLocation}
          >
            Use My Location
          </button>
        </div>
      )}
    </div>
  );
}
