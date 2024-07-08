import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './components/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/UserProfile';
import ContactUs from './pages/contact';
import Admin from './pages/Admin';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/Admin" element={<Admin />} />


            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
