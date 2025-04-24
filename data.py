import numpy as np, pandas as pd, os, json

# ------------------------------------------------------------------ #
# 1. seasons and champion labels                                     #
# ------------------------------------------------------------------ #
TRAIN_SEASONS = [f"{y:04d}-{str(y+1)[-2:]}" for y in range(2004, 2021)]
TEST_SEASONS  = ["2021-22", "2022-23", "2023-24"]
PREDICT_SEASON = "2024-25"

CHAMPS = {
    "2004-05": 25,  # Spurs
    "2005-06": 14,  # Heat
    "2006-07": 25,  # Spurs
    "2007-08": 1,   # Celtics
    "2008-09": 12,  # Lakers
    "2009-10": 12,  # Lakers
    "2010-11": 5,   # Mavericks
    "2011-12": 14,  # Heat
    "2012-13": 14,  # Heat
    "2013-14": 25,  # Spurs
    "2014-15": 8,   # Warriors
    "2015-16": 4,   # Cavaliers
    "2016-17": 8,   # Warriors
    "2017-18": 8,   # Warriors
    "2018-19": 27,  # Raptors
    "2019-20": 12,  # Lakers
    "2020-21": 15,  # Bucks
    "2021-22": 8,   # Warriors
    "2022-23": 3,   # Nuggets
    "2023-24": 1,   # Celtics  ← NEW
}

def load(season):
    fn = f"/mnt/data/{season}_team_stats.csv"
    return pd.read_csv(fn).fillna(0)

def make_xy(seasons):
    mats, labels = [], []
    for s in seasons:
        df = load(s)
        mats.append(df.drop(columns=["TEAM_ID", "TEAM_NAME"]).to_numpy(np.float32))
        lab = np.zeros(30, np.float32)
        lab[CHAMPS[s]] = 1.0
        labels.append(lab)
    return np.asarray(mats), np.asarray(labels)

# ------------------------------------------------------------------ #
# 2. write tensors                                                   #
# ------------------------------------------------------------------ #
np.save("/mnt/data/X_train.npy", make_xy(TRAIN_SEASONS)[0])
np.save("/mnt/data/y_train.npy", make_xy(TRAIN_SEASONS)[1])
np.save("/mnt/data/X_test.npy",  make_xy(TEST_SEASONS)[0])
np.save("/mnt/data/y_test.npy",  make_xy(TEST_SEASONS)[1])

X_2526 = load(PREDICT_SEASON).drop(columns=["TEAM_ID", "TEAM_NAME"]).to_numpy(np.float32)
np.save("/mnt/data/X_2526.npy", X_2526)