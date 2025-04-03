import tensorflow as tf
from tensorflow import keras
from keras import layers
from keras.callbacks import ReduceLROnPlateau
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

def build_cnn_model(input_shape, num_classes):
    """Builds a CNN model with multiple convolution blocks."""
    model = keras.Sequential()
    model.add(layers.Input(shape=input_shape))
    
    # First convolution block
    model.add(layers.Conv1D(64, kernel_size=3, padding='same'))
    model.add(layers.LeakyReLU(alpha=0.1))
    model.add(layers.BatchNormalization())
    model.add(layers.Dropout(0.2))
    
    # Second convolution block
    model.add(layers.Conv1D(128, kernel_size=3, padding='same'))
    model.add(layers.LeakyReLU(alpha=0.1))
    model.add(layers.BatchNormalization())
    model.add(layers.Dropout(0.2))
    
    # Third convolution block with a different kernel size
    model.add(layers.Conv1D(256, kernel_size=5, padding='same'))
    model.add(layers.LeakyReLU(alpha=0.1))
    model.add(layers.BatchNormalization())
    model.add(layers.Dropout(0.3))
    
    # Fourth convolution block
    model.add(layers.Conv1D(256, kernel_size=3, padding='same'))
    model.add(layers.LeakyReLU(alpha=0.1))
    model.add(layers.BatchNormalization())
    model.add(layers.Dropout(0.3))
    
    # Flatten and Dense layers
    model.add(layers.Flatten())
    model.add(layers.Dense(512))
    model.add(layers.LeakyReLU(alpha=0.1))
    model.add(layers.Dropout(0.4))
    model.add(layers.Dense(256))
    model.add(layers.LeakyReLU(alpha=0.1))
    model.add(layers.Dropout(0.3))
    
    # Output layer
    model.add(layers.Dense(num_classes, activation='softmax'))
    return model

def build_lstm_model(input_shape, num_classes):
    """Builds an LSTM-based model for sequence learning."""
    model = keras.Sequential()
    model.add(layers.Input(shape=input_shape))
    
    # LSTM layers - return sequences to stack more LSTMs
    model.add(layers.LSTM(128, return_sequences=True))
    model.add(layers.Dropout(0.3))
    model.add(layers.LSTM(128))
    model.add(layers.Dropout(0.3))
    
    # Dense layers for classification
    model.add(layers.Dense(256, activation='relu'))
    model.add(layers.Dropout(0.4))
    model.add(layers.Dense(num_classes, activation='softmax'))
    return model

def build_dense_model(input_shape, num_classes):
    """Builds a fully connected (dense) model. The input is first flattened."""
    model = keras.Sequential()
    model.add(layers.Input(shape=input_shape))
    model.add(layers.Flatten())
    model.add(layers.Dense(512, activation='relu'))
    model.add(layers.Dropout(0.4))
    model.add(layers.Dense(256, activation='relu'))
    model.add(layers.Dropout(0.3))
    model.add(layers.Dense(128, activation='relu'))
    model.add(layers.Dropout(0.2))
    model.add(layers.Dense(num_classes, activation='softmax'))
    return model

# -------------------------------------------------------------------
# Load Data
# -------------------------------------------------------------------
folder_path = "train_data"
champion_indices = [25, 14, 25, 1, 12, 12, 5, 14, 14, 25, 8, 4, 8, 8, 27, 12, 15]
X_train = load_data(folder_path)
print("X_train shape:", X_train.shape)
Y_train = make_y_train(champion_indices)
print("Y_train shape:", Y_train.shape)
num_features = X_train.shape[2]

# -------------------------------------------------------------------
# Select and Build a Model
# -------------------------------------------------------------------
# You can choose one of these model architectures:
# model = build_cnn_model((30, num_features), 30)
# model = build_lstm_model((30, num_features), 30)
model = build_dense_model((30, num_features), 30)  # Change this line to experiment

model.summary()

# -------------------------------------------------------------------
# Compile the Model
# -------------------------------------------------------------------
optimizer = keras.optimizers.RMSprop(learning_rate=0.001)
model.compile(
    optimizer=optimizer,
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Optional learning rate scheduler
lr_scheduler = ReduceLROnPlateau(monitor='loss', factor=0.5, patience=5, verbose=1)

# -------------------------------------------------------------------
# Train the Model
# -------------------------------------------------------------------
history = model.fit(X_train, Y_train, epochs=100, batch_size=4, verbose=2, callbacks=[lr_scheduler])

# -------------------------------------------------------------------
# Plot Training Accuracy
# -------------------------------------------------------------------
plt.figure(figsize=(8, 5))
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)
plt.show()

# -------------------------------------------------------------------
# Evaluate the Model
# -------------------------------------------------------------------
loss, accuracy = model.evaluate(X_train, Y_train, verbose=0)
print(f"Final training accuracy: {accuracy:.4f}")

predictions = model.predict(X_train)
top1_correct = 0
top5_correct = 0

for i, pred in enumerate(predictions):
    top_5_indices = pred.argsort()[-5:][::-1]  # Top 5 predictions
    actual_champ = np.argmax(Y_train[i])
    if actual_champ == top_5_indices[0]:
        top1_correct += 1
    if actual_champ in top_5_indices:
        top5_correct += 1

print(f"\nTop-1 accuracy: {top1_correct} / {len(Y_train)} = {top1_correct / len(Y_train):.2%}")
print(f"Top-5 accuracy: {top5_correct} / {len(Y_train)} = {top5_correct / len(Y_train):.2%}")