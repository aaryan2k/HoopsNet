"""
Full `model.py` for NBA champion prediction, with enhanced feature set and a choice of three architectures.
"""
from __future__ import annotations
import os
from pathlib import Path
from typing import Tuple, List

import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from keras import layers
from keras.callbacks import ReduceLROnPlateau, EarlyStopping

# Local loader of cached features
from data import load_cached

# -------------------------------------------------------------------- #
#  Configuration                                                      #
# -------------------------------------------------------------------- #
TRAIN_DIR = "train_data"
TEST_DIR = "test_data"  # optional; if populated, will evaluate on it

# Champions for training (2004–05 ➔ 2020–21, total 17 seasons)
Y_CHAMPIONS = [25, 14, 25, 1, 12, 12, 5, 14, 14,
               25, 8, 4, 8, 8, 27, 12, 15]
# Known champions for test_data seasons (2021-22: Warriors=10, 2022-23: Nuggets=3)
Y_TEST = [10, 3]

# -------------------------------------------------------------------- #
#  Load Data                                                          #
# -------------------------------------------------------------------- #
print("Loading training data from:", TRAIN_DIR)
X_train = load_cached(TRAIN_DIR)
assert X_train.ndim == 3, "Expect shape (seasons, teams, features)"

y_train = keras.utils.to_categorical(Y_CHAMPIONS, num_classes=30)
N_SEASONS, N_TEAMS, N_FEAT = X_train.shape
INPUT_SHAPE: Tuple[int, int] = (N_TEAMS, N_FEAT)
print(f"Train: {N_SEASONS} seasons, {N_TEAMS} teams, {N_FEAT} features each.")

X_test, y_test = None, None
if Path(TEST_DIR).exists():
    print("Loading test data from:", TEST_DIR)
    X_test = load_cached(TEST_DIR)
    y_test = keras.utils.to_categorical(Y_TEST, num_classes=30)
    print(f"Test: {X_test.shape[0]} seasons available.")

# -------------------------------------------------------------------- #
#  Model Definitions                                                  #
# -------------------------------------------------------------------- #

def cnn_se(input_shape: Tuple[int, int]) -> keras.Model:
    """Residual CNN with Squeeze‑Excite blocks."""
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

        # Squeeze‑Excite
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


def lstm_stacked(input_shape: Tuple[int, int]) -> keras.Model:
    """Stacked bidirectional LSTM with dense head."""
    inputs = keras.Input(shape=input_shape)
    x = layers.Bidirectional(layers.LSTM(256, return_sequences=True))(inputs)
    x = layers.Dropout(0.3)(x)
    x = layers.Bidirectional(layers.LSTM(256))(x)
    x = layers.Dropout(0.3)(x)
    for units, drop in [(512, 0.4), (256, 0.3), (128, 0.2)]:
        x = layers.Dense(units, activation="relu")(x)
        x = layers.Dropout(drop)(x)
    outputs = layers.Dense(30, activation="softmax")(x)
    return keras.Model(inputs, outputs, name="LSTM_Stacked")


def mlp_deep(input_shape: Tuple[int, int]) -> keras.Model:
    """Deep MLP with LayerNorm and GELU activations."""
    inputs = keras.Input(shape=input_shape)
    x = layers.Flatten()(inputs)
    for units, drop in [(2048, 0.4), (1024, 0.4), (512, 0.3), (512, 0.3), (256, 0.2)]:
        x = layers.Dense(units)(x)
        x = layers.LayerNormalization()(x)
        x = layers.Activation("gelu")(x)
        x = layers.Dropout(drop)(x)
    outputs = layers.Dense(30, activation="softmax")(x)
    return keras.Model(inputs, outputs, name="MLP_Deep")

# Map strings to builder functions
MODEL_BUILDERS = {
    "cnn_se": cnn_se,
    "lstm": lstm_stacked,
    "mlp": mlp_deep,
}

# Choose model: "cnn_se", "lstm", or "mlp"
CHOSEN = "cnn_se"
model = MODEL_BUILDERS[CHOSEN](INPUT_SHAPE)
model.summary(line_length=100)

# -------------------------------------------------------------------- #
#  Compile & Train                                                   #
# -------------------------------------------------------------------- #
model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss="categorical_crossentropy",
    metrics=["accuracy"],
)
callbacks = [
    ReduceLROnPlateau(monitor="loss", factor=0.5, patience=8, verbose=1),
    EarlyStopping(monitor="loss", patience=20, restore_best_weights=True),
]
history = model.fit(
    X_train, y_train,
    epochs=400,
    batch_size=4,
    verbose=2,
    callbacks=callbacks,
)

# -------------------------------------------------------------------- #
#  Evaluation                                                         #
# -------------------------------------------------------------------- #
print("\n=== Training performance ===")
train_loss, train_acc = model.evaluate(X_train, y_train, verbose=0)
print(f"Final training accuracy: {train_acc:.2%}")
probs = model.predict(X_train, verbose=0)
top1 = np.mean(np.argmax(probs, axis=1) == np.argmax(y_train, axis=1))
top5 = np.mean([
    np.argmax(y) in p.argsort()[-5:] for p, y in zip(probs, y_train)
])
print(f"Top‑1 recall (LOSO proxy): {top1:.2%}")
print(f"Top‑5 recall: {top5:.2%}")

if X_test is not None:
    print("\n=== Test performance ===")
    loss_t, acc_t = model.evaluate(X_test, y_test, verbose=0)
    print(f"Test accuracy: {acc_t:.2%}")
    probs_t = model.predict(X_test, verbose=0)
    top1_t = np.mean(np.argmax(probs_t, axis=1) == np.argmax(y_test, axis=1))
    top5_t = np.mean([
        np.argmax(y) in p.argsort()[-5:] for p, y in zip(probs_t, y_test)
    ])
    print(f"Test Top‑1: {top1_t:.2%}")
    print(f"Test Top‑5: {top5_t:.2%}")

# -------------------------------------------------------------------- #
#  Plot training curve                                                #
# -------------------------------------------------------------------- #
plt.figure(figsize=(8, 5))
plt.plot(history.history["accuracy"], label="Training Accuracy")
plt.title(f"{model.name} – Training Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
