import React from "react";
import InfoBox from "./InfoBox";
function AnimeCard(props) {
  if (props.randomAnime.trailer.embed_url === null) {
    return (
      <div>
        <h1>{props.randomAnime.title}</h1>
        <a href={props.randomAnime.url} target="_blank">
          <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
        </a>
        <h2>Description</h2>

        <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
        <h2>More info</h2>
        <div>
          {props.randomAnime.genres.map(function (genre) {
            return <li key={genre.url}>{genre.name}</li>;
          })}
        </div>
      </div>
    );
  } //if
  else {
    return (
      <div>
        <h1>{props.randomAnime.title}</h1>

        <a href={props.randomAnime.url} target="_blank">
          <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
        </a>
        <h2>Description</h2>

        <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
        <h2>More info</h2>
        <div>
          {props.randomAnime.genres.map(function (genre) {
            return <li key={genre.url}>{genre.name}</li>;
          })}
        </div>

        <div className="iframe">
          <iframe
            title="AnimeVideo"
            width="420"
            height="315"
            src={props.randomAnime.trailer.embed_url}
          ></iframe>
        </div>
      </div>
    );
  } //else
}

export default AnimeCard;
