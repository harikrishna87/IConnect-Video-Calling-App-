import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "../Pages/Home";
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import ForgotPass from '../Components/ForgotPass/ForgotPass';
import NotFound from '../Pages/NotFound';
import Dashboard from '../Pages/MainPage/Dashboard';
import LoadingSpinner from '../Components/LoadingSpinner';
import Meetings from '../Pages/MainPage/Meetings';
import HomePage from '../Pages/MainPage/HomePage';
import ProfilePage from '../Pages/MainPage/ProfilePage';

const AuthLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState('');

  useEffect(() => {

    const currentBasePath = '/' + location.pathname.split('/')[1];
    const prevBasePath = '/' + prevPath.split('/')[1];

    const isDashboardNavigation = 
      currentBasePath === '/dashboard' && prevBasePath === '/dashboard';
    
    if (!isDashboardNavigation) {
      setLoading(true);
      
      const timer = setTimeout(() => {
        setLoading(false);
      }, 750);
      
      return () => clearTimeout(timer);
    }
    
    setPrevPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setPrevPath(location.pathname);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage/>} />
            <Route path="meetings" element={<Meetings />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

export default AuthLayout;