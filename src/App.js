import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { useState, useEffect } from "react";
import * as React from "react";
import "./assets/sass/main.css";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [user, SetUser] = useState("");
  const [userList, SetUserList] = useState([]);
  const [randomAnime, SetRandomAnime] = useState([]);
  const [isSearching, SetSearchStatus] = useState(false);
  const [unseenAnimeIdList, SetUnseenAnimeIdList] = useState([]);
  const [unseenAnimeList, SetUnseenAnimeList] = useState([]);
  const [currentAnimeIndex, SetCurrentAnimeIndex] = useState(-1);
  const [animeGenre, SetAnimeGenre] = useState([]);

  //Handlers
  const HandleHome = () => {
    SetSearchStatus(false);
    SetUnseenAnimeIdList([]);
    SetUnseenAnimeList([]);
    SetCurrentAnimeIndex(-1);
    SetRandomAnime([]);
  };

  useEffect(() => {}, []);

  //handles going to next page
  const HandlePrevPage = () => {
    let lastPageIndex = currentAnimeIndex - 1;
    if (lastPageIndex > -1) {
      console.log(unseenAnimeList[lastPageIndex]);
      SetRandomAnime(unseenAnimeList[lastPageIndex]);
      SetCurrentAnimeIndex(lastPageIndex);
    }
    //if there are any prev anime
  };
  //handles going to next page
  const HandleNextPage = async () => {
    //if there are any prev anime
    let nextAnimeIndex = currentAnimeIndex + 1;
    if (nextAnimeIndex < unseenAnimeList.length) {
      SetRandomAnime(unseenAnimeList[nextAnimeIndex]);
    } else {
      FetchUser(user);
    }
    SetCurrentAnimeIndex(nextAnimeIndex);
  };

  //TODO: if no user dont search
  const HandleSearch = async (e) => {
    if (e !== undefined) {
      //STOPS PAGE FROM REFRESHING
      e.preventDefault();
    }
    // FetchPage();

    const result = await FetchUser(user);
    SetSearchStatus(true);
    SetCurrentAnimeIndex(currentAnimeIndex + 1);

    // SetSearchStatus(true);
  }; //HandleSearch

  //fetches top anime on first page bypopularity
  const FetchTopAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/top/anime")
      //take the top anime and turns response to json
      .then((res) => res.json());

    //grabs top 5 anime
    SetTopAnime(temp.data.slice(0, 5));
  }; //getTopAnime
  const FetchAnimeById = async function (animeId) {
    const temp = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`).then(
      (res) => res.json()
    );

    SetRandomAnime(temp.data);
  };
  //TODO:ADJUST FETCHING
  //TODO:FETCH PAGE SEPARATELY

  const FetchUser = async (query) => {
    let randomPageNum = Math.floor(Math.random() * 130) + 1;
    const tempPage = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${randomPageNum}`
    ).then((res) => res.json());
    if (query.length > 0) {
      try {
        const temp = await fetch(
          `https://api.jikan.moe/v4/users/${query}/animelist`
        ).then((res) => res.json());

        SetUserList(temp.data);
        delay(1000);

        GenerateAnime(temp.data, tempPage.data);
      } catch (e) {
        // alert("Invalid Username");
        //catches if invalid username
        GenerateAnime([], tempPage.data);
        //TODO:Add rendering for invalid user
      }
    } else {
      GenerateAnime([], tempPage.data);
    }
  }; //FetchUser

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  //Takes userList and a random page and generates a random anime
  const GenerateAnime = (userList, pageList) => {
    //map array anime id
    const userIdList = [];
    const pageIdList = [];

    //TODO:REDO WAY OF DOING THIS...
    //gets id of all anime that are on list
    for (let i = 0; i < userList.length; i++) {
      userIdList.push(userList[i].anime.mal_id);
    } //for

    //get all ids on page
    for (let i = 0; i < pageList.length; i++) {
      pageIdList.push(pageList[i].mal_id);
    } //for

    //gets the ids of all anime on page that are not in users list

    let seenAnimeToDelete = new Set(unseenAnimeIdList);
    let newAnimeToDelete = new Set(userIdList);
    let newAnimeIdList = pageIdList.filter((name) => {
      // return those elements not in the namesToDeleteSet
      return !seenAnimeToDelete.has(name);
    });
    newAnimeIdList = pageIdList.filter((name) => {
      // return those elements not in the namesToDeleteSet
      return !newAnimeToDelete.has(name);
    });

    //gets a random anime
    let randomElement =
      newAnimeIdList[Math.floor(Math.random() * newAnimeIdList.length)];

    let anime;
    //grabs the random anime give random element
    for (let i = 0; i < pageList.length; i++) {
      if (pageList[i].mal_id === randomElement) {
        anime = pageList[i];
      } //if
    } //for

    //caches anime that have been generated
    SetUnseenAnimeIdList((unseenIdAnimeList) => [
      ...unseenIdAnimeList,
      randomElement,
    ]);

    //stores generated anime
    SetUnseenAnimeList((unseenIdAnimeList) => [...unseenIdAnimeList, anime]);
    console.log(anime);

    //TODO:DECLARE EVERYTHING HERE
    getGenres(anime);
    SetRandomAnime(anime);

    console.log(anime);
  };

  const getGenres = (anime) => {
    const genreList = [];
    for (let i = 0; i < anime.genres.length; i++) {
      genreList.push(anime.genres[i].name);
    }
    SetAnimeGenre(genreList);
  };
  return (
    <div className="App">
      <div>
        <div className="header">
          <Header HandleHome={HandleHome} />
        </div>
     
        <MainContent
          HandleSearch={HandleSearch}
          HandlePrevPage={HandlePrevPage}
          HandleNextPage={HandleNextPage}
          user={user}
          SetUser={SetUser}
          animeList={animeList}
          userList={userList}
          isSearching={isSearching}
          randomAnime={randomAnime}
          animeGenre={animeGenre}
        />
      </div>
    </div>
  );
}

export default App;
