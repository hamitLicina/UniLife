import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header/Header'


function App() {
  

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
