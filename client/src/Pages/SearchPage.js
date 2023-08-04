import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import ProfileCard from "../Components/ProfileCard";
import NavBar from "./NavBar";
import SearchBar from "../Components/SearchBar";
import { useSelector } from "react-redux";

function SearchPage() {
  const { searchValue } = useParams();
  const [results, setResults] = useState({ posts: [], profiles: [] });
  const Navigator = useNavigate();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      Navigator("/login");
    } else {
      axios
        .get(`http://localhost:3001/search/${searchValue}`)
        .then(async (response) => {
          setResults({
            posts: response.data.posts,
            profiles: response.data.profiles,
          });
        })
        .catch((err) => {
          if (err.response.status) {
            console.log("err::: ", err);
            Navigator("/login");
          }
        });
    }
  }, [searchValue, Navigator, isAuthenticated]);

  return (
    <div>
      <NavBar />
      <div id="searchPageDiv">
        <div id="searchBarContainer">
          <SearchBar />
        </div>
        <div id="ProfilesResults">
          {results.profiles.map((profile) => {
            return (
              <ProfileCard
                username={profile.username}
                description={profile.description}
                logoImage={profile.logoImage}
              />
            );
          })}
        </div>
        <div id="PostsResults">
          {results.posts.map((post) => {
            return <Post postData={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
