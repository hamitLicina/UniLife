import React from 'react'
import './CitySearch.css'
import { useNavigate } from 'react-router'



function CitySearch({ cities }) {

    //  City search box with dropdown list of properties from api call

    const navigate = useNavigate()  //  Navigate hook to handle page routing

    //  Handle user input Where the form is submitted

    function handleFormSubmit(e) {
        e.preventDefault();
        const selectedCity = e.target.city.value;
        const cityObject = cities.filter(city => city.name == selectedCity)
        if (cityObject) {
            navigate(`/citydetails/${cityObject[0]._id}`)
        } else {
            console.error(`City not found: ${selectedCity}`)
        }
    }

    return (
        <form className='city-search-form' onSubmit={handleFormSubmit}>
            <select name='city' defaultValue="">
                <option disabled value="">Search by City</option>
                { //    Create an option for each city returned from api
                    cities?.map((city) => {
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