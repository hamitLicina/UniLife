import React, { useEffect, useState } from 'react'
import './CityDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PropertyCard from '../../components/PropertyCard/PropertyCard'
import Slider from '../../components/Slider/Slider'
import CityInformation from '../../components/CityInformation/CityInformation'



function CityDetails() {

    //  Page with option to filter property cards based on the selected city. Description of city below property cards

    const { cityid } = useParams()  //  Get city id from url
    const [city, setCity] = useState({})    //  Store selected city in state
    const [properties, setProperties] = useState([])    //  Store all properties available in the city
    const [propertyTypes, setPropertyTypes] = useState([])  //  Store propertyTypes in state from url call. Used to create property type options
    const [filteredProperties, setFilteredProperties] = useState(
        {
            city_id: cityid,
            bedroom_count: "",
            bathroom_count: "",
            property_type: "",
            rent: ""
        }        
    )   //  State to store current filter selection as an object. Passed to api as a POST request

    //  Info to pass to the slider component
    const title = 'Search Accommodation'
    const message = 'Whatever you’re after, we can help you find the right student accommodation for you.'

    //  Get the city data and propertyTypes from api when the page loads
    useEffect(() => {
        axios.get(`https://unilife-server.herokuapp.com/cities/${cityid}`)
        .then(res => {
            setCity(res.data.data[0])
        })
        .catch(err => console.log(err))

        axios.get(`https://unilife-server.herokuapp.com/propertyTypes`)
        .then(res => {
            setPropertyTypes(res.data.response)
        })
        .catch(err => console.log(err))
    }, [])

    //  Update the properties state when the filters are changed
    useEffect(() => {
        axios.post(`https://unilife-server.herokuapp.com/properties/filter`, { query: filteredProperties })
        .then(res => {
            setProperties(res.data.response)
        })
        .catch(err => console.log(err))
    }, [filteredProperties])

    //  Update the filter object state when one of the filters is changed
    function updateFilter(e) {
        const updatedFilter = { ...filteredProperties }
        updatedFilter[e.target.name] = `${e.target.value}`
        setFilteredProperties(updatedFilter)
    }

  return (
    <>
        <Slider title={title} message={message} />
        <div className="city-details-container">
            <div className="property-filter">
                <div className="filter-area">
                    <label htmlFor="bedroom" className='filter-label'>Min Bedroom</label>
                    <select name="bedroom_count" id="bedroom" onInput={updateFilter}>
                        <option value="">Any bedroom</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div className="filter-area">
                    <label htmlFor="bathroom" className='filter-label'>Min Bathroom</label>
                    <select name="bathroom_count" id="bathroom" onInput={updateFilter}>
                        <option value="">Any bathroom</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="filter-area">
                    <label htmlFor="price" className='filter-label'>Max Price</label>
                    <select name="rent" id="price" onInput={updateFilter}>
                        <option value="">Any price</option>
                        <option value="1000">1000</option>
                        <option value="1500">1500</option>
                        <option value="2000">2000</option>
                        <option value="2500">2500</option>
                        <option value="3000">3000</option>
                    </select>
                </div>
                <div className="filter-area">
                    <label htmlFor="home" className='filter-label'>Home Type</label>
                    <select name="property_type" id="home" onInput={updateFilter}>
                        <option value="">Any type</option>
                            {
                                propertyTypes?.map((type, index) => {
                                    return <option key={index} value={type.name}>{type.name}</option>
                                })
                            }
                    </select>
                </div>
            </div>
            <div className='citydetails-container'>
                <h1>{city?.property_count} homes in {city?.name}</h1>
                    {
                        <div className="properties-container">
                            {
                                properties.length === 0 ?
                                    <h2>Sorry, no properties match your criteria.</h2>
                                    :
                                    properties?.map(property => {
                                        return <PropertyCard key={property._id} property={property} />
                                    })
                            }
                        </div>
                    }
            </div>
                <CityInformation city={city} />
        </div>
    </>
  )
}

export default CityDetails