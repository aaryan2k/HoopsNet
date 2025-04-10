import os
import pandas as pd
import numpy as np
from nba_api.stats.endpoints import leaguedashteamstats as team
from nba_api.stats.endpoints import leaguedashteamshotlocations as shootingAdv
from nba_api.stats.endpoints import leaguedashteamptshot as shooting

def gather_nba_data(seasons, output_folder):
    """
    Gathers NBA team stats for each season in `seasons` using nba_api
    and writes them as CSV files to `output_folder`.
    Each output CSV includes:
      - TEAM_ID
      - TEAM_NAME
      - EFG_PCT
      - NET_RATING
      - TS_PCT_RANK
      - OFF_RATING
      - MARGIN_OF_VICTORY (PLUS_MINUS)
      - Restricted Area_FG_PCT
      - Mid-Range_FG_PCT
      - FG3_PCT
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for year in seasons:
        print(f"Gathering data for season {year}...")
        
        # ----------------------------------
        # 1. Advanced stats (EFG_PCT, NET_RATING, TS_PCT_RANK, OFF_RATING)
        # ----------------------------------
        advanced_stats = team.LeagueDashTeamStats(
            season=year,
            measure_type_detailed_defense="Advanced",
            season_type_all_star="Regular Season"
        ).get_data_frames()[0]
        
        df_advanced = advanced_stats[[
            'TEAM_ID', 'TEAM_NAME',
            'EFG_PCT', 'NET_RATING', 'TS_PCT_RANK', 'OFF_RATING'
        ]].copy()
        
        # ----------------------------------
        # 2. Base/traditional stats for margin of victory (PLUS_MINUS)
        # ----------------------------------
        base_stats = team.LeagueDashTeamStats(
            season=year,
            measure_type_detailed_defense="Base",
            season_type_all_star="Regular Season"
        ).get_data_frames()[0]
        
        # We only need TEAM_ID, PLUS_MINUS from the base stats
        df_base = base_stats[['TEAM_ID', 'PLUS_MINUS']].copy()
        
        # ----------------------------------
        # 3. Shot location stats (Restricted Area_FG_PCT, Mid-Range_FG_PCT)
        # ----------------------------------
        df_shot_loc = shootingAdv.LeagueDashTeamShotLocations(
            season=year,
            season_type_all_star="Regular Season"
        ).get_data_frames()[0]
        
        # Depending on naming in nba_api, these columns might be:
        # 'RESTRICTED_AREA_FG_PCT' and 'MID_RANGE_FG_PCT'
        # Double-check your data structure after pulling once or print head.
        df_shot_loc = df_shot_loc[[
            'TEAM_ID',
            'RESTRICTED_AREA_FG_PCT',
            'MID_RANGE_FG_PCT'
        ]].copy()
        
        # ----------------------------------
        # 4. 3PT stats (FG3_PCT)
        # ----------------------------------
        df_shot_3pt = shooting.LeagueDashTeamPtShot(
            season=year,
            season_type_all_star="Regular Season"
        ).get_data_frames()[0]
        
        df_shot_3pt = df_shot_3pt[['TEAM_ID', 'FG3_PCT']].copy()
        
        # ----------------------------------
        # Merge everything
        # ----------------------------------
        df_merged = pd.merge(df_advanced, df_base, on='TEAM_ID', how='left')
        df_merged = pd.merge(df_merged, df_shot_loc, on='TEAM_ID', how='left')
        df_merged = pd.merge(df_merged, df_shot_3pt, on='TEAM_ID', how='left')
        
        # Rename columns to match your desired naming
        df_merged.rename(columns={
            'PLUS_MINUS': 'MARGIN_OF_VICTORY',
            'RESTRICTED_AREA_FG_PCT': 'Restricted Area_FG_PCT',
            'MID_RANGE_FG_PCT': 'Mid-Range_FG_PCT'
        }, inplace=True)
        
        # ----------------------------------
        # Save as CSV
        # ----------------------------------
        csv_filename = f"{year}_team_stats.csv"
        output_path = os.path.join(output_folder, csv_filename)
        df_merged.to_csv(output_path, index=False)
        
        print(f"Saved {output_path}")

# Example usage for older 5 seasons
if __name__ == "__main__":
    train_years = ["2004-05", "2005-06", "2006-07", "2007-08", "2008-09"]
    gather_nba_data(train_years, output_folder="train_data")
    
    # If you have future seasons for testing, do similarly:
    # test_years = ["2021-22", "2022-23", ...]
    # gather_nba_data(test_years, output_folder="test_data")
