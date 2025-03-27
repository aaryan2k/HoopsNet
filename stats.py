'''
Over the past 10 years, 16 out of the past 20 NBA finalists ranked top 5 in 2p%, 15 ranked top 5 in FG%, 12 ranked top
 5 in FG and 11 ranked top 5 in 3P. These are the 4 per game statistics which seemed to best predict the likelyhood of
 a team making the NBA Finals. The best shooting teams tend to go far in the playoffs.

 Using advanced statistics, 19 out of 20 of the past NBA finalists were top 5 in eFG%, 17 were top 5 in average Margin
 of Victory and top 5 in net rating, and 13 were top 5 in offensive rating. These metrics make it clear that a team's 
 efficiency from the field as well as their regular season dominance were conducive to reaching the NBA finals, and it
 appears as if offensive rating matters more than defensive rating.

 In recent times, teams have been obsessed with getting the most efficient shots in the playoffs, three pointers, rim
 shots, or free throws. This new emergence of statistics in basketball has taken the NBA by storm, and some fans 
 believe that maximizing efficiency during the regular season doesn't necessarily lead to playoff success. Analyzing 
 shooting statistics over the past 10 years, we find that 16 of the past 20 teams were top 5 in 2p%, 15 were top 5 in
 percentage at the rim, and 12 were top 5 in percentage from 16 ft to the 3 pt line, while 11 were top 5 in percentage
 from the 3 point line. It's clear that three point percentage isn't necessarily the main factor for winning, and that
 the midrange game is still important in the playoffs. 

 We will be using 2p%, FG%, 3P, 3P%, eFG%, Net RTG, margin of victory, offensive rating, percentage at the rim, and 
 percentage from 16 ft - 3 pt line in our model to predict the NBA champion. 
'''

"""
Shell for an NBA Champion Prediction Model using key shooting and advanced stats.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier  # or any other model of your choice
from sklearn.metrics import accuracy_score, classification_report

# -----------------------------------------------------------------------------
# 1. Data Fetching (placeholder functions for NBA API calls)
# -----------------------------------------------------------------------------

def fetch_team_boxscore_stats(season: str) -> pd.DataFrame:

    # stats = leaguedashteamstats.LeagueDashTeamStats(
    #        season=season, measure_type_detailed_defense='Base', ...)
    # df = stats.get_data_frames()[0]
    # return df
    return pd.DataFrame()  # placeholder


def fetch_team_advanced_stats(season: str) -> pd.DataFrame:
    """
    Placeholder for fetching advanced stats like eFG%, Net Rating, OFF Rating,
    Margin of Victory, etc.

    Args:
        season (str): The NBA season, e.g. '2021-22'.

    Returns:
        pd.DataFrame: Columns might include:
            ['TEAM_ID', 'TEAM_NAME', 'eFG%', 'NET_RATING', 'OFF_RATING',
             'MARGIN_OF_VICTORY', 'AT_RIM%', 'MID_RANGE%', ...]
    """
    # TODO: Add actual data collection using nba_api.stats, etc.
    return pd.DataFrame()  # placeholder


def fetch_outcome_data(season: str) -> pd.DataFrame:
    """
    Placeholder for fetching or constructing the target variable (e.g. Champion = 1, Others = 0)
    or final playoff outcomes from the NBA API or local file.

    Args:
        season (str): The NBA season, e.g. '2021-22'.

    Returns:
        pd.DataFrame: Columns might include:
            ['TEAM_ID', 'TEAM_NAME', 'IS_CHAMPION']
    """
    # TODO: Implement logic to map team to whether they won the championship or not
    return pd.DataFrame()  # placeholder


# -----------------------------------------------------------------------------
# 2. Data Preparation & Merging
# -----------------------------------------------------------------------------

def prepare_data(season: str) -> pd.DataFrame:
    """
    Fetches data from the above fetch functions, merges them, and returns a single DataFrame
    with all relevant features and the target (IS_CHAMPION).

    Args:
        season (str): The NBA season, e.g. '2021-22'.

    Returns:
        pd.DataFrame: DataFrame containing the relevant features and target.
    """
    basic_stats_df = fetch_team_boxscore_stats(season)
    adv_stats_df = fetch_team_advanced_stats(season)
    outcome_df = fetch_outcome_data(season)

    # Merge on TEAM_ID or TEAM_NAME, whichever is most reliable:
    df_merged = basic_stats_df.merge(adv_stats_df, on='TEAM_ID', how='inner')
    df_merged = df_merged.merge(outcome_df, on='TEAM_ID', how='inner')

    # Example columns you might end up with:
    # TEAM_ID, TEAM_NAME, FG%, 2P%, 3P, 3P%, eFG%, NET_RATING, OFF_RATING,
    # MARGIN_OF_VICTORY, AT_RIM%, MID_RANGE%, IS_CHAMPION

    return df_merged


def clean_and_engineer_features(df: pd.DataFrame):
    """
    Clean the merged DataFrame, handle missing values or outliers,
    encode any categorical variables, etc. Then separate features (X) from target (y).

    Args:
        df (pd.DataFrame): The merged DataFrame with stats and target label.

    Returns:
        X (pd.DataFrame): Feature matrix.
        y (pd.Series): Target vector (Champion or not).
    """
    # Example: drop rows with missing data
    df = df.dropna(subset=[
        'FG%', '2P%', '3P', '3P%', 'eFG%', 'NET_RATING', 
        'OFF_RATING', 'MARGIN_OF_VICTORY', 'AT_RIM%', 'MID_RANGE%', 'IS_CHAMPION'
    ])

    # Construct X and y
    feature_cols = [
        'FG%', '2P%', '3P', '3P%', 'eFG%', 'NET_RATING', 
        'OFF_RATING', 'MARGIN_OF_VICTORY', 'AT_RIM%', 'MID_RANGE%'
    ]
    X = df[feature_cols]
    y = df['IS_CHAMPION']

    return X, y


# -----------------------------------------------------------------------------
# 3. Model Training & Evaluation
# -----------------------------------------------------------------------------

def train_model(X: pd.DataFrame, y: pd.Series):
    """
    Train a machine learning model (e.g. RandomForestClassifier) on the given data.

    Args:
        X (pd.DataFrame): Feature matrix.
        y (pd.Series): Target vector.

    Returns:
        model: Trained model.
    """
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model


def evaluate_model(model, X_test: pd.DataFrame, y_test: pd.Series):
    """
    Evaluate the model's performance on test data.

    Args:
        model: The trained model.
        X_test (pd.DataFrame): Test feature matrix.
        y_test (pd.Series): Test target vector.

    Prints:
        Accuracy score and classification report.
    """
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print("Accuracy on test set:", acc)
    print("Classification Report:")
    print(classification_report(y_test, y_pred))


# -----------------------------------------------------------------------------
# 4. Main Entry Point (Putting it all together)
# -----------------------------------------------------------------------------

def main():
    # Example: gather data from multiple seasons (the more training data, the better)
    seasons = [
        '2012-13', '2013-14', '2014-15', '2015-16', '2016-17',
        '2017-18', '2018-19', '2019-20', '2020-21', '2021-22'
    ]
    
    all_data = []
    for season in seasons:
        df_merged = prepare_data(season)
        all_data.append(df_merged)

    # Concatenate all seasonal data into one DataFrame
    full_df = pd.concat(all_data, ignore_index=True)

    # Clean and engineer features
    X, y = clean_and_engineer_features(full_df)

    # Train/test split (for demonstration, 80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Train model
    model = train_model(X_train, y_train)

    # Evaluate model
    evaluate_model(model, X_test, y_test)


if __name__ == "__main__":
    main()