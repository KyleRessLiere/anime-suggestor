
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent';
import {useState,useEffect} from 'react' 
function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");
	const [userList,SetUserList] = useState([])
	const [randomAnime,setRandomAnime] = useState([]);
	const [randomPage,SetRandomPage]  = useState([]);
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

		//FetchPage();

		FetchUser(search);	


	}



	useEffect(() =>{
		GetTopAnime();
	},[])

	const FetchUser = async (query) => {
		let randomPageNum = Math.floor(Math.random() * 100) + 1;
		
		const tempPage = await fetch(`https://api.jikan.moe/v4/top/anime?page=${randomPageNum}`)
		.then(res => res.json());

		SetRandomPage(tempPage.data)

		const temp = await fetch(`https://api.jikan.moe/v4/users/${query}/animelist`)
		.then(res => res.json());

		SetUserList(temp.data);

		GenerateAnime(temp.data,tempPage.data);

	}//FetchUser


	const GenerateAnime =  (userList,pageList) => {
		// console.log(userList[0]);
		// console.log(userList[0].anime.mal_id);
		//map array anime id
		const userIdList = [];
		const pageIdList = [];
		//console.log(userList)
		// console.log(pageList)
		

		//TODO:REDO WAY OF DOING THIS...
		//gets id of all anime that are on list
		for(let i = 0; i < userList.length; i++) {
			userIdList.push(userList[i].anime.mal_id);
		}//for 

		//get all ids on page
		for(let i = 0; i < pageList.length; i++) {
			pageIdList.push(pageList[i].mal_id);
		}//for 
		
		//gets the ids of all anime on page that are not in users list
		 const newAnimeIdList = pageIdList.filter(e => !userIdList.includes(e));

		 //gets a random anime
		 const randomElement = newAnimeIdList[Math.floor(Math.random() * newAnimeIdList.length)];
		let animeIndex = 0;
		 for(let i = 0 ; i <pageIdList.length;i++){
			 //console.log(pageList[i].mal_id, "+" ,randomElement);
			 if(pageIdList[i].mal_id === randomElement){
				animeIndex = i;
			 }//if
		 }//for

		
		 setRandomAnime(pageList[animeIndex]);
		 
	}
	console.log(randomAnime)

  return (
    <div className="App">
		<Header />
		<div className="content-wrap">
			
				<Sidebar 
					topAnime={topAnime} />
					<MainContent
					HandleSearch={HandleSearch}
					search={search}
					SetSearch={SetSearch}
					animeList={animeList}
					userList = {userList}
					randomAnime = {randomAnime} />
					</div>
     
    </div>
  );
}

export default App;
