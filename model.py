import tensorflow as tf
from tensorflow import keras
from keras import layers
import pandas as pd
import numpy as np


df = pd.read_csv("train_data/2004-05_team_stats.csv")
df = df.drop(columns=["TEAM_ID", "TEAM_NAME"])
df.fillna(0, inplace=True)
data = df.to_numpy()