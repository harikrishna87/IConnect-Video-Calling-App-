import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/Logo1.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, app } from "../Firebase/Firebase";
import { Button, Input, Form } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import Logo1 from "../assets/Images/Corousel2.jpg"
import "../Components/component.css"

const Signup = () => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const backtohome = () => {
    navigate("/");
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    setUserdetails({ ...userdetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { username, email, password } = userdetails;

    if (!username.trim()) {
      toast.error("Username is required.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error("Password: 8+ chars, letters, numbers, specials");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });

      await axios.post("https://iconnect-back-end.onrender.com/users/user_details", {
        username,
        email,
        uid: user.uid,
      });

      setUserdetails({ username: "", email: "", password: "" });
      toast.success("Signup successful! Redirecting to Login Page....");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
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
              <span onClick={backtohome} className="xbtn">X</span>
              <div className="text-center">
                <img src={Logo} alt="Logo" className="img-fluid" style={{ maxWidth: "200px", height: "60px" }} />
              </div>

              <h2 className="text-start fs-5 mt-3">Signup Now</h2>

              <Form onFinish={handleSubmit} layout="vertical">
                <div className="mb-2">
                  <label className="form-label" style={{ fontSize: "18px", fontWeight: "bold", color: "#0d6efd" }}>Username:</label>
                  <Input name="username" onChange={handleChange} value={userdetails.username} style={{ padding: "6px 12px" }} />
                </div>

                <div className="mb-2">
                  <label className="form-label" style={{ fontSize: "18px", fontWeight: "bold", color: "#0d6efd" }}>Email:</label>
                  <Input type="email" name="email" onChange={handleChange} value={userdetails.email} style={{ padding: "6px 12px" }} />
                </div>

                <div className="mb-2">
                  <label className="form-label" style={{ fontSize: "18px", fontWeight: "bold", color: "#0d6efd" }}>Password:</label>
                  <Input.Password name="password" onChange={handleChange} value={userdetails.password} style={{ padding: "6px 12px" }} />
                </div>

                <div className="text-center mt-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      fontSize: "18px",
                      width: "100%",
                      backgroundColor: "#2a3fae",
                      padding: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      minHeight: "48px"
                    }}
                  >
                    {loading ? <SyncOutlined spin style={{ fontSize: "18px" }} /> : null}
                    <span style={{ lineHeight: "1.5", marginTop: "2px" }}>
                      {loading ? "Signing Up..." : "Signup"}
                    </span>
                  </Button>

                </div>
              </Form>

              <p className="mt-3 text-center fs-6">
                Already have an account? {" "}
                <Link to="/login" className="text-decoration-none text-primary fw-bold">Login</Link>
              </p>
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    </>
  );
};

export default Signup;
