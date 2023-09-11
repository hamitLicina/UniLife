import React, { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import CitySearch from "../../components/CitySearch/CitySearch";
import CityCard from "../../components/CityCard/CityCard";
import { Link } from "react-router-dom";



function HomePage() {
  const title = "Find student home with bills included";
  const message = "A simple and faster way to search for student accommodation";

  // Create state to hold all cities
  const [cities, setCities] = useState([]);

  // This page should show all cities when it loads and clicked for that reason I need to create useEffect get data from api
  useEffect(() => {
    console.log("https://unilife-server.herokuapp.com/cities");
    // Make API call to get All Cities

    axios
      .get(`https://unilife-server.herokuapp.com/cities`)
      .then((res) => {
        console.log(res.data.response);
        setCities(res.data.response);
      })
      .catch((err) => console.log(err));
  }, []); // Means it runs only once when the page loads

  return (
    <div className="homepage-container">
      <Slider title={title} message={message} />
      <CitySearch cities={cities} />
      <h2 className="city-cards-heading">
        Student accommodations in our top cities
      </h2>
      <div className="city-card-container">
        {cities?.map((city) => {
          return (
            <CityCard
              key={city?._id}
              name={city?.name}
              count={city?.property_count}
              imageUrl={city?.image_url}
            />
          );
        })}
      </div>
      <Link to={"/cities"}>
        <button className="see-all-cities-btn">See All Cities</button>
      </Link>
      <div className="compare-container">
        <h3>Compare all inclusive student homes.</h3>
        <div className="comparisons">
          <div className="compare">
            <img src="../../assets/search.png" alt="" />
            <h4>Search</h4>
            <p>
              Find your dream home in the perfect area near your university.
            </p>
          </div>
          <div className="compare">
            <img src="../../assets/compare.png" alt="" />
            <h4>Compare</h4>
            <p>Compare student accommodation to find the right home for you.</p>
          </div>
          <div className="compare">
            <img src="../../assets/bills.png" alt="" />
            <h4>Bills Included</h4>
            <p>Bills are included in all rent prices. No hidden fees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
