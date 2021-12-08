import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = () => {
  return (
    <div className="navigation">
      <nav className="nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/hats">
          Clothes
        </Link>
        <Link className="nav-link" to="/jackets">
          Jackets
        </Link>
        <Link className="nav-link" to="/sneakers">
          Sneakers
        </Link>
        <Link className="nav-link" to="/women">
          Women
        </Link>
        <Link className="nav-link" to="/men">
          Men
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Header;
