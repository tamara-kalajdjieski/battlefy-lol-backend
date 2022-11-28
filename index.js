const express=require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { processMatchDetails } = require('./utils/utils');
const app=express();

dotenv.config();
const PORT = process.env.PORT;

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_ORIGIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/',(req,res)=>{
    res.send("Welcome to CORS server! 😁")
})

app.get('/summoner_details/:name',(req,res)=>{
    var name = req.params['name']

    if(!name) {
        return res.status(400).json({
            status: 400, message: "Summoner name must be present"
        })
    }

    axios.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name, {
      headers: {
          'accept-encoding': '*',
          'X-Riot-Token': process.env.X_Riot_Token
      }
    })
    .then(function (response) {
      res.json(response.data)
    }).catch(function(error){
        console.log(error);
        res.json(error);
    })


})

app.get('/matches_for_summoner/:puuid/:count',(req,res)=>{
    var puuid = req.params['puuid']
    var count = req.params['count']

    matches = []

    if(!puuid) {
        return res.status(400).json({
            status: 400, message: "Summoner puuid must be present"
        })
    }

    axios.get('https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid + '/ids?count='+ count, {
      headers: {
          'accept-encoding': '*',
          'X-Riot-Token': process.env.X_Riot_Token
      }
    })
    .then(function (response) {
      match_ids = response.data
      
      let axios_requests = []
      match_ids.forEach(function(match_id){
        axios_requests.push(
            axios.get('https://americas.api.riotgames.com/lol/match/v5/matches/' + match_id, {
                headers: {
                    'accept-encoding': '*',
                    'X-Riot-Token': process.env.X_Riot_Token
                }
            })
        )
      });

      axios.all(axios_requests)
        .then(axios.spread((...responses)=> {
            responses.forEach(function(response){
                matches.push(processMatchDetails(response.data, puuid))
            })
            res.json(matches)
        })).catch(errors=>{
            console.log(errors)
        })
      
    })


})


app.listen(PORT,()=>console.log(`server running on port ${PORT}`))