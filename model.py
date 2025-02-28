import numpy as np
import pandas as pd
import tensorflow as tf

from nba_api.stats.endpoints import leaguedashteamstats as team
from nba_api.stats.endpoints import leaguedashteamshotlocations as shootingAdv
from nba_api.stats.endpoints import leaguedashteamptshot as shooting

'''
What we wanna use as our models weights


TEAMID  --> Advanced (TEAM_ID)
TEAMNAME  --> Advanced (TEAM_NAME)


Effective shooting percentage -->Advanced (EFG_PCT)
net rating -->Advanced (NET_RATING)
margin of victory  --> teamDashBoard (PLUS_MINUS)
offensive rating --> Advanced (OFF_RATING)
percetnage of rim --> ShotLocations(Restricted Area_FG_PCT)
percenatge of 16ft to 3 --> ShotLocations(Mid-Range_FG_PCT)
3pt percentage --> 
'''

#deals with the advanced stats listed above
#need to obtain the differnet columns that I need
advanced_stats = team.LeagueDashTeamStats(season="2023-24", measure_type_detailed_defense="Advanced")
df_advanced = advanced_stats.get_data_frames()[0]
#print(df_advanced.head())



#deals with the ShotLocation stats obtained above. Can extract as numpy array
adv_shot_data = shootingAdv.LeagueDashTeamShotLocations(
    season="2023-24",
    season_type_all_star="Regular Season"
)
df_adv_shooting = adv_shot_data.get_data_frames()[0]
df_adv_shooting.columns = ['_'.join(col).strip() for col in df_adv_shooting.columns]
df_adv_shooting = df_adv_shooting[[ "Restricted Area_FG_PCT", "Mid-Range_FG_PCT"]]



#deals with 3pt shooting mentioned above
shot_data = shooting.LeagueDashTeamPtShot(
    season="2023-24",
    season_type_all_star="Regular Season"
)

df_shot_data = shot_data.get_data_frames()[0]
print(df_shot_data.columns)


#todo: grab all necessary columns into dataframe and export as csv




