import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "antd";
import { VideoCameraAddOutlined, SafetyOutlined, TeamOutlined, GlobalOutlined } from "@ant-design/icons";
import "./Mainpage.css";
import LogoImg from "../../assets/Images/Main_Page_Banner.png";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser({
        displayName: user.isAnonymous ? "Guest User" : user.displayName,
      });
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

  return (
    <>
      <div className="content">
        <h1 style={{ textAlign: "center"}}>
          {getGreeting()}, {user ? user.displayName : ""}
        </h1>
      </div>

      <div className="container hero_section">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6">
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
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <img
              src={LogoImg}
              alt=""
              className="img-fluid"
              width={600}
              height={400}
              style={{ borderRadius: "15px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
