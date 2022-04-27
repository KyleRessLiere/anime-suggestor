import React from "react";

function SearchStatus(props) {
  //searching with video link
  if (props.isSearching === true) {
    try {
      if (props.randomAnime.trailer.embed_url === null) {
        return (
          <div className="anime-card">
            <h1>{props.randomAnime.title}</h1>
            <a href={props.randomAnime.url} target="_blank">
              <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
            </a>
            <p>{props.randomAnime.synopsis}</p>
            <br />
          </div>
        );
      } //if
      //if no video is present
      else {
        return (
          <div className="anime-card">
            <h1>{props.randomAnime.title}</h1>

            <a href={props.randomAnime.url} target="_blank">
              <img src={props.randomAnime.images.jpg.image_url} alt="Anime" />
            </a>

            <p>{props.randomAnime.synopsis}</p>
            <br />
            <iframe
              title="Campus Tour"
              width="420"
              height="315"
              src={props.randomAnime.trailer.embed_url}
            ></iframe>
          </div>
        );
      }
    } catch (e) {
      <div className="anime-card">
        <h1>{props.randomAnime.title}</h1>
        <p>{props.randomAnime.synopsis}</p>
        <br />
      </div>;
    }
    //Opening Page
  } else {
    return <div>Welcome</div>;
  }
}

export default SearchStatus;
