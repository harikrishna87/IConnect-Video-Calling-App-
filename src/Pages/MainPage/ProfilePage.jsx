import React, { useEffect, useState } from 'react'
import { Button, Card, Space, Typography, Avatar, Row, Col, Divider } from 'antd';
import { CloseOutlined, EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import { Right } from 'antd-icons';
const { Title, Text } = Typography

import { getAuth, onAuthStateChanged } from "firebase/auth";
const ProfilePage = () => {
  const [weekday, setWeekday] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const date = new Date();
  const [user, setUser] = useState(null)
  const auth = getAuth();

  useEffect(() => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentWeekday = daysOfWeek[date.getDay()];
    setWeekday(currentWeekday);
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Card
          title={
            <Title level={3} style={{
              margin: 0,
              fontFamily: "Times New Roman",
              background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}>
              User Profile
            </Title>
          }
          extra={
            <Button type="primary" icon={<EditOutlined />}>
              Edit Profile
            </Button>
          }
          style={{ width: '100%', marginTop: 16, borderRadius: 8 }}
        >

          <Row gutter={24} align="middle" style={{ marginBottom: 15 }}>
            <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
              <Avatar
                shape='square'
                icon={user ? <img src={user.photoURL} alt="User Profile" /> : <UserOutlined />}
                size={150}
              />
              <Title level={3} style={{
                background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontFamily: "Times New Roman",
                paddingTop: "10px"
              }}>
                Profile Pic
              </Title>
            </Col>
            <Col xs={24} sm={12} style={{ marginTop: "20px" }}>
              <Space direction="vertical" size="large">
                <Title level={3} style={{
                  background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  fontFamily: "Times New Roman"
                }}>
                  Personal Info
                </Title>
                <Text strong style={{
                  fontSize: 18,
                  margin: "0px",
                  padding: "0px"
                }}>Username:</Text>
                <Title level={5} style={{
                  fontWeight: "normal",
                  fontFamily: "Times New Roman"
                }}>
                  {user ? user.displayName : "Username"}
                </Title>
                <Text strong style={{
                  fontSize: 18
                }}>Email:</Text>
                <Title level={5} style={{
                  fontWeight: "normal",
                  fontFamily: "Times New Roman"
                }}>
                  {user ? user.email : "Username@gmail.com"}
                </Title>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row gutter={24} align="middle" style={{ marginBottom: 15 }}>
            <Col xs={24} sm={12} style={{ textAlign: 'left' }}>
              <Title level={3} style={{
                background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontFamily: "Times New Roman"
              }}>
                Social Links
              </Title>
              <Text style={{
                fontSize: 18,
                fontFamily: "Times New Roman",
                fontWeight: "bold"
              }}>
                LinkedIn:
              </Text>
              <Title level={5} style={{
                fontFamily: "Times New Roman",
                fontWeight: "normal"
              }}>
                LinkedIn Link
              </Title>
              <Text style={{
                fontSize: 18,
                fontFamily: "Times New Roman",
                fontWeight: "bold"
              }}>
                GitHub:
              </Text>
              <Title level={5} style={{
                fontFamily: "Times New Roman",
                fontWeight: "normal",
                padding: "0"
              }}>
                Github Link
              </Title>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'left' }}>
              <Title level={3} style={{
                background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontFamily: "Times New Roman"
              }}>
                Contact Info
              </Title>
              <Text style={{
                fontSize: 18,
                fontFamily: "Times New Roman",
                fontWeight: "bold"
              }}>
                Mobile:
              </Text>
              <Title level={5} style={{
                fontFamily: "Times New Roman",
                fontWeight: "normal"
              }}>
                9876543210
              </Title>
              <Text style={{
                fontSize: 18,
                fontFamily: "Times New Roman",
                fontWeight: "bold"
              }}>
                Date of Birth:
              </Text>
              <Title level={5} style={{
                fontFamily: "Times New Roman",
                fontWeight: "normal",
                padding: "0"
              }}>
                DD / MM/ YYYY
              </Title>
            </Col>
          </Row>

          <Divider />

          <Title level={3} style={{
            background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            fontFamily: "Times New Roman"
          }}>
            Account Created On
          </Title>

          <Title level={5} style={{
            fontFamily: "Times New Roman",
            fontWeight: "normal"
          }}>
            {weekday} - {currentDate}
          </Title>


        </Card>
      </div>

    </>
  )
}

export default ProfilePage