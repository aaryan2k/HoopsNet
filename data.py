from __future__ import annotations
import os, time
from pathlib import Path
from typing import Iterable, List

import numpy as np
import pandas as pd
from nba_api.stats.endpoints import (
    leaguedashteamstats as _stats,
    leaguedashteamshotlocations as _locs,
    leaguedashteamptshot as _pt,
)

# ------------------------- feature subsets -------------------------- #
_ADV = ["TEAM_ID", "EFG_PCT", "NET_RATING", "TS_PCT_RANK", "OFF_RATING"]
_MISC = ["TEAM_ID", "PACE", "PIE", "AST_TOV", "OREB_PCT", "FTA_RATE"]
_OPP4 = ["TEAM_ID", "OPP_EFG_PCT", "OPP_FTA_RATE", "OPP_TOV_PCT", "OPP_OREB_PCT"]
_FORM_SUFFIX = "_LAST_20"     # will be appended for rolling‑window pulls
_SHOOT = ["TEAM_ID", "RESTRICTED_AREA_FG_PCT",
          "MID_RANGE_FG_PCT", "FG3_PCT"]

_WINCOLS = ["TEAM_ID", "W_PCT"]
_SRS_COL = ["TEAM_ID", "NET_RATING"]    # good proxy for SRS

# --------------------------- helpers -------------------------------- #
def _dash(measure: str, season: str, last20: bool = False) -> pd.DataFrame:
    """Generic wrapper around LeagueDashTeamStats."""
    kwargs = dict(season=season,
                  season_type_all_star="Regular Season",
                  per_mode_detailed="PerGame",
                  measure_type_detailed_defense=measure)
    if last20:
        kwargs.update(period=0, last_n_games=20)
    return _stats.LeagueDashTeamStats(**kwargs).get_data_frames()[0]

def _pull_one(season: str) -> pd.DataFrame:
    t0 = time.time(); print(f"▶ {season}", end=" ", flush=True)

    adv  = _dash("Advanced", season)[_ADV + _WINCOLS]        # +W_PCT
    misc = _dash("Misc", season)[_MISC]
    opp4 = _dash("Four Factors", season)[_OPP4]
    form = _dash("Advanced", season, last20=True)\
              [[c.replace("_LAST_20","") for c in _ADV]].add_suffix(_FORM_SUFFIX)

    loc  = _locs.LeagueDashTeamShotLocations(season=season,
                                             season_type_all_star="Regular Season")\
                .get_data_frames()[0][["TEAM_ID",
                                        "RESTRICTED_AREA_FG_PCT",
                                        "MID_RANGE_FG_PCT"]]
    pt   = _pt.LeagueDashTeamPtShot(season=season,
                                    season_type_all_star="Regular Season")\
                .get_data_frames()[0][["TEAM_ID", "FG3_PCT"]]

    df = adv.merge(misc, on="TEAM_ID")\
            .merge(opp4, on="TEAM_ID")\
            .merge(form, on="TEAM_ID")\
            .merge(loc,  on="TEAM_ID")\
            .merge(pt,   on="TEAM_ID")

    df.rename(columns={"NET_RATING": "SRS"}, inplace=True)   # clarity
    # PLUS_MINUS no longer needed; SRS is superior
    print(f"done in {time.time()-t0:.1f}s")
    return df

def fetch_and_cache(seasons: Iterable[str], cache_dir="train_data") -> None:
    Path(cache_dir).mkdir(exist_ok=True)
    for s in seasons:
        fp = Path(cache_dir)/f"{s}_team_stats.csv"
        if fp.exists(): continue
        _pull_one(s).to_csv(fp, index=False)

def load_cached(folder: str) -> np.ndarray:
    files = sorted(Path(folder).glob("*_team_stats.csv"), key=lambda p: int(p.name[:4]))
    mats: List[np.ndarray] = []
    for f in files:
        df = pd.read_csv(f).drop(columns=["TEAM_ID", "TEAM_NAME"], errors="ignore").fillna(0)
        mats.append(df.to_numpy(np.float32))
    return np.asarray(mats, np.float32)