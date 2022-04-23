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
                placeholder="Search for anime"
                
                required
                value = {props.search}
                onChange = {e => props.SetSearch(e.target.value)}/>
              </form>
              
            </div>

        </main>
    </div>
  )
}

export default MainContent