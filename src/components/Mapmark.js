import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Mapmark({ filteredLocation,handleMarkerClick }) {
  console.log(filteredLocation);
  return (
    <>
      {filteredLocation?.map((location) => (
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
            scaledSize: new window.google.maps.Size(65, 65),
          }}
        />
      ))}
    </>
  );
}
