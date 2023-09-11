import React from 'react'
import './Slider.css'


function Slider({title, message}) {
  return (
    <div className='slider-container'>
      <div className="slider-text">
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Slider