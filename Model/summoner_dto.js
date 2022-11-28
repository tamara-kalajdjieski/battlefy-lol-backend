class SummonerMatchDetailsDto {

    outcome;
    gameDuration;
    gameType;
    gameMode;
    defencePerks;
    offencePerks;
    flexPerks;
    championId;
    championName;
    championLevel;
    kills;
    deaths;
    assists;
    items;
    totalCreepScore;
    goldEarned;

    constructor(
        outcome,
        gameDuration,
        gameType,
        gameMode,
        defencePerks,
        offencePerks,
        flexPerks,
        championId,
        championName,
        championLevel,
        kills,
        deaths,
        assists,
        items,
        totalCreepScore,
        goldEarned
    )
    {
        this.outcome = outcome;
        this.gameDuration = gameDuration;
        this.gameType = gameType;
        this.gameMode = gameMode;
        this.defencePerks = defencePerks;
        this.offencePerks = offencePerks;
        this.flexPerks = flexPerks;
        this.championId = championId;
        this.championName = championName;
        this.championLevel = championLevel;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.items = items;
        this.totalCreepScore = totalCreepScore;
        this.goldEarned = goldEarned;
    }
}

module.exports = { SummonerMatchDetailsDto };