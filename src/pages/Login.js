import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/auth.css';
import { useAuth } from '../components/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Logged in successfully');
        login(data.user); 
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <main className="content">
      <div className="auth-wrapper">
        <div className="auth-image">
          <img src="loginpage.jpg" alt="Login Image" />
        </div>
        <div className="auth-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign in to your account</h2>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
            <div className="auth-input">
              <label>Email address</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-input">
              <label>Password</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <p>Forgot your password? <a href="/forgot-password">Reset it here</a></p>
            <button className='auth-button' type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
