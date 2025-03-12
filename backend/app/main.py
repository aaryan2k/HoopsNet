from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from nba_api.stats.endpoints import LeagueDashPlayerStats, LeagueStandings
# from nba_api.stats.static import teams
# import datetime

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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