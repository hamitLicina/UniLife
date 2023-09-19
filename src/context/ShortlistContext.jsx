//  Context to store and add/remove properties from the shortlist

import { useState, createContext, useEffect } from "react";

//  Create context
export const ShortlistContext = createContext();

export default function ShortlistContextProvider(props) {
    const [shortlist, setShortlist] = useState([]);

    //  Get shortlist from local storage
    useEffect(
        () => {
            const storedShortlist = localStorage.getItem('shortlist')
            if (storedShortlist) {
                setShortlist(JSON.parse(storedShortlist))
            }
        }, [])

    //  Save shortlist to local storage
    useEffect(
        () => {
            localStorage.setItem('shortlist', JSON.stringify(shortlist))
        }, [shortlist])


    //  Create a function to add a property to state
    const addProperty = (propertyToAdd) => {
        let newShortlist = [...shortlist, propertyToAdd]
        setShortlist(newShortlist)
    }

    //  Create function to remove property
    const removeProperty = (property) => {
        let newShortlist = (shortlist.filter(item => item._id != property._id))
        setShortlist(newShortlist)
    }

    return (
        <ShortlistContext.Provider value={{ addProperty, shortlist, removeProperty }}>
            {props.children}
        </ShortlistContext.Provider>
    );
}