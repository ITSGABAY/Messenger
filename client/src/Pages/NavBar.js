import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import logoutLogo from "../Resources/Images/logout.png";
import homeLogo from "../Resources/Images/home.png";
import Cookies from "js-cookie";
import SearchBar from "../Components/SearchBar";
import { login } from "../authSlice";

import axios from "axios";
function NavBar() {
  const Navigator = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userId, username, logoImage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      axios
        .get("http://localhost:3001/auth/validate")
        .then((response) => {
          console.log("validate!!!");
          var imageUrl = null;
          if (response.status === 200) {
            if (response.data.logoImage) {
              const buffer = response.data.logoImage.data;
              var arrayBufferView = new Uint8Array(buffer);
              var blob = new Blob([arrayBufferView], { type: "image/png" });
              var urlCreator = window.URL || window.webkitURL;
              imageUrl = urlCreator.createObjectURL(blob);
            }
            dispatch(
              login({
                userId: response.data.userId,
                username: response.data.username,
                logoImage: imageUrl,
                description: response.data.description,
              })
            );
            Navigator("/");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            Navigator("/login");
          }
        });
    }
  }, [isAuthenticated, Navigator, dispatch]);

  return (
    <nav id="NavBar">
      <img
        src={logoImage ? logoImage : defaultLogo}
        id="NavBarImageLogo"
        alt="Profile"
        onClick={() => Navigator(`/profile/${username}`)}
      />
      <img src={homeLogo} id="NavBarHomeLogo" onClick={() => Navigator("/")} />
      <div id="NavBarSearchDiv">
        <SearchBar />
      </div>
    </nav>
  );
}

export default NavBar;
