import React, { useContext, useState, useEffect } from 'react'
import './PropertyDetails.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { BiBed, BiBath } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
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