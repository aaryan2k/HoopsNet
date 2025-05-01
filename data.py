from pathlib import Path

import numpy as np
import pandas as pd
from tensorflow import keras
from keras import layers
from keras.callbacks import EarlyStopping, ReduceLROnPlateau

# ----------------------------------------------------------------- #
# Model definition                                                #
# ----------------------------------------------------------------- #
def build_cnn_model(input_shape: tuple[int, int]) -> keras.Model:
    """
    Create a 1D convolutional neural network with squeeze-and-excite blocks.

    Args:
        input_shape: Tuple (n_teams, n_features).

    Returns:
        Compiled Keras model (uncompiled).
    """
    inputs = keras.Input(shape=input_shape)
    x = layers.Conv1D(96, kernel_size=3, padding="same")(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.LeakyReLU(alpha=0.1)(x)

    # Residual blocks with squeeze-and-excite
    for filters, dropout_rate in [(128, 0.35), (256, 0.35), (512, 0.35)]:
        shortcut = x
        x = layers.Conv1D(filters, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)
        x = layers.LeakyReLU(alpha=0.1)(x)
        x = layers.Conv1D(filters, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)
        x = layers.add([x, shortcut])

        # Squeeze-and-excite
        se = layers.GlobalAveragePooling1D()(x)
        se = layers.Dense(filters // 16, activation="relu")(se)
        se = layers.Dense(filters, activation="sigmoid")(se)
        se = layers.Reshape((1, filters))(se)
        x = layers.multiply([x, se])
        x = layers.Dropout(dropout_rate)(x)

    x = layers.Flatten()(x)
    x = layers.Dense(512, activation="relu")(x)
    x = layers.Dropout(0.4)(x)
    outputs = layers.Dense(30, activation="softmax")(x)

    return keras.Model(inputs, outputs, name="CNN_SE")


# ----------------------------------------------------------------- #
# Training and evaluation                                         #
# ----------------------------------------------------------------- #

DATA_DIR = Path("/mnt/data")

# Load preprocessed tensors
X_train = np.load(DATA_DIR / "X_train.npy")  # shape: (17, 30, F)
y_train = np.load(DATA_DIR / "y_train.npy")
X_test = np.load(DATA_DIR / "X_test.npy")    # shape: (3, 30, F)
y_test = np.load(DATA_DIR / "y_test.npy")
X_pred = np.load(DATA_DIR / "X_2526.npy")    # shape: (30, F)

# Build and compile model
model = build_cnn_model(input_shape=(X_train.shape[1], X_train.shape[2]))
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss="categorical_crossentropy",
    metrics=["accuracy"],
)

# Callbacks
callbacks = [
    ReduceLROnPlateau(monitor="loss", factor=0.5, patience=8, verbose=1),
    EarlyStopping(monitor="loss", patience=20, restore_best_weights=True),
]

# Train
model.fit(
    X_train,
    y_train,
    epochs=400,
    batch_size=4,
    verbose=2,
    callbacks=callbacks,
)

# Evaluate on test seasons
print("\n=== Evaluation on 2021-22 → 2023-24 ===")
probs_test = model.predict(X_test)
top1 = (probs_test.argmax(axis=1) == y_test.argmax(axis=1)).mean()
top5 = np.mean([
    label in probs.argsort()[-5:]
    for probs, label in zip(probs_test, y_test.argmax(axis=1))
])
print(f"Top-1 accuracy: {top1:.2%}")
print(f"Top-5 accuracy: {top5:.2%}")

# Predict champions for 2024-25
teams_25 = pd.read_csv(DATA_DIR / "2024-25_team_stats.csv")["TEAM_NAME"]
probs_pred = model.predict(X_pred[None, ...])[0]
out_df = pd.DataFrame({"TEAM_NAME": teams_25, "champ_prob": probs_pred})
out_df.sort_values(by="champ_prob", ascending=False, inplace=True)
out_df.to_csv(DATA_DIR / "champ_probabilities_2025.csv", index=False)
print("\nSaved champ_probabilities_2025.csv")
