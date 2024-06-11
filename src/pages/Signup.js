import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/auth.css';

const Signup = () => {
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
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate('/login'); 
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
            <h2>Create an account</h2>
            <p>Already have an account? <a href="/login">Sign in</a></p>
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
