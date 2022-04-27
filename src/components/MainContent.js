import React from "react";
import SearchStatus from "./SearchStatus";
import Button from "./Button";

function MainContent(props) {
  return (
    <div className="main">
      <Button
        isSearching={props.isSearching}
        HandlePrevPage={props.HandlePrevPage}
        HandleNextPage={props.HandleNextPage}
      />
      <div className="inner-main">
        <SearchStatus
          isSearching={props.isSearching}
          randomAnime={props.randomAnime}
        />

        <div className="main-head">
          <form className="search-box" onSubmit={props.HandleSearch}>
            <input
              type="search"
              placeholder="Enter user Id"
              value={props.user}
              onChange={(e) => props.SetUser(e.target.value)}
            />
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
