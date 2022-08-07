import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/SiteNavbar";
import AnimeForm from "./AnimeForm";
import "./css/Homepage.css";
function Homepage() {
  const [topAnime, SetTopAnime] = useState([]);

  const FetchTopAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/top/anime?airing")
      //take the top anime and turns response to json
      .then((res) => res.json());

    //grabs top 5 anime
    SetTopAnime(temp.data.slice(0, 5));
  }; //getTopAnime

  useEffect(() => {
    FetchTopAnime();
    console.log(topAnime);
  }, []);
  return (
    <div className="homepage-container">
      <Navbar />
      <AnimeForm />
    </div>
  );
}

export default Homepage;
