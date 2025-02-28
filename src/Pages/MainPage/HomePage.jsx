import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Skeleton, Carousel } from "antd";
import { VideoCameraAddOutlined, SafetyOutlined, TeamOutlined, GlobalOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Mainpage.css";

import CarouselImg1 from "../../assets/Images/Corousel1.jpg";
import CarouselImg2 from "../../assets/Images/Corousel2.jpg";
import CarouselImg3 from "../../assets/Images/Corousel3.jpg";
import CarouselImg4 from "../../assets/Images/Corousel4.jpg";
import CarouselImg5 from "../../assets/Images/Corousel5.jpg";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.isAnonymous ? "Guest User" : user.displayName,
        });
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });

    return () => unsubscribe();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const carouselImages = [
    { src: CarouselImg1, alt: "Video calling feature" },
    { src: CarouselImg2, alt: "Team collaboration" },
    { src: CarouselImg3, alt: "Remote work solutions" },
    { src: CarouselImg4, alt: "Business meetings" },
    { src: CarouselImg5, alt: "Global connectivity" }
  ];

  return (
    <>
      <div className="content">
        {loading ? (
          <div className="text-center">
            <Skeleton.Input active size="large" style={{ width: '60%', maxWidth: '400px', height: '40px' }} />
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>
            {getGreeting()}, {user ? user.displayName : ""}
          </h1>
        )}
      </div>

      <div className="container hero_section">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-5">
            {loading ? (
              <div className="hero-skeleton" style={{ padding: '15px' }}>
                <Skeleton.Input active size="large" style={{ width: '100%', height: '40px', marginBottom: '30px', display: "block" }} />
                <Skeleton paragraph={{ rows: 2 }} active size="large" style={{ width: '100%', height: '24px', marginBottom: '40px' }} />
                <Skeleton.Button active size="large" shape="default" style={{ width: '220px', height: '45px', marginBottom: '25px' }} />
                <div className="d-flex flex-wrap">
                  <Skeleton.Button active size="small" shape="round" style={{ width: '100px', height: '30px', marginRight: '10px', marginBottom: '10px' }} />
                  <Skeleton.Button active size="small" shape="round" style={{ width: '140px', height: '30px', marginRight: '10px', marginBottom: '10px' }} />
                  <Skeleton.Button active size="small" shape="round" style={{ width: '120px', height: '30px', marginBottom: '10px' }} />
                </div>
              </div>
            ) : (
              <>
                <h1>Video Calling Feature for Everyone</h1>
                <h3>
                  <q>Seamless video calls, limitless connections - redefine virtual meetings with ease</q>
                </h3>
                <Button
                  type="primary"
                  size="large"
                  icon={<VideoCameraAddOutlined />}
                  className="start-button"
                >
                  Start Instant Meeting
                </Button>

                <div className="feature-pills">
                  <div className="feature-pill">
                    <SafetyOutlined /> Secure
                  </div>
                  <div className="feature-pill">
                    <TeamOutlined /> Up to 100 Users
                  </div>
                  <div className="feature-pill">
                    <GlobalOutlined /> Global Access
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            {loading ? (
              <div className="carousel-skeleton d-flex justify-content-center align-items-center" style={{ padding: '15px', height: '100%' }}>
                <div style={{ width: '300px', height: '300px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Skeleton.Image
                    active
                    style={{
                      width: "100%",
                      height: '100%',
                      objectFit: 'cover',
                      padding: "100px 150px",
                      borderRadius: "15px"
                    }}
                    className="img-fluid"
                  />
                </div>
              </div>
            ) : (
              <Carousel
                autoplay
                effect="fade"
                className="hero-carousel"
              >
                {carouselImages.map((img, index) => (
                  <div key={index} className="carousel-item">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="img-fluid carousel-image"
                      style={{ borderRadius: "15px", width: "100%", height: "auto" }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
      <div className="container features-section mt-5">
        {loading ? (
          <div className="text-center mb-4">
            <Skeleton.Input active size="large" style={{ width: '50%', maxWidth: '300px', height: '36px' }} />
          </div>
        ) : (
          <h2 className="text-center mb-4"
            style={{
              background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              fontWeight: "bold"
            }}
          >Why Choose Our Platform</h2>
        )}

        <div className="row">
          {loading ? (
            Array(3).fill().map((_, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="feature-card-skeleton p-4" style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  margin: '10px',
                  height: '100%'
                }}>
                  <div className="text-center mb-3">
                    <Skeleton.Avatar active size={64} shape="circle" />
                  </div>
                  <div className="text-center mb-3">
                    <Skeleton.Input active size="default" style={{ width: '70%', height: '24px' }} />
                  </div>
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="col-12 col-md-4 mb-4">
                <div className="feature-card">
                  <div className="feature-icon"><SafetyOutlined /></div>
                  <h3>End-to-End Encryption</h3>
                  <p>Your meetings are secure with our advanced encryption protocols.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="feature-card">
                  <div className="feature-icon"><TeamOutlined /></div>
                  <h3>Large Group Support</h3>
                  <p>Host meetings with up to 100 participants without quality loss.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="feature-card">
                  <div className="feature-icon"><GlobalOutlined /></div>
                  <h3>Global Accessibility</h3>
                  <p>Connect with anyone, anywhere in the world with minimal latency.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="container testimonials-section mt-5">
        {loading ? (
          <div className="text-center mb-4">
            <Skeleton.Input active size="large" style={{ width: '40%', maxWidth: '250px', height: '36px' }} />
          </div>
        ) : (
          <h2 className="text-center mb-4" style={{
            background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            fontWeight: "bold"
          }}>What Our Users Say</h2>
        )}
        {loading ? (
          <div className="testimonial-skeleton p-4" style={{
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            margin: '0 20px'
          }}>
            <Skeleton active paragraph={{ rows: 2 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Skeleton.Input active size="small" style={{ width: '150px', height: '20px' }} />
            </div>
          </div>
        ) : (
          <Carousel autoplay dotPosition="bottom">
            <div className="testimonial-item">
              <p>"This platform has transformed how our remote team collaborates. The video quality is exceptional."</p>
              <div className="testimonial-author">- Sarah J., Product Manager</div>
            </div>
            <div className="testimonial-item">
              <p>"I use this for my online courses. The stability and features make teaching online a breeze."</p>
              <div className="testimonial-author">- Michael T., Educator</div>
            </div>
            <div className="testimonial-item">
              <p>"The best video calling platform I've used. Simple interface with powerful capabilities."</p>
              <div className="testimonial-author">- Priya M., Tech Entrepreneur</div>
            </div>
          </Carousel>
        )}
      </div>
    </>
  );
};

export default HomePage;