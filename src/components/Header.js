import React from "react";

function Header(props) {
  return (
    <button onClick={props.HandleHome} className="header">
      The<strong>Anime</strong>Generator
    </button>
  );
}

export default Header;
