
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
	const [randomPage,setRandomPage]  = useState([]);

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

		FetchUser(search);	


	}



	useEffect(() =>{
		GetTopAnime();
	},[])

	const FetchUser = async (query) => {
		
		const temp = await fetch(`https://api.jikan.moe/v4/users/${query}/animelist`)
		.then(res => res.json());

		SetUserList(temp.data);

		GenerateAnime(temp.data);

	}//FetchUser

	const FetchPage = async () => {
		//fetches a anime given a id
		

	}//FetchAnime

	const GenerateAnime =  (userList) => {
		console.log(userList[0]);
		console.log(userList[0].anime.mal_id);
		//map array anime id
		const idArray = [];

		//TODO:REDO WAY OF DOING THIS...
		//gets id of all anime that are on list
		for(let i = 0; i < userList.length; i++) {
			idArray.push(userList[i].anime.mal_id);
		}//for 




	
		
		console.log(idArray)


		//generate a id != anime id array

		//call fetch anime

	}

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
					userList = {userList} />
					</div>
     
    </div>
  );
}

export default App;
