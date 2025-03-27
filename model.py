import tensorflow as tf
from tensorflow import keras
from keras import layers
import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt


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
champion_indices = [25, 14, 25, 1, 12, 12, 5, 14, 14, 25, 8, 4, 8, 8, 27, 12, 15]
X_train = load_data(folder_path)
print(X_train.shape)
Y_train = make_y_train(champion_indices)
print(Y_train.shape)
num_features = X_train.shape[2]

model = keras.Sequential([
    layers.Input(shape=(30, num_features)),  # 30 teams per season

    layers.Conv1D(64, kernel_size=3, padding='same', activation='relu'),
    layers.BatchNormalization(),
    layers.Dropout(0.2),

    layers.Conv1D(128, kernel_size=3, padding='same', activation='relu'),
    layers.BatchNormalization(),
    layers.Dropout(0.2),

    layers.Flatten(),

    layers.Dense(256, activation='relu'),
    layers.Dropout(0.3),

    layers.Dense(30, activation='softmax')  # Predict champion (one-hot vector)
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()


# ------------------------------------------------------------------------------
# 4. Train the Model
# ------------------------------------------------------------------------------

history = model.fit(X_train, Y_train, epochs=100, batch_size=4, verbose=2)


# ------------------------------------------------------------------------------
# 5. Plot Training Accuracy
# ------------------------------------------------------------------------------

plt.plot(history.history['accuracy'])
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.grid(True)
plt.show()


# ------------------------------------------------------------------------------
# 6. Evaluate (Optional)
# ------------------------------------------------------------------------------

loss, accuracy = model.evaluate(X_train, Y_train, verbose=0)
print(f"Final training accuracy: {accuracy:.4f}")

predictions = model.predict(X_train)

top1_correct = 0
top5_correct = 0

for i, pred in enumerate(predictions):
    top_5_indices = pred.argsort()[-5:][::-1]  # Get top 5 predicted teams
    actual_champ = np.argmax(Y_train[i])

    if actual_champ == top_5_indices[0]:
        top1_correct += 1
    if actual_champ in top_5_indices:
        top5_correct += 1

print(f"\nTop-1 accuracy: {top1_correct} / {len(Y_train)} = {top1_correct / len(Y_train):.2%}")
print(f"Top-5 accuracy: {top5_correct} / {len(Y_train)} = {top5_correct / len(Y_train):.2%}")