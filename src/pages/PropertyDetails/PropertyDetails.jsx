import React, { useContext, useState, useEffect } from 'react'
import './PropertyDetails.css'
import { useParams } from 'react-router'
import axios from 'axios'
import { BiBed, BiBath } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../../components/Modal/Modal.css'
import { ShortlistContext } from '../../context/ShortlistContext';



function PropertyDetails() {

    //  Page to show details of selected property

    const { propertyId } = useParams()  //   Get property id from url
    const [property, setProperty] = useState({})    //  Store the selected property object in state
    const [selectedImage, setSelectedImage] = useState([])  //  Store the currently selected image to be show
    const [allImages, setAllImages] = useState([])  //  Store an array of all images
    const [keyFeatures, setKeyFeatures] = useState([])  //  Store array of all key features
    const [bedroomPrices, setBedroomPrices] = useState({})  //  Store an array of all bedroom prices to be shown
    const [isOpen, setIsOpen] = useState(false)     //  State from if modal is currently being shown
    const { addProperty, removeProperty, shortlist } = useContext(ShortlistContext)     //  Retrieve global state and functions from context
    const [onShortlist, setOnShortlist] = useState(false)   //  Store if property is in shortlist to update heart icon
    const objectEntries = Object.entries(bedroomPrices)     //  Store the bedroom price object as variable to map through
    Modal.setAppElement('#root'); // Assuming '#root' is the ID of your root element

    const customStyles = {
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };      //  Styles for modal

    //  Get property information from api when page loads
    useEffect(() => {
        axios.get(`https://unilife-server.herokuapp.com/properties/${propertyId}`)
            .then(res => {
                setProperty(res.data)
                setSelectedImage(res.data.images[0])
                setAllImages(res.data.images)
                setKeyFeatures(res.data.key_features)
                setBedroomPrices(res.data.bedroom_prices)
            })
            .catch(err => console.log(err))
    }, [])


    //  Update if property is in the shortlist when shortlist is updated or property state is changed
    useEffect(() => {
        setOnShortlist(shortlist?.find(item => item._id == property._id))
    }, [shortlist, property])

    //  Update state of selected image to be shown
    function handleImageSelection(e) {
        setSelectedImage(e.target.src)
    }

    return (
        <>
            <div className='property-details-container'>
                <Link to={`/citydetails/${property.city_id?._id}`} className='back-link'>&#8592; Back to Search</Link>
                <div className='property-images property-wrapper'>
                    <img src={selectedImage} alt="home image" />
                    <div className='property-images-thumbnails'>
                        {
                            allImages?.map((image, index) => {
                                return <img key={index} src={image} alt="home image" onClick={handleImageSelection} />
                            })
                        }
                    </div>
                </div>
                <div className='property-information-container'>
                    <div className='property-information property-wrapper'>
                        {property.address !== undefined && <h3>{property.address.street}, {property.address.city}, {property.address.postcode}</h3>}
                        <div className="item-flex">
                            <p className='item-label'>Bedrooms</p>
                            <div className="property-item">
                                <BiBed />
                                <p className='item-main'>{property?.bedroom_count}</p>
                            </div>
                        </div>
                        <div className="item-flex">
                            <p className='item-label'>Bathrooms</p>
                            <div className="property-item">
                                <BiBath />
                                <p className='item-main'>{property?.bathroom_count}</p>
                            </div>
                        </div>
                        <div className="property-item item-flex">
                            <p className='item-label'>Property Type</p>
                            <p className='item-main'>{property?.property_type}</p>
                        </div>
                        <div className="property-item item-flex">
                            <p className='item-label'>Price</p>
                            <p className='item-main'>£{bedroomPrices.bedroom_one}</p>
                        </div>
                        <div className="property-item item-flex">
                            <p className='item-label'>Furnished Type</p>
                            <p className='item-main'>{property?.furnished}</p>
                        </div>
                        <div className="property-item item-flex">
                            <p className='item-label'>Available From</p>
                            <p className='item-main'>{property?.availability}</p>
                        </div>
                    </div>
                    <div className='buttons-wrapper'>
                        {
                            onShortlist ?
                                <button className='shortlist-button' onClick={() => removeProperty(property)}><AiFillHeart style={{ color: 'red' }} /> Shortlist</button>
                                :
                                <button className='shortlist-button' onClick={() => addProperty(property)}><AiOutlineHeart /> Shortlist</button>
                        }

                        <button onClick={() => setIsOpen(true)} className='book-viewing-button'>Book Viewing</button>
                    </div>
                </div>
                <div className="property-description property-wrapper">
                    <h3>Description</h3>
                    <p>{property?.property_description}</p>
                </div>
                <div className="property-bedroom-prices property-wrapper">
                    <h3>Bedroom Prices</h3>
                    <div className='bedroom-prices-container'>
                        {/*     map through the bedroom prices object to get all prices to be shown per room */}
                        {
                            objectEntries.map(([bedroom, price], index) => (
                                <React.Fragment key={bedroom}> {/*   Generate a unique key using UUID */}
                                    <span className='bedroom-price'>
                                        <p>Bedroom {index + 1}:</p>
                                        <p>£{price} per week</p>
                                    </span>
                                    {index !== objectEntries.length - 1 && (
                                        <div key={index} className="separator"> {/*     Generate a unique key for the separator */}
                                            {/*  Separator content */}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                <div className="property-key-features property-wrapper">
                    <h3>Key Features</h3>
                    {
                        keyFeatures?.map((feature, index) => {
                            return <p key={index}><TiTick key={index} />   {feature}</p>
                        })
                    }
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Book a Viewing"
                style={customStyles}
            >
                <div className='modal-header'>
                    <h2>Book a Viewing</h2>
                    {property.address !== undefined && <h4>{property.address.street}, {property.address.city}, {property.address.postcode}</h4>}
                    <button className='modal-close-btn' onClick={() => setIsOpen(false)}><AiOutlineClose /></button>
                </div>
                <form className='booking-form'>
                    <div className='form-part-1'>
                        <label htmlFor="name">Name</label>

                        <input type="text" id="name" placeholder='Enter your name' />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='Enter your email address' />
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" id="phone" placeholder='Enter your phone number' />
                    </div>
                    <div className='form-part-2'>
                        <svg className='homeAndWork' width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.525 63.7083V46.2H37.95V63.7083V46.2H19.525V63.7083ZM5.5 65.175V37.3083C5.5 36.5139 5.68333 35.7194 6.05 34.925C6.41667 34.1306 6.96667 33.4889 7.7 33L25.6667 20.1667C26.5833 19.5556 27.6069 19.25 28.7375 19.25C29.8681 19.25 30.8917 19.5556 31.8083 20.1667L49.6833 33C50.4167 33.4889 50.9667 34.1458 51.3333 34.9708C51.7 35.7958 51.8833 36.6361 51.8833 37.4917V41.8C51.0889 42.5333 50.3403 43.2972 49.6375 44.0917C48.9347 44.8861 48.3083 45.7722 47.7583 46.75V36.7583L28.6917 23.1917L9.625 36.7583V63.7083H19.525V46.2H37.95V63.7083H44.1833C44.3056 64.4417 44.4736 65.1444 44.6875 65.8167C44.9014 66.4889 45.1611 67.1611 45.4667 67.8333H33.7333V50.325H23.65V67.8333H8.15833C7.425 67.8333 6.79861 67.5736 6.27917 67.0542C5.75972 66.5347 5.5 65.9083 5.5 65.175ZM82.5 9.625V42.9C81.8889 42.1667 81.2319 41.5403 80.5292 41.0208C79.8264 40.5014 79.1083 39.9972 78.375 39.5083V9.625H41.8917V19.9833L37.7667 17.1417V9.71667C37.7667 8.55556 38.1639 7.5625 38.9583 6.7375C39.7528 5.9125 40.7306 5.5 41.8917 5.5H78.375C79.475 5.5 80.4375 5.9125 81.2625 6.7375C82.0875 7.5625 82.5 8.525 82.5 9.625ZM63.8917 23.7417H69.025V18.5167H63.8917V23.7417ZM66.825 75.1667C62.4861 75.1667 58.7889 73.6236 55.7333 70.5375C52.6778 67.4514 51.15 63.8 51.15 59.5833C51.15 55.1833 52.6778 51.4403 55.7333 48.3542C58.7889 45.2681 62.5167 43.725 66.9167 43.725C71.1944 43.725 74.8764 45.2681 77.9625 48.3542C81.0486 51.4403 82.5917 55.1833 82.5917 59.5833C82.5917 63.8 81.0486 67.4514 77.9625 70.5375C74.8764 73.6236 71.1639 75.1667 66.825 75.1667ZM65.5417 60.9583V69.3917C65.5417 69.8194 65.6944 70.1556 66 70.4C66.3056 70.6444 66.6417 70.7667 67.0083 70.7667C67.375 70.7667 67.6958 70.6292 67.9708 70.3542C68.2458 70.0792 68.3833 69.7583 68.3833 69.3917V60.9583H76.8167C77.2444 60.9583 77.5806 60.8056 77.825 60.5C78.0694 60.1944 78.1917 59.8583 78.1917 59.4917C78.1917 59.125 78.0694 58.8194 77.825 58.575C77.5806 58.3306 77.2444 58.2083 76.8167 58.2083H68.3833V49.6833C68.3833 49.3167 68.2458 48.9958 67.9708 48.7208C67.6958 48.4458 67.375 48.3083 67.0083 48.3083C66.6417 48.3083 66.3056 48.4458 66 48.7208C65.6944 48.9958 65.5417 49.3167 65.5417 49.6833V58.2083H57.1083C56.7417 58.2083 56.4208 58.3306 56.1458 58.575C55.8708 58.8194 55.7333 59.125 55.7333 59.4917C55.7333 59.8583 55.8861 60.1944 56.1917 60.5C56.4972 60.8056 56.8333 60.9583 57.2 60.9583H65.5417Z" fill="#3A5295" />
                        </svg>

                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="4" placeholder='Enter your message'></textarea>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default PropertyDetails