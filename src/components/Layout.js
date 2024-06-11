import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../style/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
