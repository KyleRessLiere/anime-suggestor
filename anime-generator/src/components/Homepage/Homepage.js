import React from 'react'

import Navbar from"../Navbar/SiteNavbar";
import AnimeForm from './AnimeForm';
import './css/Homepage.css'
function Homepage() {
  return (
    <div className="homepage-container">
    <Navbar />
    <AnimeForm />
    </div>
  )
}

export default Homepage