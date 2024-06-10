import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <div>
              <h1>Welcome to Car Rental</h1>
              <p>Book your car now!</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
