import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'



function Header() {
  return (
    <div className='header-container'>
      <div className="header-home">
        <Link to={'/'}>UniLife</Link>
      </div>
      <div className="header-links">
        <Link to={'#'}>shortlist</Link>
        <Link to={'#'}>contact us</Link>
      </div>
    </div>
  )
}

export default Header