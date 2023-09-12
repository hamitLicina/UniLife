import React from 'react'
import './CityNameCard.css'
import { Link } from 'react-router-dom'


function CityNameCard({ name, id }) {
  return (
    <Link to={`/citydetails/${id}`} className='city-name-container'>
        <h3 className="city-card-name">{name}</h3>
    </Link>
  )
}

export default CityNameCard