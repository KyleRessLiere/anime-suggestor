
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent';
import {useState,useEffect} from 'react' 
import * as React from 'react';
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { CardContent } from '@mui/material';


function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [user, SetUser] = useState("");
	const [userList,SetUserList] = useState([])
	const [randomAnime,setRandomAnime] = useState([]);
	const [randomPage,SetRandomPage]  = useState([]);
	const [isSearching,SetSearchStatus] = useState(false);
	const [unseenAnimeList,SetUnseenAnimeList] = useState([]);
	//TODO:add list of ids to make sure not repeating anime



	//fetches top anime on first page bypopularity
	const GetTopAnime = async () => {
		const temp = await fetch("https://api.jikan.moe/v4/top/anime")

		//take the top anime and turns response to json
		.then(res => res.json());

		//grabs top 5 anime
		SetTopAnime(temp.data.slice(0,5));
	}

	const HandleSearch = e => {
		//STOPS PAGE FROM REFRESHING
		e.preventDefault();

		SetSearchStatus(true);

		FetchUser(user);	

	}//HandleSearch

	useEffect(() =>{
		GetTopAnime();
	},[])

	function handleErrors(response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}

	//TODO:HANDLE NO USER CASE
	const FetchUser = async (query) => {
		let randomPageNum = Math.floor(Math.random() * 130) + 1;

		
		const tempPage = await fetch(`https://api.jikan.moe/v4/top/anime?page=${randomPageNum}`)

		.then(res => res.json());

		SetRandomPage(tempPage.data)

		const temp = await fetch(`https://api.jikan.moe/v4/users/${query}/animelist`)

		.then(res => res.json())


		SetUserList(temp.data);
		delay(1000);
		GenerateAnime(temp.data,tempPage.data);

	}//FetchUser

	function delay(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	  }

	//Takes userList and a random page and generates a random anime
	const GenerateAnime =  (userList,pageList) => {
		//map array anime id
		const userIdList = [];
		const pageIdList = [];
		
		//TODO:REDO WAY OF DOING THIS...
		//gets id of all anime that are on list
		for(let i = 0; i < userList.length; i++) {
			userIdList.push(userList[i].anime.mal_id);
		}//for 

		

		//get all ids on page
		for(let i = 0; i < pageList.length; i++) {
			pageIdList.push(pageList[i].mal_id);
		}//for 
		console.log("pageListbefore",pageIdList);
		
		//gets the ids of all anime on page that are not in users list
		console.log(userIdList.sort())
		let seenAnimeToDelete = new Set(unseenAnimeList);
		let newAnimeToDelete = new Set(userIdList);
		let newAnimeIdList = pageIdList.filter((name) => {
			// return those elements not in the namesToDeleteSet
			return !seenAnimeToDelete.has(name);
		  });
		  newAnimeIdList = pageIdList.filter((name) => {
			// return those elements not in the namesToDeleteSet
			return !newAnimeToDelete.has(name);
		  });

		// let	newAnimeIdList = pageIdList.filter( ( el ) => userIdList.includes( el ) );
		// // console.log(newAnimeIdList.sort());
		//   newAnimeIdList = pageIdList.filter((el) => unseenAnimeList.includes(el));
		 console.log(newAnimeIdList,"pageListafter")
		 //gets a random anime
		 let randomElement = newAnimeIdList[Math.floor(Math.random() * newAnimeIdList.length)];
		 console.log(randomElement);
		let anime;
		for(let i=0;i < pageList.length;i++){
			if(pageList[i].mal_id === randomElement){
				 anime = pageList[i];
			}
		}
		
		 //caches anime that have been gernrated
		 SetUnseenAnimeList(unseenAnimeList => [...unseenAnimeList,randomElement] );
		 setRandomAnime(anime);
		 
		 
	}
	

  return (
    <div className="App">
		<Header 
		topAnime={topAnime}
		/>
		<div>
			
				{/* <Sidebar 
					topAnime={topAnime} /> */}
					<MainContent
					HandleSearch={HandleSearch}
					user={user}
					SetUser={SetUser}
					animeList={animeList}
					userList = {userList}
					isSearching={isSearching}
					randomAnime = {randomAnime} />
					</div>
     
    </div>
  );
}

export default App;
