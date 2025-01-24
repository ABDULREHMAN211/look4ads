import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  MapContainer,
  TileLayer,
  // Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet"; // Import Leaflet for marker icons
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import "./App.css";
import impressions from "./Assets/impressions.svg";
import Info from "./Assets/Info.png";
import locationmarker from "./Assets/locationmarker.svg";
import mediaStyle from "./Assets/mediaStyle.svg";
import money from "./Assets/money.svg";
import panelSize from "./Assets/panelSize.svg";
import emailjs from "emailjs-com";

import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Bar from "./components/Bar";
import Header from "./components/Header";
import bulletinproduct from "./Assets/bulletinproduct.svg";
import digitalproduct from "./Assets/digitalproduct.svg";
import jrposterproduct from "./Assets/jrposterproduct.svg";
import posterproduct from "./Assets/posterproduct.svg";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import popleft from "./Assets/popleft.PNG";
import popr from "./Assets/popr.PNG";
import { borderRadius, width } from "@mui/system";

import PosterN from "./Assets/PosterN.png";
import BulletinN from "./Assets/BulletinN.png";
import Mapmark from "./components/Mapmark";

// Sample locations
const locations = [
  {
    id: 1,
    lat: 41.4,
    lng: -74.1,
    title: "Location 1",
    product: "Bulletins",
    imageUrl: require("./Assets/BulletinN.png"),
  },
  // 41.5,-74.05351
  {
    id: 2,
    lat: 41.6081492,
    lng: -74.2990401,
    title: "Location 2",
    product: "Posters",
    imageUrl: require("./Assets/PosterN.png"),
  },
  {
    id: 3,
    lat: 41.5081492,
    lng: -74.3,
    title: "Location 3",
    product: "Jr Poster",
    imageUrl: require("./Assets/PosterN.png"),
  },
  {
    id: 4,
    lat: 41.53564919999999,
    lng: -73.8990252,
    title: "Location 4",
    product: "Bulletins",
    imageUrl: require("./Assets/BulletinN.png"),
  },
  {
    id: 5,
    lat: 41.60564919999999,
    lng: -74.1840358,
    title: "Location 5",
    product: "Bulletins",
    imageUrl: require("./Assets/BulletinN.png"),
  },
];

function App() {
  const googleMapsTileLayerUrl =
    "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
  const polylineCoordinates = [
    [51.505, -0.09],
    [51.515, -0.1],
    [51.52, -0.12],
  ];

  // Custom style for polyline to remove color
  const polylineStyle = {
    color: "transparent", // Set line color to transparent (invisible)
    weight: 5, // Thickness of the line (it can still be set, but won't be visible)
    opacity: 0, // Completely make the line invisible
  };

  const [Products, setProducts] = useState({
    Bulletins: true,
    Posters: true,
    "Jr Poster": true,
    Digital: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 41.5306113, // Your latitude
    lng: -74.05351, // Your longitude
  }); // Default to London
  const [markers, setMarkers] = useState(locations);
  const [filterVal, setfilterVal] = useState([]);

  // Function to handle search
  const handleProductChange = (event) => {
    const { name, checked } = event.target;
    setProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [name]: checked,
    }));
  };

  const selectedProductKeys = Object.keys(Products).filter(
    (product) => Products[product]
  );

  const filteredLocation =
    selectedProductKeys.length > 0
      ? locations.filter((location) =>
          selectedProductKeys.includes(location.product)
        )
      : locations; // If no product is selected, show all locations

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };
  const handleClick = () => {
    handleSearch();
  };
  const handleSearch = async () => {
    console.log("function called");
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchTerm
        )}&key=AIzaSyCOr-aVNI8lWlmWiKRJd1OXgxxkw_YtSh4`
      );

      setfilterVal(response);
      const result = response?.data?.results[0]?.geometry?.location; // Get the first result
      console.log(result);

      if (result) {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lng);

        console.log("New Center: ", lat, lng); // Debugging log

        // Update map center to the new location
        setMapCenter({ lat, lng });
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Custom hook to update the map view when the mapCenter state changes
  // function MapViewUpdater() {
  //   const map = useMap(); // Access the map instance using the useMap hook

  //   // Update the map center whenever the mapCenter state changes
  //   map.setView(mapCenter, map.getZoom()); // Set the new center with the current zoom level

  //   return null; // This component does not render anything
  // }

  const ProductImages = {
    Bulletins: bulletinproduct,
    Posters: posterproduct,
    Digital: digitalproduct,
    "Jr Poster": jrposterproduct,
  };

  const [mail, setmail] = useState("");
  const [problem, setproblem] = useState("");

  const [clicked, setClicked] = useState(false);

  // Handle marker click event
  const handleMarkerClick = () => {
    setClicked(!clicked);
  };

  const [details, setdetails] = useState(false);

  // Function to toggle form visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form Submitted:", Object.fromEntries(formData));
    // setIsFormVisible(false); // Close form after submission
  };

  const handleBackClick = () => {
    setClicked(!clicked); // This will go back to the previous page in the browser history
  };

  const detailform = () => {
    if (clicked) {
      setClicked(!clicked);
      setdetails(!details);
    } else {
      setdetails(!details);
      setClicked(false);
    }
  };

  // submission of pop up form data

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Send form data using EmailJS
    emailjs
      .sendForm(
        "service_2e1rmti", // Replace with your EmailJS service ID
        "template_1ckaah9", // Replace with your EmailJS template ID
        event.target, // The form element
        "zepFFh4AHCjjrQKqF" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully: ", result.text);
          alert("Form submitted successfully!");
        },
        (error) => {
          console.log("Error sending email: ", error.text);
          alert("Error submitting the form. Please try again.");
        }
      );
  };

  // Chunking products div
  const chunkedProducts = Object.keys(Products).reduce(
    (result, product, index) => {
      if (index % 2 === 0) {
        result.push([product]); // Start a new chunk
      } else {
        result[result.length - 1].push(product); // Add to the current chunk
      }
      return result;
    },
    []
  );
  console.log(filterVal);
  const [satelliteView, setSatelliteView] = useState(false);

  // Toggle between satellite and default map views
  const toggleMapView = () => {
    setSatelliteView(!satelliteView);
  };

  //new add
  const containerStyle = {
    // width: "100%",
    // height: "100%",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "749px",
  };
  {
    console.log(filteredLocation);
  }

  const googlemapkey=process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  return (
    <>
      <Bar
        handleSearch={handleSearch}
        setParentState={setSearchTerm}
        setMapCenter={setMapCenter}
      />
      <Header />

      <div
        style={{ height: "730px", width: "1340px", marginBottom: "200px" }}
        className="respabovemap"
      >
        <LoadScript googleMapsApiKey={googlemapkey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
            options={{
              fullscreenControl: false,  // Disables the full-screen button
              
              
            }}
            // options={{
            //   zoomControl: true,
            //   zoomControlOptions: {
            //     position: window.google.maps.ControlPosition.LEFT_BOTTOM, // Move zoom controls to the left
            //   },
            //   streetViewControl: true,
            //   streetViewControlOptions: {
            //     position: window.google.maps.ControlPosition.LEFT_BOTTOM, // Move the Street View icon to the left
            //   },
            // }}
            className="position-relative respmap"
          >
            <div
              className="position-absolute productresp m-3"
              style={{ zIndex: "1000" }}
            >
              <div
                className="d-flex bg-white my-2 px-2  justify-content-between rounded-4 respsearch"
                style={{ width: "385px" }}
              >
                <input
                  placeholder="Country, Zip Code"
                  className="border-0 ms-1 pt-1 my-input"
                  style={{ width: "281px", height: "27px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="border-0 text-white p-4 py-1 rounded-4 me-1 my-1"
                  style={{ backgroundColor: "#115740" }}
                  onClick={handleClick} // Trigger search on button click
                >
                  Go
                </button>
              </div>

              <div
                className="h6 bg-white rounded-4 respfilter"
                style={{ height: "auto", width: "385px" }}
              >
                <div className="m-2">
                  <div className="d-flex">
                    <img
                      src="https://ib.lamar.com/app/images/menu/products.svg" // Dynamically set the image based on city name
                      alt="product icon"
                      // Adjust image size and spacing
                    />
                    <h5 className="m-2">Products</h5>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "1px",
                    }}
                  >
                    {Object.keys(Products).map((product) => (
                      <label key={product} className="m-1 productdiv">
                        <input
                          className="m-1 p-2 pt-3"
                          type="checkbox"
                          name={product}
                          checked={Products[product]}
                          onChange={handleProductChange}
                          style={{
                            fontSize: "21px",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                        <img
                          src={ProductImages[product]} // Dynamically set the image based on product name
                          alt={`${product} icon`}
                          className="pb-2 pe-1"
                          style={{ height: "22px", width: "24px" }}
                        />
                        {product}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <MapViewUpdater /> */}
            {console.log(filteredLocation)}

            {/* {filteredLocation?.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={handleMarkerClick}
                // style={{
                //   width: "40px", // Set the width of the marker icon
                //   height: "40px", // Set the height of the marker icon
                //   backgroundColor:'black'
                // }}
                icon={{
                  url: location.imageUrl, // Use the imported image as the icon
                  // scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))} */}
            <Mapmark filteredLocation={filteredLocation} handleMarkerClick={handleMarkerClick}/>
            {clicked && (
              <div
                className="modal show border-0 position-relative"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.8)", // Faint black background
                  position: "fixed", // Position fixed to overlay the page
                }}
              >
                <div className="modal-dialog">
                  <div className="modal-content popup">
                    <div className="modal-header">
                      <button
                        type="button"
                        style={{ backgroundColor: "white", opacity: "1" }}
                        className="btn-close position-absolute top-0 start-100 translate-middle p-2 m-0 me-4 mt-1 shadow rounded-pill"
                        onClick={handleMarkerClick}
                        // aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      <div class="container-fluid w-100">
                        <div class="row mb-5">
                          <div class="col-sm">
                            <img
                              src={popleft}
                              alt="logo"
                              // height="80"
                              // width="80"
                              style={{
                                width: "329px",
                                height: "250px",
                                borderRadius: "20px",
                              }}
                            />
                          </div>
                          <div class="col-sm">
                            <img
                              src={popr}
                              alt="logo"
                              // height="80"
                              // width="80"
                              style={{
                                width: "329px",
                                height: "250px",
                                borderRadius: "20px",
                              }}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="pId">Geopath ID - 30818562</div>
                            <div className="pnumber">Panel 9163</div>
                            <div className="d-flex plocation">
                              <img
                                src={locationmarker}
                                alt="logo"

                                // style={{ borderRadius: "5px", background: "#ffac14" }}
                              />
                              <div className="pId">
                                Newburgh - Located on Rte.32 in the City of
                                Newburgh.
                              </div>
                            </div>
                          </div>
                          <button className="btn rounded-pill text-success border border-2 border-success h-25">
                            Compare
                          </button>
                        </div>
                        <div>
                          <div className="pnumber">Advertising Strength</div>
                          <div className="pId">
                            Reaches heavy traffic on Rt.32 between New Windsor
                            and Newburgh, I-84 and I-87
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm">
                            <div className="pcombine">
                              <div className="pcombineimg">
                                <img
                                  src={impressions}
                                  alt="logo"
                                  // height="80"
                                  // width="80"
                                  // style={{ borderRadius: "5px", background: "#ffac14" }}
                                />
                              </div>

                              <div className="pcomibnediv">
                                <div className="pnumber">Impressions</div>
                                <div className="pId">31,217/Week</div>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm">
                            <div className="pcombine">
                              <div className="pcombineimg">
                                <img
                                  src={mediaStyle}
                                  alt="logo"
                                  // height="80"
                                  // width="80"
                                  // style={{ borderRadius: "5px", background: "#ffac14" }}
                                />
                              </div>

                              <div className="pcomibnediv">
                                <div className="pnumber">Media Style</div>
                                <div className="pId">
                                  Junior Bulletin,Regular
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm">
                            <div className="pcombine">
                              <div className="pcombineimg">
                                <img
                                  src={panelSize}
                                  alt="logo"
                                  // height="80"
                                  // width="80"
                                  // style={{ borderRadius: "5px", background: "#ffac14" }}
                                />
                              </div>

                              <div className="pcomibnediv">
                                <div className="pnumber">Panel Size</div>
                                <div className="pId">7'0" x 29'0"</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm">
                            <div className="pcombine">
                              <div className="pcombineimg">
                                <img
                                  src={locationmarker}
                                  alt="logo"
                                  // height="80"
                                  // width="80"
                                  // style={{ borderRadius: "5px", background: "#ffac14" }}
                                />
                              </div>

                              <div className="pcomibnediv">
                                <div className="pnumber">Facing/Read</div>
                                <div className="pId">W/Left Of Road</div>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm">
                            <div className="pcombine">
                              <div className="pcombineimg">
                                <img
                                  src={mediaStyle}
                                  alt="logo"
                                  // height="80"
                                  // width="80"
                                  // style={{ borderRadius: "5px", background: "#ffac14" }}
                                />
                              </div>

                              <div className="pcomibnediv">
                                <div className="pnumber">Illuminated</div>
                                <div className="pId">No</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm">
                            <div className="pcombine">
                              <div className="pcombineimg">
                                <img
                                  src={panelSize}
                                  alt="logo"
                                  // height="80"
                                  // width="80"
                                  // style={{ borderRadius: "5px", background: "#ffac14" }}
                                />
                              </div>

                              <div className="pcomibnediv">
                                <div className="pnumber">Lat/Long</div>
                                <div className="pId">
                                  {/* <a
                                      href="#"
                                      class="stretched-link text-success"
                                    >
                                      414999 - 74,0263
                                    </a> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between gap-3">
                          <button className="btn rounded-pill text-success border w-50 border-2">
                            Photo Sheet
                          </button>
                          <button
                            class="btn btn-success rounded-pill w-50"
                            style={{ cursor: "pointer" }}
                            onClick={detailform}
                          >
                            Request Quote
                          </button>
                          {/* second pop up / modal */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {details && (
              <div
                className="modal show border-0 position-relative "
                // id="exampleModal"
                // tabindex="-1"
                // aria-labelledby="exampleModalLabel"
                // aria-hidden="true"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.8)", // Faint black background
                  position: "fixed", // Position fixed to overlay the page
                }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div
                      className="btn fw-bold pb-0 mb-0"
                      style={{ width: "90px" }}
                      onClick={handleBackClick}
                    >
                      <span>{"<   "}</span>Back
                      {/* Arrow symbol */}
                    </div>
                    <div className="modal-header">
                      <h5 className="modal-title">Request a Quote</h5>

                      <button
                        type="button"
                        style={{ backgroundColor: "white", opacity: "1" }}
                        className="btn-close position-absolute top-0 start-100 translate-middle p-2 m-0 me-4 mt-1 shadow rounded-pill"
                        onClick={detailform}
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal"
                      ></button>
                    </div>

                    <div className="modal-body">
                      <span>
                        Please fill out the form below for specific pricing and
                        availability.
                      </span>
                      <form onSubmit={handleFormSubmit}>
                        <div className="row mb-3">
                          <div className="col-6">
                            <div className="form-group">
                              <label htmlFor="firstName">First Name *</label>

                              <input
                                type="text"
                                id="firstName"
                                name="first_name" // This will map to your EmailJS template placeholder
                                placeholder="Enter First Name"
                                className="form-control shadow-none border border-light border-2"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label htmlFor="lastName">Last Name *</label>
                              <input
                                type="text"
                                id="lastName"
                                name="last_name" // This will map to your EmailJS template placeholder
                                placeholder="Enter Last Name"
                                className="form-control shadow-none border border-light border-2"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <div className="form-group">
                              <label htmlFor="zipCode">Zip Code *</label>
                              <input
                                type="number"
                                id="zipCode"
                                name="zipcode" // This will map to your EmailJS template placeholder
                                placeholder="Enter Zip Code"
                                className="form-control shadow-none border border-light border-2"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label htmlFor="email">Email Address *</label>
                              <input
                                type="email"
                                id="email"
                                name="email" // This will map to your EmailJS template placeholder
                                placeholder="Enter Email"
                                className="form-control shadow-none border border-light border-2"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <div className="form-group">
                              <label htmlFor="company">Company Name</label>
                              <input
                                type="text"
                                id="company"
                                name="company" // This will map to your EmailJS template placeholder
                                placeholder="Enter Company Name"
                                className="form-control shadow-none border border-light border-2"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label htmlFor="phone">Phone Number</label>
                              <input
                                type="text"
                                id="phone"
                                name="phone" // This will map to your EmailJS template placeholder
                                placeholder="Enter Phone Number"
                                className="form-control shadow-none border border-light border-2"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="message">Notes</label>
                              <textarea
                                id="message"
                                name="message" // This will map to your EmailJS template placeholder
                                placeholder="Enter your message here..."
                                className="form-control shadow-none border border-light border-2"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btnsubmit text-white w-100 rounded-pill"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <Carousel />
      <Footer />
    </>
  );
}

export default App;
