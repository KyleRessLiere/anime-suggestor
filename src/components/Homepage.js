import React from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';

function Homepage(props) {
  return (
    <div>
      <div className="main">
        <h1>Welcome to TheAnimeGenerator!</h1>
        <p>To get started put your myAnimeList username to find anime that are not currently on your list or just hit enter to generate a random anime</p>
        <form onSubmit={props.HandleSearch}>
          <input
            className="search-box"
            type="search"
            placeholder="Enter user Id"
            value={props.user}
            onChange={(e) => props.SetUser(e.target.value)}
          />
        </form>
        
      </div>
    </div>
  );
}

export default Homepage;
