import React from "react";
function AnimeCard(props) {
  try {
    if (props.randomAnime.trailer.embed_url === null) {
      return (
        <div>
          <h1>{props.randomAnime.title}</h1>
          <a href={props.randomAnime.url} target="_blank">
            <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
          </a>
          <h2>Description</h2>
          <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
          <div className="iframe">
            <iframe
              title="Campus Tour"
              width="420"
              height="315"
              src={props.randomAnime.trailer.embed_url}
            ></iframe>
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
          <div className="iframe">
            <iframe
              title="Campus Tour"
              width="420"
              height="315"
              src={props.randomAnime.trailer.embed_url}
            ></iframe>
          </div>
        </div>
      );
    } //else
  } catch (e) {
    return (
      <div>
        <h1>{props.randomAnime.title}</h1>
        <p className="anime-synopsis">{props.randomAnime.synopsis}</p>
      </div>
    );
  }
}

export default AnimeCard;
