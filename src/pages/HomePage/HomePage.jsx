import React, { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import CitySearch from "../../components/CitySearch/CitySearch";
import CityCard from "../../components/CityCard/CityCard";
import { Link } from "react-router-dom";



function HomePage() {

    //  Landing page with cards for each city as well as a search dropdown

    //  Information to pass to slider component
    const title = "Find student home with bills included";
    const message = "A simple and faster way to search for student accommodation";

    // Create state to hold all cities
    const [cities, setCities] = useState([]);

    // This page should show all cities when it loads and clicked for that reason I need to create useEffect get data from api
    useEffect(() => {
        // console.log("https://unilife-server.herokuapp.com/cities");
        // Make API call to get All Cities

        axios
            .get(`https://unilife-server.herokuapp.com/cities?limit=15`)
            .then((res) => {
                console.log(res.data.response);
                setCities(res.data.response);
            })
            .catch((err) => console.log(err));
    }, []); // Means it runs only once when the page loads


    return (
        <>
            <Slider title={title} message={message} />
            <div className='homepage-container' id='top'>
                <CitySearch cities={cities} />
                <h2 className='city-cards-heading'>Student accommodations in our top cities</h2>
                <div className='city-card-container'>
                    {
                        cities?.map((city) => {
                            return <CityCard key={city?._id} name={city?.name} count={city?.property_count} imageUrl={city?.image_url} cityId={city?._id} />
                        })
                    }
                </div>
                <Link to={'/cities'}><button className='see-all-cities-btn'>See All Cities</button></Link>
                <div className='compare-container'>
                    <h3>Compare all inclusive student homes.</h3>
                    <div className='comparisons'>
                        <div className='compare'>
                            <img src="images/search.png" alt="Search" />
                            <h4>Search</h4>
                            <p>Find your dream home in the perfect area near your university.</p>
                        </div>
                        <div className='compare'>
                            <img src="images/compare.png" alt="Compare" />
                            <h4>Compare</h4>
                            <p>Compare student accommodation to find the right home for you.</p>
                        </div>
                        <div className='compare'>
                            <img src="images/bills.png" alt="Bills Included" />
                            <h4>Bills Included</h4>
                            <p>Bills are included in all rent prices. No hidden fees.</p>
                        </div>
                    </div>
                </div>
                <div className='benefits-container'>
                    <div className='section-container'>
                        <h3>Best selection</h3>
                        <p>Best selection of student accommodations. Never been easier to find a home that’s right for you.</p>
                        <img className='section-image' src="images/handHouse.png" alt="hand icon" />
                    </div>
                    <div className='section-container'>
                        <h3>Your favorite</h3>
                        <p>Shortlist your favorite properties and send enquiries in one click.</p>
                        <img className='section-image' src="images/heart.png" alt="heart icon" />
                    </div>
                    <a href='#top'>Search & Compare</a>
                    <img className='man-image' src="images/man.png" alt="Man on the phone" />
                </div>
            </div>
        </>
    )
}

export default HomePage