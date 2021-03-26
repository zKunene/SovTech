import React from  'react';
import { useLazyQuery, gql} from '@apollo/client';

const GET_SEARCH = gql `
query detailQuery{
    details{
      count,
      previous,
      next,
      results{
          name,
          height,
          mass,
          homeworld,
          gender
      }
    }
  }
`;


var searchText=''
const searchView ={
    color:'black',
    background:'white',
    //width: '200px',
    position: 'absolute',
    left:'40px',
    border: '1px solid black',
    height:'40px',
    width:'80%',
    backgroundColor:'black'



}
const searchItem = {
    color:'black',
    border:'1px solid black',
    backgroundColor:'lightblue',
    textAlign: 'center',
    position:'relative',
    zIndex:'2'
}

export function SearchList(){ 
    
    const [getSearches, {loading, data}] = useLazyQuery(GET_SEARCH);

    if (loading) return <p>Loading...</p>
    var searched = []
   
    if (data && data.details && data.details.results && searchText.length>0) {

        searched=data.details.results.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
      
        
    }
    
    return (
        <div style={searchView}> 
             
             <input  style={{height:'70%', width:'55%'}} type='text' placeholder="Are these the droids you're looking for" id="searchBar" onChange={(e)=> searchText=e.target.value } />
            <button  style={{height:'70%', width:'20%'}} onClick={() => getSearches()} onDoubleClick={()=>document.getElementById("searchBar").value=""}>
                Search
            </button>
            <button style={{height:'70%', width:'20%'}} onClick={() => searchText=""} onDoubleClick={()=>getSearches()}>
                Clear
            </button>
            {data && data.details.results && searched.map((c,i) => 
                <div id="fullList" style={searchItem}>
                    <div key={i}>
                        <p onClick={(e) =>displayBlock({i})}  onDoubleClick={(e) =>hideBlock({i})} > {c.name} </p>
                        <div id={i} style={{display:'none'}}>
                            <p>Mass: {c.mass} kg</p>
                            <p>Height: {c.height} cm</p>
                            <p>Homeworld:  {c.homeworld}</p>
                            <p>Gender: {c.gender}</p>
                        </div>
                    </div>
                </div>)}
        </div>
    );

}
const displayBlock= (pos) =>{
    document.getElementById(pos.i).style.display="block";
    
}
const hideBlock= (pos) =>{
    document.getElementById(pos.i).style.display="none";
    
}
    