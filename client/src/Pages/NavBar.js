import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import SearchBar from "../Components/SearchBar";

function NavBar() {
  const Navigator = useNavigate();
  const { isAuthenticated, userId, username, logoImage } = useSelector(
    (state) => state.auth
  );
  return (
    <nav id="NavBar">
      <div id="NavBarimageFrame">
        <img
          src={logoImage ? logoImage : defaultLogo}
          id="NavBarImageLogo"
          alt="Profile"
          onClick={() => Navigator(`/profile/${username}`)}
        />
      </div>

      <ul id="main-buttons">
        <li>
          <button
            onClick={() => Navigator(`/profile/${username}`)}
            className="AB"
          >
            My Profile
          </button>
        </li>
        <li>
          <button onClick={() => Navigator("/about")} className="AB">
            About
          </button>
        </li>
        <li>
          <button onClick={() => Navigator("/services")} className="AB">
            Services
          </button>
        </li>
        <li>
          <button onClick={() => Navigator("/contact")} className="AB">
            Contact
          </button>
        </li>
      </ul>
      <div id="NavBarSearchDiv">
        <SearchBar />
      </div>
    </nav>
  );
}

export default NavBar;
