import React from "react";
import { Spin } from "antd";
import LoadingSp from "../assets/Images/Infinity.svg";

const LoadingSpinner = () => {
  return (
    <div style={{
        position: "absolute",
        top:" 50%",
        left:" 50%",
        transform: "translate(-50%, -50%)"
    }}>
      <Spin 
        indicator={
          <img src={LoadingSp} alt="Loading..." style={{ width: "200px", height: "150px" }} />
        }
        size="large"
      />
    </div>
  );
};

export default LoadingSpinner;
