import React from 'react'
import './CityInformation.css'
import students from '../../assets/students.png'



function CityInformation({ city }) {

  //  City information card to display city name and paragraph information from api

  return (
    <div className='city-information-container'>
      <div className="information-text">
        <h2>Being a student in {city?.name}</h2>
        <p>{city?.student_life}</p>
        <p>{city?.universities}</p>
      </div>
      <img src={students} alt="Happy Students" />
    </div>
  )
}

export default CityInformation