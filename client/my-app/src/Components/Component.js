import React from  'react';
import { useQuery, gql} from '@apollo/client';

const listView ={
    color:'black',
    background:'white',
    border: '1px solid black',
    
}

const DETAIL_DATA = gql `
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
`

export const Detail = () => {
    const {data, loading, error} = useQuery(DETAIL_DATA);
  
    if (loading) return <p>Loading...</p>
    if (error) return <p>An error occurred</p>
 
    return(
        <div id="fullList" >
            {data.details.results != null && data.details.results.map((item,k) => {
                return(

                    <div key={k} style={listView}  >
                        <p onClick={(e) =>displayBlock({k})} onDoubleClick={(e) =>hideBlock({k})}>{item.name}</p>
                        <div id={k} style={{display:'none'}}>
                            <p>Mass: {item.mass}</p>
                            <p>Height: {item.height}</p>
                            <p>Homeworld:  {item.homeworld}</p>
                            <p>Gender: {item.gender}</p>
                        </div>
                    </div>
                )
            })}
            
        </div>
        
    );
    
}
const displayBlock= (pos) =>{
    document.getElementById(pos.k).style.display="block";
    
}
const hideBlock= (pos) =>{
    document.getElementById(pos.k).style.display="none";
    
}