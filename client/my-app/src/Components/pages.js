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


const pageView ={
    color:'black',
    background:'white',
    //width: '200px',
    position: 'absolute',
    right:'40px',
    border: '1px solid black',
    height:'40px',
    width:'40%',
    backgroundColor:'black'


}
const pageItem = {
    color:'black',
    border:'1px solid black',
    backgroundColor:'red',
    textAlign: 'center',
    position:'relative',
    zIndex:'2'
}
var searchText=''
export function Pages(){ 
    
    const [getSearches, {loading, data}] = useLazyQuery(GET_SEARCH);

    if (loading) return <p>Loading...</p>
    var searched = []
    var bracket = Number(searchText)
 
    if (data && data.details && data.details.results) {
        searched=data.details.results.slice(0+10*(bracket-1), 10*bracket)
        
    }
    return (
        <div style={pageView}> 
             
             <input style={{height:'70%', width:'60%'}} type='text' placeholder="Enter a page number" id="pagehBar" onChange={(e)=> searchText=e.target.value }
             
             />
            <button style={{height:'70%', width:'30%'}} onClick={() => getSearches()} >
                Search
            </button>
            {data && data.details.results && searched.map((item,i) => 
                <div id="fullList" style={pageItem}>
                    <div key={i} >

                        <p onClick={(e) =>displayBlock({i})} onDoubleClick={(e) =>hideBlock({i})} >{item.name}</p>
                        <div id={i} style={{display:'none'}}>
                            <p>Mass: {item.mass}</p>
                            <p>Height: {item.height}</p>
                            <p>Homeworld:  {item.homeworld}</p>
                            <p>Gender: {item.gender}</p>
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