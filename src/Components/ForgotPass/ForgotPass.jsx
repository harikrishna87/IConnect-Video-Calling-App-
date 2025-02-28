import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import Logo from "../../assets/Images/Logo1.png";

const ForgotPass = () => {
  const navigate = useNavigate();

  const backtohome = () => {
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
        <span onClick={backtohome} className="xbtn">
          X
        </span>
        <div className="text-center">
          <img src={Logo} alt="Logo" className="img-fluid" style={{ maxWidth: "200px", height: "60px" }} />
        </div>

        <h2 className="text-start fs-5 mt-3">Forgot Password</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ fontSize: "18px", fontWeight: "bold", color: "#0d6efd", margin:"10px 0px" }}>
              Enter your email:
            </label>
            <Input type="email" id="email" name="email" required  style={{ padding: "6px 12px" }} />
          </div>

          <div className="text-center mt-3">
            <Button type="primary" htmlType="submit" style={{ width: "100%", padding: "15px", fontSize: "16px" }}>
              Reset Password
            </Button>
          </div>
        </form>

        <p className="mt-3 text-center fs-6">
          Remember your password?{" "}
          <Link to="/login" className="text-decoration-none text-primary fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPass;
