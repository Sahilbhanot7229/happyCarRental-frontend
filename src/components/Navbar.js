import React, { useEffect, useRef } from 'react';
import '../style/Navbar.css';

const Navbar = () => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navRef = useRef(null);

  const menu = () => {
    if (dropdownRef.current.style.display === "grid") {
      dropdownRef.current.style.display = "none";
      buttonRef.current.innerHTML = "menu";
    } else {
      dropdownRef.current.style.display = "grid";
      buttonRef.current.innerHTML = "close";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        dropdownRef.current.style.display = "none";
        buttonRef.current.innerHTML = "menu";
      }
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (dropdownRef.current.style.display === "grid") {
          dropdownRef.current.style.display = "none";
          buttonRef.current.innerHTML = "menu";
        }
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav" ref={navRef}>
      <div className="content">
        <h1 className="brand">
          <img src="/logo.png" alt="Logo" />
        </h1>
        <div className="links nav-items">
          <a href="/">Home</a>
          <a href="/Login">Login</a>
          <a href="/Signup">Signup</a>
        </div>
        <i className="material-icons menu" onClick={menu} ref={buttonRef}>menu</i>
      </div>
      <div className="dropdown" id="dropdown" ref={dropdownRef}>
        <a href="/">Home</a>
        <a href="/Login">Login</a>
        <a href="/Signup">Signup</a>
      </div>
    </div>
  );
};

export default Navbar;
