import React from 'react'
import './CitySearch.css'
import { useNavigate } from 'react-router-dom'


function CitySearch({ cities }) {

    const navigate = useNavigate()

    function handleFormSubmit(e) {
        e.preventDefault();
        const selectedCity = e.target.city.value;
        const cityObject = cities.filter(city => city.name == selectedCity)
        if(cityObject) {
            navigate(`/citydetails/${cityObject[0]._id}`)
        } else {
            console.error(`City not found: ${selectedCity}`)
        }
    }

  return (
    <form className='city-search-form' onSubmit={handleFormSubmit}>
        <select name='city'>
            <option disabled >Search by City</option>
            {cities?.map((city) => {
                return (
                    <option key={city._id} value={city.name}>
                        {city.name}
                    </option>
                )
            })
            }
        </select>
        <button type='submit'>Find Homes</button>
    </form>
  )
}

export default CitySearch