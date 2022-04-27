import React from "react";

function Homepage(props) {
  return (
    <div className="main-head">
      <h1>Welcome to Anime generator</h1>
      <form className="search-box" onSubmit={props.HandleSearch}>
        <input
          type="search"
          placeholder="Enter user Id"
          value={props.user}
          onChange={(e) => props.SetUser(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Homepage;
