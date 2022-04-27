import React from "react";

function Button(props) {
  if (props.isSearching === true) {
    return (
      <div>
        <button
          type="button"
          className="btn-right"
          onClick={props.HandleNextPage}
        >
          Next
        </button>
        <button
          type="button"
          className="btn-left"
          onClick={props.HandlePrevPage}
        >
          Prev
        </button>
      </div>
    );
  } //if
  else {
    return <div></div>;
  }
}

export default Button;
