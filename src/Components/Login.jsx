import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, SyncOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword, signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase";
import Logo from "../assets/Images/Logo1.png";
import Logo1 from "../assets/Images/Corousel1.jpg"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Components/component.css"

const Login = () => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState({ email: false, google: false, guest: false });

  const handleChange = (e) => {
    setUserdetails({ ...userdetails, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = () => {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
      localStorage.removeItem('redirectAfterLogin');
      setTimeout(() => navigate(redirectPath, { replace: true }), 2000);
    } else {
      setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading({ ...loading, email: true });

    signInWithEmailAndPassword(auth, userdetails.email, userdetails.password)
      .then(() => {
        toast.success("User Successfully Logged In");
        handleLoginSuccess();
      })
      .catch(() => toast.error("Invalid email or password"))
      .finally(() => setLoading({ ...loading, email: false }));
  };

  const handleGoogleLogin = () => {
    setLoading({ ...loading, google: true });

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          photoURL: user.photoURL,
        };

        toast.success("Google login successful!!!");
        handleLoginSuccess();
        axios.post("https://iconnect-back-end.onrender.com/users/user_details", userData)
          .catch((error) => {
            console.error("Backend API error:", error);
          });
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Google login failed");
      })
      .finally(() => setLoading({ ...loading, google: false }));
  };

  const handleGuestLogin = () => {
    setLoading({ ...loading, guest: true });

    signInAnonymously(auth)
      .then((result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          email: user.email || "ananymous@gmail.com",
          username: user.displayName || "Guest User"
        };
        toast.success("Logged in as Guest!!!");
        handleLoginSuccess();

        axios.post("https://iconnect-back-end.onrender.com/users/user_details", userData)
          .catch((error) => {
            console.error("Backend API error:", error);
          });
      })
      .catch((error) => {
        console.error("Guest login error:", error);
        toast.error("Guest login failed");
      })
      .finally(() => setLoading({ ...loading, guest: false }));
  };

  return (
    <div className="container">

      <div className="row login">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 text-center mt-3">
          <img src={Logo} alt="" width={300} height={80} className="login-img" />

          <div className="content">
            <h1 style={{
              fontSize: "3em",
              fontWeight: "600",
              color: "transparent",
              background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
              WebkitbackgroundClip: "text",
              backgroundClip: "text",
              paddingTop: "20px",
              paddingBottom: "20px"
            }}
            className="login-img"
            >Video Calling Feature for Everyone</h1>
            <img src={Logo1} alt="" width={350} height={200} style={{
              borderRadius: "15px",
              marginBottom: "20px"
            }}
              className="login-img"
            />
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-6">
          <div className="card p-4 shadow-lg m-auto" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
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
              <div className="text-center mt-3">
                <Button
                  type="primary"
                  className="w-100 d-flex justify-content-center align-items-center"
                  htmlType="submit"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#2a3fae",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "45px"
                  }}
                >
                  {loading.email ? <SyncOutlined spin style={{ fontSize: "20px" }} /> : null}
                  <span style={{ marginLeft: loading.email ? "5px" : "0" }}>
                    {loading.email ? "Logging in..." : "Login"}
                  </span>
                </Button>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <Button
                  type="primary"
                  className="w-50 me-2 d-flex justify-content-center align-items-center"
                  onClick={handleGoogleLogin}
                  style={{
                    fontSize: "20px",
                    backgroundColor: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "10px 15px",
                    minHeight: "45px"
                  }}
                >
                  {loading.google ? <SyncOutlined spin style={{ fontSize: "20px" }} /> : null}
                  <span style={{ lineHeight: "1.5", marginTop: "2px" }}>
                    {loading.google ? "Logging In..." : "Google Login"}
                  </span>
                </Button>

                <Button
                  type="primary"
                  className="w-50 ms-2 d-flex justify-content-center align-items-center"
                  onClick={handleGuestLogin}
                  style={{
                    fontSize: "20px",
                    backgroundColor: "grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "10px 15px",
                    minHeight: "45px"
                  }}
                >
                  {loading.guest ? <SyncOutlined spin style={{ fontSize: "20px" }} /> : null}
                  <span style={{ lineHeight: "1.5", marginTop: "2px" }}>
                    {loading.guest ? "Logging In..." : "Guest Login"}
                  </span>
                </Button>
              </div>
            </form>
            <p className="mt-3 text-center fs-6">
              Don't have an account? <Link to="/signup" className="text-decoration-none text-primary fw-bold">Signup</Link>
            </p>
          </div>
        </div>
      </div >
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
    </div >
  );
};

export default Login;