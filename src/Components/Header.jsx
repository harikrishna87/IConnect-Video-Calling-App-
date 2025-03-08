import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import Logo from "../assets/Images/Logo_React.png";

const Header = () => {
  const location = useLocation();

  return (
    <>
      <header>
        <div className="header_logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="header_button">
          <Button type="primary" style={{background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)"}}>
            <Link
              to={"/login"}
              style={{ color: "white", letterSpacing: "2px", textDecoration: "none", fontSize: "18px", padding: "15px" }}
            >
              SignIn
            </Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
