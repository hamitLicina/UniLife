import React from 'react'
import './CityNameCard.css'
import { Link } from 'react-router-dom'


function CityNameCard({ name, id }) {

  //  City name card wrapped in routing link to view properties in that city

  return (
    <Link to={`/citydetails/${id}`} className='city-name-container'>
      <h3 className="city-card-name">{name}</h3>
    </Link>
  )
}

export default CityNameCard