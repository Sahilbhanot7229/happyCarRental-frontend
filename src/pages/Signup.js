import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/auth.css';
const Signup = () => {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://happycarrental-backend.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password })
      });

      const text = await response.text(); // Read the response as text

      // Check if the response text is not empty before parsing as JSON
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        toast.success(data.message || 'Signup successful');
        navigate('/login');
      } else {
        toast.error(data.message || 'An error occurred. Please try again.');
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
            <h2>Create an account</h2>
            <p>Already have an account? <a href="/login">Sign in</a></p>
            <div className="auth-input">
              <label>Username</label>
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="auth-input">
              <label>Email address</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-input">
              <label>Password</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="auth-input">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button className='auth-button' type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
