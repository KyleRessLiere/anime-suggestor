import React from "react";

import Button from "./Button";
import AnimeCard from "./AnimeCard";
import Homepage from "./Homepage";

function MainContent(props) {
  if (props.isSearching === true) {
    return (
      <div className="main">
        <Button
          isSearching={props.isSearching}
          HandlePrevPage={props.HandlePrevPage}
          HandleNextPage={props.HandleNextPage}
        />
        <AnimeCard randomAnime={props.randomAnime} />
      </div>
    );
  } else {
    return <Homepage HandleSearch={props.HandleSearch} />;
  }
}

export default MainContent;
