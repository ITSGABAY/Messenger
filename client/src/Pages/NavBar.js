import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  return (
    <nav>
      <ul>
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
    </nav>
  );
}

export default NavBar;
