import React from 'react';
import AboutUsBanner from '../assets/images/Banner2.png';

const AboutUs = () => {
  return (
    <div className="container mt aboutus-container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src="https://i.pinimg.com/originals/da/5a/8d/da5a8dab734389d7b98629ee5907a3ca.png" alt="About Us Banner" className="about_banner img-fluid" style={{borderRadius: "50px"}} />
        </div>
        
        <div className="col-md-6 text-center">
          <h1>About Us</h1>
          <p>Welcome to IConnect, a cutting-edge video conferencing application designed for seamless communication.</p>
          <p>Our mission is to bring people closer together through high-quality video and audio calls, making remote collaboration effortless.</p>
          <span><q>Join us and experience the future of virtual meetings</q></span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
