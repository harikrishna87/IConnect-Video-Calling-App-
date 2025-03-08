import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/Logo1.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth, app } from "../Firebase/Firebase";
import { Button, Input, Form } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
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
            <Button type="primary" htmlType="submit" loading={loading} style={{ fontSize: "18px", width: "100%", backgroundColor: "#2a3fae", padding: "15px" }} icon={loading ? <SyncOutlined spin /> : null}>
              {loading ? "Signing Up..." : "Signup"}
            </Button>
          </div>
        </Form>

        <p className="mt-3 text-center fs-6">
          Already have an account? {" "}
          <Link to="/login" className="text-decoration-none text-primary fw-bold">Login</Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default Signup;
