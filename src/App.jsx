import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header/Header'
import CitiesSearch from './pages/CitiesSearch/CitiesSearch'
import CityDetails from './pages/CityDetails/CityDetails'
import Footer from './components/Footer/Footer'



function App() {  

  return (
    
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/cities' element={<CitiesSearch />}></Route>
        <Route path='/citydetails/:cityid' element={<CityDetails />}></Route>
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App