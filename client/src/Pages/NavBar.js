import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultLogo from "../Resources/Images/defaultLogo.png";

function NavBar() {
  const navigate = useNavigate();
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
          onClick={() => navigate(`/profile/${username}`)}
        />
      </div>

      <ul id="main-buttons">
        <li>
          <button
            onClick={() => navigate(`/profile/${username}`)}
            className="AB"
          >
            My Profile
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/about")} className="AB">
            About
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/services")} className="AB">
            Services
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/contact")} className="AB">
            Contact
          </button>
        </li>
      </ul>
      <input
        class="input"
        type="text"
        required=""
        placeholder="Search twitter"
        id="search"
      />
    </nav>
  );
}

export default NavBar;
