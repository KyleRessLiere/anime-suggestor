import React from 'react'

function MainContent(props) {
  return (
    <div>
        <main>
            <div className="main-head">
              <form 
              className ="search-box"
              onSubmit={props.HandleSearch}
              >
                
                <input 
                type="search"
                placeholder="Enter user Id"
                
                required
                value = {props.search}
                onChange = {e => props.SetSearch(e.target.value)}/>
              </form>
              <br />
              
            
            </div>
            <div className="new-anime">
            
            <h1>{props.randomAnime.mal_id}</h1>
              <h1>{props.randomAnime.title}</h1>
              <br />
              <p>{props.randomAnime.synopsis}</p>
              <br />
              <iframe width="420" height="315"
              src={props.randomAnime.trailer.embed_url + "?autoplay=1&mute=1"}>
              </iframe>
            </div>
            

        </main>
    </div>
  )
}

export default MainContent