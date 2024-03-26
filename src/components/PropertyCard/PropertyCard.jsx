import React, { useContext, useEffect, useState } from "react";
import "./PropertyCard.css";
import { BiBed, BiBath, BiLocationPlus } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { AiFillHeart } from "react-icons/ai";
import { ShortlistContext } from "../../context/ShortlistContext";



function PropertyCard({ property }) {

  //  Card to show property overview with link to more details, heart for shortlist

  const navigate = useNavigate() // Navigate hook for routing
  const [onShortlist, setOnShortlist] = useState(false) //  Store if the property is shortlisted and show heart icon
  const { shortlist } = useContext(ShortlistContext) // Get global state from context

  //  Set heart icon based on state when component loads
  useEffect(() => {
    setOnShortlist(shortlist?.find(item => item._id == property._id))
  }, [])

  //  Navigate when button is clicked
  function handleClick() {
    navigate(`/propertydetails/${property._id}`)
  }

  return (
    <div className="property-container">
      {onShortlist && <AiFillHeart className='shortlist-heart' style={{ color: 'red' }} />}
      <div className="image-wrapper" style={{ backgroundImage: `url('${property.images[0]}')` }}></div>
      <div className="price-and-rooms">
        <div className="price">
          <h3>${property.rent}</h3>
          <p>pppw including bills</p>
        </div>
        <div className="rooms">
          <p><BiBed /> {property.bedroom_count}</p>
          <p><BiBath /> {property.bathroom_count}</p>
        </div>
      </div>
      <div className="building-info">
        <p>{property.property_type}</p>
        <p>{property.furnished}</p>
      </div>
      <p className="location"><BiLocationPlus />{property.address.street}, {property.address.city}, {property.address.postcode}</p>
      <button className="view-home-button" onClick={handleClick}>View Home</button>
    </div>
  );
}

export default PropertyCard