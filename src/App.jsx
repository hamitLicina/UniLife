import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header/Header'
import CitiesSearch from './pages/CitiesSearch/CitiesSearch'
import CityDetails from './pages/CityDetails/CityDetails'
import Footer from './components/Footer/Footer'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'
import ShortlistContextProvider from './context/ShortlistContext'
import Shortlist from './pages/Shortlist/Shortlist'



function App() {  

  return (
    
    <BrowserRouter>
      <ShortlistContextProvider>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/cities' element={<CitiesSearch />}></Route>
        <Route path='/citydetails/:cityid' element={<CityDetails />}></Route>
        <Route path='/propertydetails/:propertyId' element={<PropertyDetails />}></Route>
        <Route path='/shortlist' element={<Shortlist />} />
      </Routes>

      <Footer />
      </ShortlistContextProvider>

    </BrowserRouter>
  )
}

export default App