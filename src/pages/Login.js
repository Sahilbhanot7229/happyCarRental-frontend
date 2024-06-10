import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        console.log(data);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-image">
        <img src="loginpage.jpg" alt="Login Image" />
      </div>
      <div className="auth-container">
        <img className="auth-animation" src="animationLogin.gif" alt="Login Animation" />
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
