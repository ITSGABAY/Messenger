import React, { useRef, useState } from "react";
import searchIcon from "../Resources/Images/search-interface-symbol (1).png";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const Navigator = useNavigate();
  const searchRef = useRef("");
  const [searchValue, setSearchValue] = useState(props.searchValue || "");
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <img src={searchIcon} alt="SearchIcon" id="SearchIcon" onClick={Search} />
    </div>
  );
}

export default SearchBar;
