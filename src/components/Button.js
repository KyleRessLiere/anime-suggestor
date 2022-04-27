import React from "react";

function Button(props) {
  return (
    <div>
      <button
        type="button"
        className="btn-right"
        onClick={props.HandleNextPage}
      >
        Next
      </button>
      <button type="button" className="btn-left" onClick={props.HandlePrevPage}>
        Prev
      </button>
    </div>
  );
} //if

export default Button;
