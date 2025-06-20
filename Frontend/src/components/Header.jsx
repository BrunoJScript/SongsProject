import React from "react";
import logoSpotify from "../assets/logo/BrunoSuppa Transparent Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img
          src={logoSpotify}
          alt="Logo do Spotify"
          style={{
            background: "white",
            width: "52px",
            height: "52px",
          }}
        />
      </Link>

      <Link to="/" className="header__link">
        <h1>SongsProject</h1>
      </Link>
    </div>
  );
};

export default Header;
