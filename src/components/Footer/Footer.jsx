import { useState } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai'
import axios from 'axios'



function Footer() {

  //  Footer component with option to sign up for email notifications

  const [emailAddress, setEmailAddress] = useState('')  // Create a state variable to hold the email input value
  const [emailMessage, setEmailMessage] = useState({ message: '', color: '' })  // State to store message and style when email submitted
  const url = 'https://unilife-server.herokuapp.com/subscriptions';   // Subscription post endpoint
  //  const requestData = { email: emailAddress };  // Axios post request

  //  Handle email validation and call post email function when form submitted
  function handleFormSubmission(e) {
    e.preventDefault();
    if (isValidEmail(emailAddress)) {
      postEmailAddress()
    } else {
      setEmailMessage({ message: `That e-mail doesn't look right. Please try again.`, color: 'red' })
    }
  }
  // Validate input formatting when form submitted
  function isValidEmail(emailAddress) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(emailAddress);
  }

  //  Post email address top endpoint with submitted email address. Set success message and color
  function postEmailAddress() {
    axios.post('https://unilife-server.herokuapp.com/subscriptions', { email: emailAddress })
      .then(res => {
        setEmailMessage({ message: 'Done. Thanks for subscribing to our newsletter', color: 'green' })
        console.log(res)
      })
      .catch(err => {
        setEmailMessage({ message: 'Sorry, there has been an error. Please try again.', color: 'red' })
        console.log(err)
      })
  }

  return (
    <div className='footer-container'>
      <div className="social-container">
        <div className="keep-in-touch">
          <h2>Keep in touch</h2>
          <p>Curious about new offerings? Sign up for our weekly newsletter and stay informed.</p>
          <form onSubmit={handleFormSubmission} className='email-form'>
            <input
              type="email"
              placeholder='Your email'
              id='email-input'
              value={emailAddress} // Bind the input value to the email state
              onChange={(e) => setEmailAddress(e.target.value)} // Update the email state when the input changes
            />
            <label htmlFor="email-input" className='email-input-label' style={{ color: emailMessage.color }}>{emailMessage.message}</label>
          </form>
        </div>
        <div className='socialize'>
          <h2>Let&apos;s socialize</h2>
          <div className='social-link'>
            <BsFacebook />
            <p>Facebook</p>
          </div>
          <div className='social-link'>
            <AiFillTwitterCircle />
            <p>Twitter</p>
          </div>
          <div className='social-link'>
            <AiFillInstagram />
            <p>Instagram</p>
          </div>
        </div>
      </div>
      <div className='links-container'>
        <div className='links'>
          <Link to={'#'}>About Us</Link>
          <Link to={'#'}>Terms & Conditions</Link>
          <Link to={'#'}>Privacy & Cookies Policy</Link>
        </div>
        <div className='copywrite'>
          <p>2023</p>
          <p>&copy;UniLife</p>
        </div>
      </div>
    </div>
  )
}

export default Footer