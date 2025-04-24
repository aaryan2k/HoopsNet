from tensorflow import keras
from keras import layers
from typing import Tuple

def build(input_shape: Tuple[int, int]) -> keras.Model:
    inputs = keras.Input(shape=input_shape)
    x = layers.Conv1D(96, 3, padding="same")(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.LeakyReLU(0.1)(x)

    for filters, drop in [(128, 0.35), (256, 0.35), (512, 0.35)]:
        skip = x
        x = layers.Conv1D(filters, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)
        x = layers.LeakyReLU(0.1)(x)
        x = layers.Conv1D(filters, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)
        x = layers.add([x, skip])
        # squeeze‑excite
        se = layers.GlobalAveragePooling1D()(x)
        se = layers.Dense(filters // 16, activation="relu")(se)
        se = layers.Dense(filters, activation="sigmoid")(se)
        se = layers.Reshape((1, filters))(se)
        x = layers.multiply([x, se])
        x = layers.Dropout(drop)(x)

    x = layers.Flatten()(x)
    x = layers.Dense(512, activation="relu")(x)
    x = layers.Dropout(0.4)(x)
    outputs = layers.Dense(30, activation="softmax")(x)
    return keras.Model(inputs, outputs, name="CNN_SE")

import subprocess, os, numpy as np, pandas as pd
from pathlib import Path
from tensorflow import keras
from keras.callbacks import ReduceLROnPlateau, EarlyStopping

DATA = Path("/mnt/data")
for f in ["X_train.npy", "X_2526.npy"]:
    if not (DATA / f).exists():
        subprocess.check_call(["python", "preprocess_teams.py"])

# ----------------------- load tensors ------------------------------ #
X_train = np.load(DATA / "X_train.npy")   # shape (17, 30, F)
y_train = np.load(DATA / "y_train.npy")
X_test  = np.load(DATA / "X_test.npy")    # shape (3, 30, F)
y_test  = np.load(DATA / "y_test.npy")
X_pred  = np.load(DATA / "X_2526.npy")    # shape (30, F)

model = build((30, X_train.shape[-1]))
model.compile(optimizer=keras.optimizers.Adam(1e-3),
              loss="categorical_crossentropy",
              metrics=["accuracy"])

cb = [ReduceLROnPlateau(monitor="loss", factor=0.5, patience=8, verbose=1),
      EarlyStopping(monitor="loss", patience=20, restore_best_weights=True)]

model.fit(X_train, y_train,
          epochs=400,
          batch_size=4,
          verbose=2,
          callbacks=cb)

# ----------------------- evaluation ------------------------------- #
print("\n=== Eval 2021‑22 → 2023‑24 ===")
probs_test = model.predict(X_test)
top1_hits  = (probs_test.argmax(-1) == y_test.argmax(-1)).mean()
top5_hits  = [
    champ in probs.argsort()[-5:]
    for probs, champ in zip(probs_test, y_test.argmax(-1))
]
print(f"Top‑1  : {top1_hits:.2%}")
print(f"Top‑5  : {np.mean(top5_hits):.2%}")

# ----------------------- 2024‑25 prediction ----------------------- #
probs_pred = model.predict(X_pred[None, ...])[0]  # (30, )
teams_25   = pd.read_csv(DATA / "2024-25_team_stats.csv")["TEAM_NAME"]
out = (pd.DataFrame({"TEAM_NAME": teams_25, "champ_prob": probs_pred})
         .sort_values("champ_prob", ascending=False))
out.to_csv(DATA / "champ_probabilities_2025.csv", index=False)
print("\nSaved champ_probabilities_2025.csv")