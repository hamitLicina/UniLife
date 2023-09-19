import React, { useContext, useEffect } from 'react'
import './Shortlist.css'
import { ShortlistContext } from '../../context/ShortlistContext'
import PropertyCard from '../../components/PropertyCard/PropertyCard'



function Shortlist() {

    //  Page to show saved shortlisted properties

    const { shortlist } = useContext(ShortlistContext)  //  Retrieve shortlisted properties from context

  return (
    <div className='shortlist-container'>
        {/* Map through shortlisted properties to show property cards or display a message if none saved */}
        {
            shortlist.length > 0 ?
            shortlist?.map(property => {
                return <PropertyCard key={property} property={property} />
        })
            :
            <h2>Add properties to your shortlist to view them here.</h2>
        }
    </div>
  )
}

export default Shortlist