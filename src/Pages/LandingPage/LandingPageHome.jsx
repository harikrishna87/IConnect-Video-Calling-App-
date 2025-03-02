import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import "../../Components/component.css"
import AboutUs from '../LandingPage/LandingPageAboutUs'
import Header from '../../Components/Header'

const Home = () => {

  const navigate = useNavigate()

  const handlelogin = () => {
    navigate("/login")
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt">
          <div className="col-md-6">
            <h3 className="text-center">Welcome to our website</h3>
            <h1 className="text-center">IConnect</h1>
            <h2 className="text-center">A Video Conference Application</h2>
            <button className="btn1" onClick={handlelogin}>Known More</button>
          </div>
          <div className="col-md-6">
            <img src="https://images.prismic.io/getstream/Zmrzn5m069VX1t_S_hero-video-calling.png?auto=format,compress" alt="Banner" className="banner img-fluid" width={1000} height={400}/>
          </div>
        </div>
      </div>

      <AboutUs />
    </>
  )
}

export default Home