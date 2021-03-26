
import './App.css';
import {Detail} from './Components/Component'

import { SearchList } from './Components/searches';
import {Pages} from './Components/pages'


const view ={
    backgroundColor:'black',
}

function App() {
 
  
  return (

    <div className="App" style={view}>
      <h1 style={{color:'white'}}>Welcome to the Star Wars Character Base</h1>
      <div className="container" style={{width:'50%', position:'absolute'}}>
      <SearchList/></div>
      <div className="container" style={{width:'50%', float:'right'}}>
      <Pages/></div>
      <div className="container" style={{width:'80%', marginRight:'10%', marginLeft:'10%', top:'100px', position:'relative'}} >
      <Detail/></div>
      
      
    </div>
  );
}

export default App;
