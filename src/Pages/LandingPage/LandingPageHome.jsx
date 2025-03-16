import React, { useEffect, useState } from 'react';
import { Button, Typography, Row, Col, Space, Skeleton, Card, Carousel } from 'antd';
import { VideoCameraOutlined, TeamOutlined, GlobalOutlined, RocketOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import "../../Components/component.css";
import Corousel1 from "../../assets/Images/Corousel1.jpg";
import Corousel2 from "../../assets/Images/Corousel2.jpg";
import Corousel3 from "../../assets/Images/Corousel3.jpg";
import Corousel4 from "../../assets/Images/Corousel4.jpg";
import Corousel5 from "../../assets/Images/Corousel5.jpg";
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const featureCardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

const LandingPageHero = () => {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoaded = () => {
    setImagesLoaded(prev => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
        setLoading(false);
      }
      return newCount;
    });
  };

  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate("/login")
  }

  const features = [
    {
      icon: <TeamOutlined className="feature-icon" />,
      title: 'Group Calls',
      description: 'Host meetings with up to 20 participants with crystal clear audio and video.',
      color: '#4B56D2'
    },
    {
      icon: <GlobalOutlined className="feature-icon" />,
      title: 'Global Coverage',
      description: 'Connect with anyone, anywhere in the world with low-latency performance.',
      color: '#47A992'
    },
    {
      icon: <VideoCameraOutlined className="feature-icon" />,
      title: 'HD Quality',
      description: 'Enjoy high-definition video quality with adaptive streaming technology.',
      color: '#FF6969'
    },
    {
      icon: <RocketOutlined className="feature-icon" />,
      title: 'Instant Setup',
      description: 'No downloads required. Start or join calls directly from your browser.',
      color: '#EA8FEA'
    }
  ];

  return (
    <div className="hero-container" style={{
      fontFamily: 'Times New Roman, serif',
      background: 'transparent',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Row gutter={[24, 24]} align="middle" className="hero-content">
          <Col xs={24} md={24} lg={12} className="hero-text-col">
            {loading ? (
              <div className="skeleton-container">
                <Skeleton active paragraph={{ rows: 2 }} title={{ width: '80%' }} style={{ marginTop: "50px", marginBottom: 30 }} />
                <div style={{ marginTop: '2em', marginBottom: 20 }}>
                  <Skeleton.Button active size="large" shape="default" style={{ width: 150, marginRight: 16, marginBottom: 20 }} />
                  <Skeleton.Button active size="large" shape="default" style={{ width: 120 }} />
                </div>
              </div>
            ) : (
              <div className="hero-text-wrapper">
                <motion.div variants={itemVariants}>
                  <Title level={1} style={{
                    fontFamily: 'Times New Roman, serif',
                    fontSize: 'clamp(2.5em, 5vw, 3.5em)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Video Calling Feature for Everyone
                  </Title>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Paragraph className="hero-subtitle" style={{
                    fontFamily: 'Times New Roman, serif',
                    fontSize: 'clamp(1.8em, 2vw, 1.5em)',
                    color: '#555',
                    marginBottom: '2em',
                    lineHeight: 1.6
                  }}>
                    Seamless video calls, limitless connections - redefine virtual meetings with ease
                  </Paragraph>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Space size="large" className="button-container" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<VideoCameraOutlined />}
                      style={{
                        background: 'linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)',
                        border: 'none',
                        height: '50px',
                        padding: '0 30px',
                        fontSize: '16px',
                        boxShadow: '0 10px 20px rgba(75, 86, 210, 0.2)',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                      onClick={handleLoginButton}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      Start Call Now
                    </Button>

                    <Button
                      size="large"
                      style={{
                        height: '50px',
                        padding: '0 30px',
                        fontSize: '16px',
                        borderColor: '#4B56D2',
                        color: '#4B56D2',
                        background: 'transparent',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                      onClick={handleLoginButton}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      Learn More
                    </Button>
                  </Space>
                </motion.div>
              </div>
            )}
          </Col>

          <Col xs={24} md={24} lg={12} className="hero-image-container">
            {loading ? (
              <div
                className="carousel-placeholder"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Skeleton.Image
                  active
                  style={{
                    marginTop: "80px",
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    padding: "125px"
                  }}
                />
              </div>
            ) : (
              <motion.div
                className="carousel-container"
                variants={itemVariants}
                style={{
                  borderRadius: '20px',
                  position: 'relative',
                  marginTop: '2em'
                }}
              >
                <Carousel
                  autoplay={{ dotDuration: true }}
                  autoplaySpeed={5000}
                  effect="fade"
                  style={{ borderRadius: '20px', overflow: 'hidden', marginTop: "50px" }}
                >
                  <div className='coro_img'>
                    <img src={Corousel1} alt="" style={{ width: '100%', borderRadius: '12px' }} />
                  </div>
                  <div>
                    <img src={Corousel2} alt="" style={{ width: '100%', borderRadius: '12px' }} />
                  </div>
                  <div>
                    <img src={Corousel3} alt="" style={{ width: '100%', borderRadius: '12px' }} />
                  </div>
                  <div>
                    <img src={Corousel4} alt="" style={{ width: '100%', borderRadius: '12px' }} />
                  </div>
                  <div>
                    <img src={Corousel5} alt="" style={{ width: '100%', borderRadius: '12px' }} />
                  </div>
                </Carousel>
              </motion.div>
            )}
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="features-row" style={{ marginTop: '100px', marginBottom: "30px" }}>
          {loading ? (
            <>
              {[1, 2, 3, 4].map((item) => (
                <Col xs={24} sm={12} lg={6} key={item}>
                  <Card className="feature-card-skeleton">
                    <Skeleton active avatar paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  variants={featureCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="feature-card"
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: 'none',
                      height: '300px',
                      textAlign: 'center',
                      marginBottom: "30px"
                    }}
                  >
                    <div
                      className="feature-card-icon"
                      style={{
                        color: feature.color,
                        fontSize: '2.5rem',
                        marginBottom: '20px',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="feature-card-content">
                      <h3 style={{
                        fontFamily: 'Times New Roman, serif',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: feature.color
                      }}>
                        {feature.title}
                      </h3>
                      <p style={{
                        fontFamily: 'Times New Roman, serif',
                        color: '#666',
                        fontSize: '1rem',
                        lineHeight: 1.6
                      }}>
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))
          )}
        </Row>
      </motion.div>

      <style jsx>{`
        @media (max-width: 768px) {

        .skeleton-container {
        margin-top: "0px"
        }

          .hero-content {
            text-align: center;
          }
          
          .button-container {
            justify-content: center;
          }
          
          .feature-card {
            margin-bottom: 1rem;
          }
          
          .feature-card-icon {
            margin: 0 auto 20px auto;
          }
          
          .feature-card-content {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPageHero;