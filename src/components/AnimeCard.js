import { render } from "@testing-library/react";
import React from "react";
import Button from "./Button";
function AnimeCard(props) {
  try {
    if (props.randomAnime.trailer.embed_url === null) {
      return (
        <div className="anime-card">
          <h1>{props.randomAnime.title}</h1>
          <a href={props.randomAnime.url} target="_blank">
            <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
          </a>
          <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
          <br />
        </div>
      );
    } //if
    else {
      return (
        <div className="anime-card">
          <h1>{props.randomAnime.title}</h1>

          <a href={props.randomAnime.url} target="_blank">
            <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
          </a>
          <h2>Description</h2>
          <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
          <br />
          <iframe
            title="Campus Tour"
            width="420"
            height="315"
            src={props.randomAnime.trailer.embed_url}
          ></iframe>
        </div>
      );
    } //else
  } catch (e) {
    render(
      <div>
        <h1>{props.randomAnime.title}</h1>

        <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
      </div>
    );
  }
}

export default AnimeCard;
