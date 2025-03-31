import tensorflow as tf
from tensorflow import keras
from keras import layers
import pandas as pd
import numpy as np
import os

from keras import Input, Model
from keras.layers import Dense, Flatten, Activation



# df = pd.read_csv("train_data/2004-05_team_stats.csv")
# df = df.drop(columns=["TEAM_ID", "TEAM_NAME"])
# df.fillna(0, inplace=True)
# data = df.to_numpy()



def load_data(folder_path):
    data = []

    files = [f for f in os.listdir(folder_path) if f.endswith(".csv")]
    files.sort(key=lambda name: int(name[:4]))  # Sort chronologically

    for filename in files:
        full_path = os.path.join(folder_path, filename)
        df = pd.read_csv(full_path)
        df = df.drop(columns=["TEAM_ID", "TEAM_NAME"])
        df.fillna(0, inplace=True)
        arr = df.to_numpy(dtype='float32')
        data.append(arr)

    return np.array(data, dtype='float32')

def make_y_train(champion_indices):
    labels = []
    for idx in champion_indices:
        arr = np.zeros(30, dtype='float32')
        arr[idx] = 1.0
        labels.append(arr)

    return np.array(labels, dtype='float32')



folder_path = "train_data"
champion_indices = []
playoff_indices_combined = [
    [1, 3, 5, 6, 7, 9, 10, 13, 14, 17, 21, 22, 24, 25, 26, 29],  # 2004-05 done
    [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 17, 22, 24, 25, 29],  # 2005-06 done
    [3, 4, 5, 6, 7, 8, 9, 12, 14, 17, 20, 22, 25, 27, 28, 29],  # 2006-07 done
    [0, 1, 4, 5, 6, 7, 9, 12, 18, 20, 21, 22, 25, 27, 28, 29],  # 2007-08 done
    [0, 1, 3, 4, 5, 6, 7, 9, 12, 14, 18, 21, 22, 24, 26, 28],  # 2008-09 done
    [0, 1, 2, 3, 4, 5, 6, 12, 14, 15, 20, 21, 23, 24, 26, 28],  # 2009-10 done
    [0, 1, 3, 5, 6, 10, 12, 13, 14, 18, 19, 20, 21, 22, 24, 26],  # 2010-11 done
    [0, 1, 3, 5, 6, 10, 11, 12, 13, 14, 19, 20, 21, 22, 26, 28],  # 2011-12 done
    [0, 1, 2, 4, 7, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 26],  # 2012-13 done
    [0, 1, 3, 4, 6, 9, 10, 11, 12, 14, 15, 20, 24, 26, 27, 29],  # 2013-14 done
    [0, 1, 2, 4, 5, 6, 9, 10, 12, 14, 16, 18, 24, 26, 27, 29],  # 2014-15 done
    [0, 1, 3, 5, 6, 8, 9, 10, 11, 12, 14, 15, 20, 24, 26, 27],  # 2015-16 done
    [0, 1, 4, 5, 9, 10, 11, 12, 14, 16, 20, 24, 26, 27, 28, 29],  # 2016-17 done
    [1, 5, 9, 10, 11, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28, 29],  # 2017-18 done
    [1, 2, 7, 8, 9, 10, 11, 12, 16, 20, 21, 22, 24, 26, 27, 28],  # 2018-19 done
    [1, 2, 6, 7, 10, 11, 12, 13, 15, 16, 20, 21, 22, 24, 27, 28],  # 2019-20
    [0, 1, 2, 6, 7, 12, 13, 14, 15, 16, 19, 22, 23, 24, 28, 29]  # 2020-21 done
]
        


X_train = load_data(folder_path)
Y_train = make_y_train(champion_indices)

num_features = X_train.shape[2]

# Build the model
inputs = Input(shape=(30, num_features))  # one szn of 30 teams
x = Dense(32, activation='relu')(inputs)
x = Dense(32, activation='relu')(x)
x = Dense(1)(x)        # Output one score per team
x = Flatten()(x)       # Flatten to (30,)
outputs = Activation('softmax')(x)  # Probabilities across teams

model = Model(inputs=inputs, outputs=outputs)

# compile the model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(X_train, Y_train, epochs=25, batch_size=1)

