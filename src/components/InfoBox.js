import React from "react";

function InfoBox(props) {
  return (
    <div className="info-box">
      {props.field}
      <br />
      {props.score}
    </div>
  );
}

export default InfoBox;
