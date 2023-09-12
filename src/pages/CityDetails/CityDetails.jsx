import React, { useEffect, useState } from 'react'
import './CityDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PropertyCard from '../../components/PropertyCard/PropertyCard'
import Slider from '../../components/Slider/Slider'



function CityDetails() {

    const { cityid } = useParams()
    const [city, setCity] = useState([])
    const [properties, setProperties] = useState([])
    const [propertyTypes, setPropertyTypes] = useState([])
    const [filteredProperties, setFilteredProperties] = useState(
        {
            city_id: cityid,
            bedroom_count: "",
            bathroom_count: "",
            property_type: "",
            rent: ""
        }        
    )

    const title = 'Search Accommodation'
    const message = 'Whatever you’re after, we can help you find the right student accommodation for you.'

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

    useEffect(() => {
        axios.post(`https://unilife-server.herokuapp.com/properties/filter`, { query: filteredProperties })
        .then(res => {
            setProperties(res.data.response)
        })
        .catch(err => console.log(err))
    }, [filteredProperties])

    function updateFilter(e) {
        const updatedFilter = { ...filteredProperties }
        updatedFilter[e.target.name] = `${e.target.value}`
        setFilteredProperties(updatedFilter)
    }

  return (
    <>
        <Slider title={title} message={message} />
        <div className="property-filter">
            <div className="filter-area">
                <label htmlFor='bedroom'>Min Bedroom</label>
                <select name='bedroom_count' id='bedroom' onInput={updateFilter}>
                    <option value="">Any</option>
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
                <label htmlFor='bathroom'>Min Bathroom</label>
                <select name='bathroom_count' id='bathroom' onInput={updateFilter}>
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div className="filter-area">
                <label htmlFor='price'>Max Price</label>
                <select name='rent' id='price' onInput={updateFilter}>
                    <option value="">Any</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                    <option value="3000">3000</option>
                </select>
            </div>
            <div className="filter-area">
                <label htmlFor='home'>Home Type</label>
                <select name='property_type' id='home' onInput={updateFilter}>
                    <option value="">Any</option>
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
                <div className='properties-container'>
                    {
                        properties.length === 0 ? 
                        <h2>Sorry, there is no properties match your criteria.</h2>
                        :
                        properties?.map(property => {
                            return <PropertyCard key={property._id} property={property} />
                        })
                    }
                </div>
            }
        </div>
    </>
  )
}

export default CityDetails