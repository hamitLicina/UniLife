import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineMail, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Modal from 'react-modal'
import '../../components/Modal/Modal.css'
import uniLifeLogo from '../../assets/uniLifeLogo.png'



function Header() {

  //  Header component with links to the homepage, shortlist and a modal for contacting us

  const [isContactOpen, setIsContactOpen] = useState(false)   //  State for the contact modal open or not
  const [isNavOpen, setIsNavOpen] = useState(false)   //  State for the nav mobile modal open

  Modal.setAppElement('#root'); // Assuming '#root' is the ID of your root element


  const customStyles = {  // Styles for the modal
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '12px',
      maxWidth: '90vw',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  };

  const customNavStyles = {   // Styles for the nav modal
    content: {
      transform: 'translate(0, 95%)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.0)'
    }
  };

  function toggleNavMenu() {
    setIsNavOpen(!isNavOpen)
  }


  return (
    <>
      <nav className='header-container' id='header'>
        <div className='header-home'>
          <Link to={'/'}><img src={uniLifeLogo} alt='uniLife logo' /></Link>
        </div>
        <div className='header-links'>
          <Link to={'/shortlist'}><AiOutlineHeart />Shortlist</Link>
          <Link to={'#'} onClick={() => setIsContactOpen(true)}><AiOutlineMail />Contact Us</Link>
        </div>
        <button className='mobile-nav-button' onClick={() => {
          toggleNavMenu()
          setIsContactOpen(false)
        }}><AiOutlineMenu /></button>
        <Modal
          isOpen={isNavOpen}
          onRequestClose={() => setIsNavOpen(false)}
          contentLabel="Mobile menu"
          className={'nav-modal'}
          style={customNavStyles}
        >
          <div className='nav-modal'>
            <Link to={'/shortlist'} onClick={() => setIsNavOpen(false)}><AiOutlineHeart />Shortlist</Link>
            <Link to={'#'} onClick={() => {
              setIsContactOpen(true)
              setIsNavOpen(false)
            }
            }><AiOutlineMail />Contact Us</Link>
          </div>
        </Modal>
      </nav>

      <Modal
        isOpen={isContactOpen}
        onRequestClose={() => setIsContactOpen(false)}
        contentLabel="Book a Viewing"
        style={customStyles}
      >
        <div className='modal-header'>
          <h2>Contact Us</h2>
          <svg className='postOffice' width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.917 78.8334C11.1225 78.8334 10.4656 78.5737 9.94616 78.0542C9.42671 77.5348 9.16699 76.8779 9.16699 76.0834V51.0584C9.16699 50.264 9.42671 49.5917 9.94616 49.0417C10.4656 48.4917 11.1225 48.2167 11.917 48.2167H24.2003V28.6917C24.2003 23.1917 26.1253 18.5626 29.9753 14.8042C33.8253 11.0459 38.5003 9.16675 44.0003 9.16675H59.5837C64.9003 9.16675 69.4378 11.0765 73.1962 14.8959C76.9545 18.7154 78.8337 23.314 78.8337 28.6917V76.7251C78.8337 77.3362 78.635 77.8404 78.2378 78.2376C77.8406 78.6348 77.3364 78.8334 76.7253 78.8334C76.1142 78.8334 75.6253 78.6348 75.2587 78.2376C74.892 77.8404 74.7087 77.3362 74.7087 76.7251V68.1084H55.917V76.0834C55.917 76.8779 55.5962 77.5348 54.9545 78.0542C54.3128 78.5737 53.5337 78.8334 52.617 78.8334H11.917ZM55.917 63.9834H74.7087V28.6917C74.7087 24.414 73.2267 20.7779 70.2628 17.7834C67.2989 14.789 63.7392 13.2917 59.5837 13.2917H44.0003C39.6614 13.2917 35.9795 14.7737 32.9545 17.7376C29.9295 20.7015 28.417 24.3529 28.417 28.6917V48.2167H52.617C53.5337 48.2167 54.3128 48.4765 54.9545 48.9959C55.5962 49.5154 55.917 50.2029 55.917 51.0584V63.9834ZM39.692 34.7417C39.0809 34.7417 38.5767 34.5431 38.1795 34.1459C37.7823 33.7487 37.5837 33.2445 37.5837 32.6334C37.5837 32.0834 37.7823 31.5945 38.1795 31.1667C38.5767 30.739 39.0809 30.5251 39.692 30.5251H63.4337C63.9837 30.5251 64.4573 30.739 64.8545 31.1667C65.2517 31.5945 65.4503 32.0834 65.4503 32.6334C65.4503 33.2445 65.2517 33.7487 64.8545 34.1459C64.4573 34.5431 63.9837 34.7417 63.4337 34.7417H39.692ZM31.992 63.0667C32.1142 63.189 32.2823 63.2501 32.4962 63.2501C32.71 63.2501 32.9087 63.189 33.092 63.0667L51.7003 52.4334H13.292L31.992 63.0667ZM13.292 74.7084H51.7003V56.4667L35.2003 65.9084C34.7725 66.1529 34.3448 66.3362 33.917 66.4584C33.4892 66.5806 33.0309 66.6417 32.542 66.6417C32.0531 66.6417 31.5948 66.5806 31.167 66.4584C30.7392 66.3362 30.3114 66.1529 29.8837 65.9084L13.292 56.4667V74.7084ZM13.292 52.4334V57.0167V56.4667V74.7084V56.4667V57.0167V53.9001C13.292 53.5945 13.292 53.5945 13.292 53.9001V52.4334Z" fill="#3A5295" />
          </svg>

          <div className='welcome'>
            <p>Feel free to contact us if you have any questions.</p>
            <p>Looking forward to hearing from you.</p>
          </div>
          <button className='modal-close-btn' onClick={() => setIsContactOpen(false)}><AiOutlineClose /></button>
        </div>
        <form className='booking-form'>
          <div className='form-part-1'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Enter your name' />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" placeholder='Enter your phone number' />
            <label htmlFor='you'>Are you a...</label>
            <select id='you'>
              <option value="student">Student</option>
              <option value="guardian">Parent/Guardian</option>
              <option value="agent">Agent</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='form-part-2'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter your email address' />
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" placeholder='Enter your message'></textarea>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default Header