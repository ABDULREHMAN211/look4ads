<div
  style={{ height: "730px", width: "1340px", marginBottom: "200px" }}
  className="respabovemap"
>
  <MapContainer
    center={mapCenter}
    zoom={5}
    style={{
      width: "100%",
      height: "100%",
      borderRadius: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    }}
    className="position-relative respmap"
    zoomControl={false}
  >
    <ZoomControl position="bottomleft" />
    <div
      className="position-absolute top-0 productresp m-3"
      style={{ zIndex: "1000" }}
    >
      <div
        className="d-flex bg-white my-2 px-2 py-1 justify-content-between rounded-4 respsearch"
        style={{ width: "385px" }}
      >
        <input
          placeholder="Country, Zip Code"
          className="border-0 py-1 ms-1"
          style={{ width: "281px", height: "27px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="border-0 text-white p-4 py-2 rounded-4 me-1"
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

    <TileLayer
      url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      subdomains={["mt0", "mt1", "mt2", "mt3"]}
      style={{ borderRadius: "20px" }}
    />
    {satelliteView && (
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
    )}
    {/* Add a MapViewUpdater to update the map view */}
    <MapViewUpdater />

    {/* Loop through locations to add multiple markers */}
    {filteredLocation.map((location) => (
      <Marker
        key={location.id}
        position={[location.lat, location.lng]}
        icon={
          new L.Icon({
            iconUrl:
              "https://cdn.worldvectorlogo.com/logos/google-maps-2020-icon.svg", // Custom marker icon URL
            iconSize: [29, 41],
            iconAnchor: [12, 41],
          })
        }
        eventHandlers={{
          click: handleMarkerClick, // Add the click event handler
        }}
      >
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
                        Reaches heavy traffic on Rt.32 between New Windsor and
                        Newburgh, I-84 and I-87
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
                            <div className="pId">Junior Bulletin,Regular</div>
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
      </Marker>
    ))}
  </MapContainer>
</div>;
