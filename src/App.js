import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState, useEffect } from "react";
import * as React from "react";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [user, SetUser] = useState("");
  const [userList, SetUserList] = useState([]);
  const [randomAnime, setRandomAnime] = useState([]);
  const [isSearching, SetSearchStatus] = useState(false);
  const [unseenAnimeIdList, SetUnseenAnimeIdList] = useState([]);
  const [unseenAnimeList, SetUnseenAnimeList] = useState([]);
  const [currentAnimeIndex, SetCurrentAnimeIndex] = useState(-1);
  const [currentPage, SetCurrentPage] = useState([]);

  //Handlers

  //handles going to next page
  const HandlePrevPage = () => {
    let lastPageIndex = currentAnimeIndex - 1;
    if (lastPageIndex > -1) {
      console.log(unseenAnimeList[lastPageIndex]);
      setRandomAnime(unseenAnimeList[lastPageIndex]);
      SetCurrentAnimeIndex(lastPageIndex);
    }
    //if there are any prev anime
  };
  //handles going to next page
  const HandleNextPage = () => {
    //if there are any prev anime
    let nextAnimeIndex = currentAnimeIndex + 1;
    if (nextAnimeIndex < unseenAnimeList.length) {
      setRandomAnime(unseenAnimeList[nextAnimeIndex]);
      SetCurrentAnimeIndex(nextAnimeIndex);
    } else {
      HandleSearch();
    }
  };

  //TODO: if no user dont search
  const HandleSearch = async (e) => {
    if (e !== undefined) {
      //STOPS PAGE FROM REFRESHING
      e.preventDefault();
    }

    SetSearchStatus(true);
    // FetchPage();
    // delay(100);
    FetchUser(user);
  }; //HandleSearch

  useEffect(() => {
    FetchTopAnime();
  }, []);

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

    setRandomAnime(temp.data);
  };
  //TODO:ADJUST FETCHING
  //TODO:FETCH PAGE SEPARATELY
  const FetchPage = async function () {
    let randomPageNum = Math.floor(Math.random() * 130) + 1;
    const page = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${randomPageNum}`
    ).then(CheckError);

    console.log(page.data);
    SetCurrentPage(page.data);
  };
  const FetchUser = async (query) => {
    let randomPageNum = Math.floor(Math.random() * 130) + 1;
    const tempPage = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${randomPageNum}`
    ).then((res) => res.json());
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/users/${query}/animelist`
      ).then((res) => res.json());

      SetUserList(temp.data);
      delay(1000);

      GenerateAnime(temp.data, tempPage.data);
    } catch (e) {
      //catches if invalid username
      GenerateAnime([], tempPage.data);
      //TODO:Add rendering for invalid user
    }
  }; //FetchUser

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
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

    SetCurrentAnimeIndex(currentAnimeIndex + 1);
    //stores generated anime
    SetUnseenAnimeList((unseenIdAnimeList) => [...unseenIdAnimeList, anime]);
    setRandomAnime(anime);

    console.log(currentAnimeIndex);
  };

  return (
    <div className="App">
      <Header topAnime={topAnime} />
      <div>
        {/* <Sidebar topAnime={topAnime} /> */}
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
        />
      </div>
    </div>
  );
}

export default App;
