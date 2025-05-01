"""
Preprocess NBA team statistics into NumPy tensors for model training and prediction.
"""
import json
from pathlib import Path

import numpy as np
import pandas as pd

# ----------------------------------------------------------------- #
# Configuration                                                   #
# ----------------------------------------------------------------- #
TRAIN_SEASONS = [f"{year:04d}-{str(year + 1)[-2:]}" for year in range(2004, 2021)]
TEST_SEASONS = ["2021-22", "2022-23", "2023-24"]
PREDICT_SEASON = "2024-25"

# Mapping season to championship team index
CHAMPION_LABELS = {
    "2004-05": 25,  # Spurs
    "2005-06": 14,  # Heat
    # ... (other seasons) ...
    "2023-24": 1,   # Celtics
}

DATA_DIR = Path("/mnt/data")


# ----------------------------------------------------------------- #
# Data loading and preprocessing                                  #
# ----------------------------------------------------------------- #

def load_season_stats(season: str) -> pd.DataFrame:
    """
    Load a season's team statistics CSV and fill missing values with zeros.

    Args:
        season: Season string, e.g. "2024-25".

    Returns:
        DataFrame with no missing values.
    """
    filename = DATA_DIR / f"{season}_team_stats.csv"
    df = pd.read_csv(filename)
    return df.fillna(0)


def make_xy(seasons: list[str]) -> tuple[np.ndarray, np.ndarray]:
    """
    Convert a list of seasons into feature and label arrays.

    Args:
        seasons: List of season strings.

    Returns:
        X: Array of shape (n_seasons, n_teams, n_features)
        y: One-hot label array of shape (n_seasons, n_teams)
    """
    features, labels = [], []
    for season in seasons:
        df = load_season_stats(season)
        # Drop identifiers
        X_season = df.drop(columns=["TEAM_ID", "TEAM_NAME"]).to_numpy(dtype=np.float32)
        features.append(X_season)

        # One-hot encode champion index
        label = np.zeros(X_season.shape[0], dtype=np.float32)
        champion_idx = CHAMPION_LABELS.get(season)
        if champion_idx is not None:
            label[champion_idx] = 1.0
        labels.append(label)

    return np.stack(features), np.stack(labels)


if __name__ == "__main__":
    # Save training and test tensors
    X_train, y_train = make_xy(TRAIN_SEASONS)
    X_test, y_test = make_xy(TEST_SEASONS)

    np.save(DATA_DIR / "X_train.npy", X_train)
    np.save(DATA_DIR / "y_train.npy", y_train)
    np.save(DATA_DIR / "X_test.npy", X_test)
    np.save(DATA_DIR / "y_test.npy", y_test)

    # Save prediction features for the upcoming season
    df_future = load_season_stats(PREDICT_SEASON)
    X_future = df_future.drop(columns=["TEAM_ID", "TEAM_NAME"]).to_numpy(dtype=np.float32)
    np.save(DATA_DIR / "X_2526.npy", X_future)
