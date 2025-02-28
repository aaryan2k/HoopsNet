from nba_api.stats.endpoints import leaguedashteamstats
import pandas as pd

# Fetch team shooting stats (includes FG3_PCT)
team_stats = leaguedashteamstats.LeagueDashTeamStats(
    season="2023-24",
    measure_type_detailed_defense="Shooting"  # Requests shooting stats
)

# Convert response to DataFrame
df_shooting = team_stats.get_data_frames()[0]

# Display available columns
print("Columns in dataset:")
print(df_shooting.columns)

# Extract only needed columns
df_shooting = df_shooting[["TEAM_ID", "TEAM_NAME", "FG3_PCT"]]

# Show the first few rows
print(df_shooting.head())