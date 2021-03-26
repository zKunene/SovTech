const express =require('express');
const cors =require('cors')

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');
const {graphqlHTTP } = require('express-graphql');
const fetch = require('node-fetch');
//import schema from './schema';
//const axios = require('axios');

const app = express();
app.use(cors())
async function getData(){
    const reach = await fetch("http://swapi.dev/api/people/?page=2");
    let response = await reach.json();
    //console.log(response.count)
    return await response
}
async function getAllData(){
    var page=1
    var reachAll = await fetch("http://swapi.dev/api/people/");
    let response = await reachAll.json();
    var all = [response.results]
    try{
        while (response.next !== null | response.previous!==null){
            page++
            //try{
            reachAll= await fetch("http://swapi.dev/api/people/?page="+page)
            let response2 = await reachAll.json()
            
            if (response2.results!=undefined){
                console.log(response2.results.length)
                //console.log("Hello")
                }
                else{break}
                for (var j=0; j<response2.results.length; j++){
                    response.results.push(response2.results[j])
                
            }
        
        }
        for (var i =0; i<response.results.length;i++){
            let worldNameFetch = await fetch(response.results[i].homeworld)
            let worldName = await worldNameFetch.json()
            //console.log(worldName.name)
            response.results[i].homeworld = worldName.name
        }
    }
    catch (e){console.log(e)}

    
    return await response;
}

const demo = getAllData();
//console.log("ALUUKET")
const demoData = {
    count: 6,
    next : "someString",
    previous : "someOtherString",   
    result:[{
        "name": "Anakin Skywalker", 
        "height": "188", 
        "mass": "84", 
        "hair_color": "blond", 
        "skin_color": "fair", 
        "eye_color": "blue", 
        "birth_year": "41.9BBY", 
        "gender": "male", 
        "homeworld": "http://swapi.dev/api/planets/1/", 
        "films": [
            "http://swapi.dev/api/films/4/", 
            "http://swapi.dev/api/films/5/", 
            "http://swapi.dev/api/films/6/"
        ], 
        "species": [], 
        "vehicles": [
            "http://swapi.dev/api/vehicles/44/", 
            "http://swapi.dev/api/vehicles/46/"
        ], 
        "starships": [
            "http://swapi.dev/api/starships/39/", 
            "http://swapi.dev/api/starships/59/", 
            "http://swapi.dev/api/starships/65/"
        ], 
        "created": "2014-12-10T16:20:44.310000Z", 
        "edited": "2014-12-20T21:17:50.327000Z", 
        "url": "http://swapi.dev/api/people/11/"
    }, 
    {
        "name": "Wilhuff Tarkin", 
        "height": "180", 
        "mass": "unknown", 
        "hair_color": "auburn, grey", 
        "skin_color": "fair", 
        "eye_color": "blue", 
        "birth_year": "64BBY", 
        "gender": "male", 
        "homeworld": "http://swapi.dev/api/planets/21/", 
        "films": [
            "http://swapi.dev/api/films/1/", 
            "http://swapi.dev/api/films/6/"
        ], 
        "species": [], 
        "vehicles": [], 
        "starships": [], 
        "created": "2014-12-10T16:26:56.138000Z", 
        "edited": "2014-12-20T21:17:50.330000Z", 
        "url": "http://swapi.dev/api/people/12/"
    } ]

}

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'Personal Info',

    fields:{
        name: {type: GraphQLString},
        mass: {type: GraphQLString},
        height: {type: GraphQLString},
        homeworld: {type: GraphQLString},
        gender: {type: GraphQLString},
    }
    
})

const infoObject = new GraphQLObjectType({
    name: 'detail',
    description: 'All the information',

    fields:{
        count: {type: GraphQLInt},
        next: {type: GraphQLString},
        previous: {type: GraphQLString},
        results:{
            type: GraphQLList(PersonType),
        }
    }
})

const rootQuery = new  GraphQLObjectType({
    name: 'RootQuery',
    description: '...',

    fields:{
        details:{
            type: infoObject,
            resolve: () => demo,
            
        }      
    }
})

const schema = new GraphQLSchema({query:rootQuery})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
   
}))

app.get('/', function(req, res){
  res.send(rootQuery)  
}
),

app.listen(3005, () => {
    console.log("Server is running")
})