import React, { useRef } from "react";
import searchIcon from "../Resources/Images/search-interface-symbol (1).png";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const Navigator = useNavigate();
  const searchRef = useRef("");
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      Search();
    }
  };
  const Search = () => {
    if (searchRef.current.value != "" && searchRef.current.value != " ") {
      Navigator(`/search/${searchRef.current.value}`);
    }
  };

  return (
    <div id="SearchBarContainer">
      <input
        id="SearchBarInput"
        placeholder="Search..."
        onKeyDown={handleEnter}
        ref={searchRef}
      />
      <img src={searchIcon} alt="SearchIcon" id="SearchIcon" onClick={Search} />
    </div>
  );
}

export default SearchBar;
