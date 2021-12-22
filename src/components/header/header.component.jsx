import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

import { auth } from "../../firebase/firebase.utils";

import { signOutOfGoogle } from "../../firebase/firebase.utils";
const Header = ({ currentUser }) => {
  let x = false;
  return (
    <div className="header">
      <Link className="nav-link" to="/">
        <Logo className="logo-cointainer" to="/" />
      </Link>

      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
