from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from nba_api.stats.endpoints import LeagueDashPlayerStats, LeagueStandings

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STAT_OPTIONS = {"PTS", "AST", "REB", "STL", "BLK", "TOV", "FG_PCT", "FT_PCT", "FG3_PCT"}

@app.get("/")
async def main_route():
    return {"message": "Hello World"}

@app.get("/nba-standings")
async def get_nba_standings():
    standings = LeagueStandings().get_data_frames()[0]
    df = standings[["PlayoffRank", "TeamCity", "TeamName", "Conference", "Record", "ClinchIndicator", "ConferenceGamesBack", "WinPCT", "HOME", "ROAD", "L10"]].rename(columns={
        "PlayoffRank" : "rank",
        "TeamCity": "city",
        "TeamName": "name",
        "Conference": "conference",
        "Record": "record",
        "ClinchIndicator": "clinchIndicator",
        "ConferenceGamesBack": "gamesBack",
        "WinPCT": "winPct",
        "HOME": "home",
        "ROAD": "road",
        "L10": "lastTen"
    })
    df = df.sort_values(by=["winPct"], ascending=False).reset_index(drop=True)
    df["index"] = df.index + 1
    return df.to_dict(orient="records")

@app.get("/nba-stats")
async def get_nba_stats(stat: str = Query(..., description="Stat to filter by")):
    if stat not in STAT_OPTIONS:
        return {"error": "Invalid stat option. Choose from: " + ", ".join(STAT_OPTIONS)}
    data = LeagueDashPlayerStats().get_data_frames()[0]
    df = data[["PLAYER_NAME", "GP", "GP_RANK", stat]].rename(columns={"PLAYER_NAME": "name", "GP" : "games", "GP_RANK" : "gamesRank", stat: "value"})
    cumulative_list = ["PTS", "AST", "REB", "STL", "BLK", "TOV"]
    if stat in cumulative_list:
        # Convert cumulative stats to per game
        df["value"] = (df["value"] / df["games"]).round(2)
    else:
        # Convert % stats from decimal to percentage
        df["value"] = df["value"] * 100
    # Filter out players with small sample sizes
    df = df[df["gamesRank"] < 150]
    df = df.nlargest(10, "value")
    return df.to_dict(orient="records")