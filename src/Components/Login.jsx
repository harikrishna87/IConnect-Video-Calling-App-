import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, SyncOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword, signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase";
import Logo from "../assets/Images/Logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState({ email: false, google: false, guest: false });

  const handleChange = (e) => {
    setUserdetails({ ...userdetails, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading({ ...loading, email: true });

    signInWithEmailAndPassword(auth, userdetails.email, userdetails.password)
      .then(() => {
        toast.success("User Successfully Logged In");
        setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
      })
      .catch(() => toast.error("Invalid email or password"))
      .finally(() => setLoading({ ...loading, email: false }));
  };

  const handleGoogleLogin = () => {
    setLoading({ ...loading, google: true });
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Google login successful!!!");
        setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
      })
      .catch(() => toast.error("Google login failed"))
      .finally(() => setLoading({ ...loading, google: false }));
  };

  const handleGuestLogin = () => {
    setLoading({ ...loading, guest: true });
    signInAnonymously(auth)
      .then(() => {
        toast.success("Logged in as Guest!!!");
        setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
      })
      .catch(() => toast.error("Guest login failed"))
      .finally(() => setLoading({ ...loading, guest: false }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
        <span onClick={() => navigate("/", { replace: true })} className='xbtn'>X</span>
        <div className="text-center">
          <img src={Logo} alt="Logo" className="img-fluid" style={{ maxWidth: "200px", height: "60px" }} />
        </div>
        <h2 className="text-start fs-5 mt-3">Login</h2>
        <form onSubmit={handleEmailLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ fontSize: "18px", fontWeight: "bold", color: "#0d6efd" }}>Email:</label>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={userdetails.email}
              style={{ padding: "6px 12px" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ fontSize: "18px", fontWeight: "bold", color: "#0d6efd" }}>Password:</label>
            <Input.Password
              name="password"
              onChange={handleChange}
              value={userdetails.password}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ padding: "6px 12px" }}
            />
          </div>
          <p style={{ textAlign: "right" }}><Link to="/forgotPass" style={{ textDecoration: "none" }}>Forgot Password?</Link></p>
          <div className="text-center mt-3">
            <Button
              type="primary"
              className="w-100"
              htmlType="submit"
              loading={loading.email}
              style={{ fontSize: "20px", backgroundColor: "#2a3fae" }}
              icon={loading.email ? <SyncOutlined spin /> : null}
            >
              {loading.email ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Button
              type="primary"
              className="w-50 me-2"
              onClick={handleGoogleLogin}
              loading={loading.google}
              style={{ fontSize: "20px", backgroundColor: "red" }}
              icon={loading.google ? <SyncOutlined spin /> : null}
            >
              {loading.google ? "Logging In..." : "Google Login"}
            </Button>
            <Button
              type="primary"
              className="w-50 ms-2"
              onClick={handleGuestLogin}
              loading={loading.guest}
              style={{ fontSize: "20px", backgroundColor: "grey" }}
              icon={loading.guest ? <SyncOutlined spin /> : null}
            >
              {loading.guest ? "Logging In..." : "Guest Login"}
            </Button>
          </div>
        </form>
        <p className="mt-3 text-center fs-6">
          Don't have an account? <Link to="/signup" className="text-decoration-none text-primary fw-bold">Signup</Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  );
};

export default Login;