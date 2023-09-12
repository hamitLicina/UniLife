import React, { useEffect, useState } from 'react'
import './CitiesSearch.css'
import axios from 'axios'
import Slider from './../../components/Slider/Slider';
import CityNameCard from './../../components/CityNameCard/CityNameCard';


function CitiesSearch() {

  const title = 'Student Accommodation'
  const message = 'UniLife have student accommodation available across the UK. Whatever you’re after, we can help you find the right student accommodation for you.'
  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get('https://unilife-server.herokuapp.com/cities')
    .then(res => {
      setCities(res.data.response)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Slider title={title} message={message} />
      <h2 className="search-by-city-heading">Search by City</h2>
      <div className='cityname-card-container'>
        {
          cities.map(city => {
            return <CityNameCard key={city._id} name={city.name} id={city._id} />
          })
        }
      </div>
    </div>
  )
}

export default CitiesSearch