const { SummonerMatchDetailsDto } = require("../Model/summoner_dto");

module.exports = {

processMatchDetails: function (matchDetails, summonerId){
    let summonerMatchInfo;

    if(!matchDetails["info"] || !matchDetails["info"]["participants"]) {
        return null;
    }

    matchDetails["info"]["participants"].forEach(participant => {
        if(participant["puuid"] == summonerId){
            summonerMatchInfo = participant
        }
            
    });

    items = []
    for(let i = 0; i < 7; i++)
    {
        if(summonerMatchInfo['item'+i])
        {
            items.push(summonerMatchInfo['item'+i])
        }
    }

    return new SummonerMatchDetailsDto
    (
        summonerMatchInfo["win"] ? "Victory" : "Defeat",
        matchDetails["info"]["gameDuration"],
        matchDetails["info"]["gameType"],
        matchDetails["info"]["gameMode"],
        summonerMatchInfo["perks"]['statPerks']['defense'],
        summonerMatchInfo["perks"]['statPerks']['offense'],
        summonerMatchInfo["perks"]['statPerks']['flex'],
        summonerMatchInfo["championId"],
        summonerMatchInfo["championName"],
        summonerMatchInfo["champLevel"],
        summonerMatchInfo["kills"],
        summonerMatchInfo["deaths"],
        summonerMatchInfo["assists"],
        items,
        summonerMatchInfo["totalMinionsKilled"],
        summonerMatchInfo["goldEarned"]
    );
}
}