import React, { useEffect, useRef, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Space, Button, Divider, Skeleton } from 'antd';
import {
  VideoCameraOutlined, AudioOutlined, TeamOutlined, GlobalOutlined, RocketOutlined, LockOutlined,
  HeartOutlined, TrophyOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const MotionCard = motion(Card);
const MotionRow = motion(Row);

const MainPageAboutUs = () => {
  const cardsRef = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };
  const navigate = useNavigate();

  const handlegetstarted = () => {
    navigate("/dashboard")
  }
  const fontStyle = { fontFamily: "Times New Roman" };

  return (
    <Layout style={{ background: 'transparent' }}>
      <Content style={{ padding: '50px 50px', maxWidth: '1200px', margin: '0 auto', background: 'transparent' }}>
        {loading ? (
          <div>
            <Skeleton active paragraph={{ rows: 2 }} title={{ width: '40%', style: { height: '3rem' } }} />
            <Divider style={{ margin: '40px 0' }} />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <Typography>
              <Title level={1} style={{
                fontSize: '2em', marginBottom: '1rem', ...fontStyle,
                color: "transparent",
                background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text"
              }}>About IConnect</Title>
              <Paragraph style={{ fontSize: '1.2rem', maxWidth: '800px', ...fontStyle }}>
                IConnect is a cutting-edge video calling platform built with the latest technology
                to provide seamless communication experiences for teams, friends, and family.
                We deliver high-quality audio and video calls with reliability you can count on.
              </Paragraph>
            </Typography>
            <Divider style={{ margin: '40px 0' }} />
          </motion.div>
        )}

        <Row gutter={[24, 24]}>
          {loading ? (
            <>
              <Col xs={24} md={12}>
                <Card bordered={false} style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'transparent' }}>
                  <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: '1rem' }}>
                    <Skeleton.Avatar active size={48} shape="circle" />
                  </Space>
                  <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 4 }} />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card bordered={false} style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'transparent' }}>
                  <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: '1rem' }}>
                    <Skeleton.Avatar active size={48} shape="circle" />
                  </Space>
                  <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 4 }} />
                </Card>
              </Col>
            </>
          ) : (
            <MotionRow
              gutter={[24, 24]}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Col xs={24} md={12}>
                <MotionCard
                  bordered={true}
                  variants={cardVariants}
                  whileHover="hover"
                  style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'transparent' }}
                >
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: '1rem' }}>
                      <HeartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </Space>
                    <Title level={3} style={{
                      ...fontStyle,
                      color: "transparent",
                      background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text"
                    }}>Our Mission</Title>
                    <Paragraph style={{ fontSize: '1rem', ...fontStyle }}>
                      We believe that clear, face-to-face communication should be accessible to everyone,
                      regardless of distance. Our mission is to connect people through technology that
                      feels natural and effortless, allowing genuine conversations to happen anywhere in the world.
                    </Paragraph>
                  </motion.div>
                </MotionCard>
              </Col>
              <Col xs={24} md={12}>
                <MotionCard
                  bordered={true}
                  variants={cardVariants}
                  whileHover="hover"
                  style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'transparent' }}
                >
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: '1rem' }}>
                      <TrophyOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </Space>
                    <Title level={3} style={{
                      ...fontStyle,
                      color: "transparent",
                      background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text"
                    }}>Our Story</Title>
                    <Paragraph style={{ fontSize: '1rem', ...fontStyle }}>
                      Founded in 2025 by a team of IConnect, IConnect
                      was born from the need for a more reliable and user-friendly video calling solution.
                      We've grown rapidly by focusing on what matters most: quality, simplicity, and security.
                    </Paragraph>
                  </motion.div>
                </MotionCard>
              </Col>
            </MotionRow>
          )}
        </Row>

        {loading ? (
          <div style={{ margin: '60px 0 40px' }}>
            <Divider style={{ margin: '60px 0 40px' }} />
            <Skeleton.Input active style={{ width: '30%', height: '2rem', display: 'block', margin: '0 auto 40px' }} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Divider style={{ margin: '60px 0 40px' }} />
            <Title level={2} style={{
              textAlign: 'center', marginBottom: '40px', ...fontStyle,
              color: "transparent",
              background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}>Our Features</Title>
          </motion.div>
        )}

        <Row gutter={[32, 32]}>
          {loading ? (
            Array(6).fill().map((_, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card bordered={false} style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'transparent' }}>
                  <Space direction="vertical" align="center" style={{ width: '100%' }}>
                    <Skeleton.Avatar active size={48} shape="circle" />
                    <Skeleton.Input active style={{ width: '60%', marginTop: '16px' }} />
                    <Skeleton active paragraph={{ rows: 2 }} title={false} style={{ marginTop: '16px' }} />
                  </Space>
                </Card>
              </Col>
            ))
          ) : (
            <MotionRow
              gutter={[32, 32]}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {[
                { icon: <VideoCameraOutlined />, title: "HD Video Calls", description: "Crystal clear video quality with adaptive resolution to ensure smooth connections even with varying network conditions." },
                { icon: <AudioOutlined />, title: "Voice Calling", description: "Premium audio quality with noise cancellation technology for crisp, clear conversations without distractions." },
                { icon: <TeamOutlined />, title: "Group Meetings", description: "Host up to 100 participants in a single call with gallery view and smart speaker highlighting." },
                { icon: <GlobalOutlined />, title: "Global Reach", description: "Low-latency servers across the globe ensure consistent quality for international calls." },
                { icon: <RocketOutlined />, title: "Screen Sharing", description: "Share your screen with a single click for seamless presentations and collaboration." },
                { icon: <LockOutlined />, title: "Secure Communication", description: "End-to-end encryption ensures your conversations remain private and secure at all times." },
              ].map((feature, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <MotionCard
                    bordered={true}
                    variants={cardVariants}
                    whileHover="hover"
                    style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'transparent' }}
                  >
                    <Space direction="vertical" align="center" style={{ width: '100%' }}>
                      <motion.div
                        style={{ fontSize: '48px', color: '#1890ff' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      >
                        {feature.icon}
                      </motion.div>
                      <Title level={4} style={{ ...fontStyle }}>{feature.title}</Title>
                      <Paragraph style={{ textAlign: 'center', ...fontStyle }}>
                        {feature.description}
                      </Paragraph>
                    </Space>
                  </MotionCard>
                </Col>
              ))}
            </MotionRow>
          )}
        </Row>

        <Divider style={{ margin: '60px 0 40px' }} />
        {loading ? (
          <Row justify="center" style={{ marginTop: '40px' }}>
            <Col xs={24} md={16} style={{ textAlign: 'center' }}>
              <Skeleton.Input active style={{ width: '30%', height: '2rem', margin: '0 auto 20px' }} />
              <Skeleton active paragraph={{ rows: 2 }} title={false} />
              <Skeleton.Button active style={{ width: '180px', height: '50px', marginTop: '20px' }} />
            </Col>
          </Row>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Row justify="center" style={{ marginTop: '40px' }}>
              <Col xs={24} md={16}>
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <Title level={2} style={{
                    textAlign: 'center', ...fontStyle,
                    color: "transparent",
                    background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                  }}>Join Us Today</Title>
                  <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', maxWidth: '800px', ...fontStyle }}>
                    Experience the difference that high-quality video and voice communication can make.
                    Whether for work, family, or friends, ConnectNow brings people together.
                  </Paragraph>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Space size="large" style={{ marginTop: '20px' }}>
                      <Button type="primary" size="large" style={{ height: '50px', fontSize: '1.1rem', paddingLeft: '30px', paddingRight: '30px', ...fontStyle }} onClick={handlegetstarted}>
                        Get Started Free
                      </Button>
                    </Space>
                  </motion.div>
                </Space>
              </Col>
            </Row>
          </motion.div>
        )}
      </Content>
    </Layout>
  );
};

export default MainPageAboutUs;