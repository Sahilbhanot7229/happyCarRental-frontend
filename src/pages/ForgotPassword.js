import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://happycarrental-backend.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, confirmPassword })
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
            <h2>Reset Your Password</h2>
            <div className="auth-input">
              <label>Email address</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-input">
              <label>New Password</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="auth-input">
              <label>Confirm New Password</label>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button className='auth-button' type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
