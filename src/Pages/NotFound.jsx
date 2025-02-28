import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import "../Components/component.css";
import NotFoundImg from "../assets/Images/notfound.png";

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="notfound">
        <img src={NotFoundImg} alt="" className="img-fluid" />
        <h5>{path} <span style={{ color: "black" }}>Page Not Found</span></h5>
        <p><q>Sorry, the page you are looking for could not be found</q></p>
          <Button type="primary">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
          </Button>
      </div>
    </>
  );
};

export default NotFound;
