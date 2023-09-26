import React from "react";

function ProfileNotExist(props) {
  return (
    <div className="ProfileNotFoundContainer">
      <div>
        <h1>404</h1>
        <p>{props.name}</p>
        <p>Profile Doesn't Exist</p>
        <a href="/">Go back to Home</a>
      </div>
    </div>
  );
}

export default ProfileNotExist;
