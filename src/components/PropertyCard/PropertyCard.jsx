import React from "react";
import "./PropertyCard.css";
import { BiBed, BiBath, BiLocationPlus } from "react-icons/bi";

function PropertyCard({ property }) {
  return (
    <div className="property-container">
      <div
        className="image-wrapper"
        style={{ backgroundImage: `url('${property.images[0]}')` }}></div>
      <div className="price-and-rooms">
        <div className="price">
          <h3>${property.rent}</h3>
          <p>pppw including bills</p>
        </div>
        <div className="rooms">
          <p>
            <BiBed /> {property.bedroom_count}
          </p>
          <p>
            <BiBath /> {property.bathroom_count}
          </p>
        </div>
      </div>
      <div className="building-info">
        <p>{property.property_type}</p>
        <p>{property.furnished}</p>
      </div>
      <p className="location">
        <BiLocationPlus />
        {property.address.street}, {property.address.city},{" "}
        {property.address.postcode}
      </p>
      <button className="view-home-button">View Home</button>
    </div>
  );
}

export default PropertyCard