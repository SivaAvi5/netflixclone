import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  console.log(show);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <Link to="/">
          <h1 className="nav__logo">NETFLIX</h1>
        </Link>
        <Link to="/profile">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
            className="nav__avatar"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
