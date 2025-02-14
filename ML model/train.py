from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Convolution2D
from keras.layers import MaxPooling2D
from keras.layers import Flatten

model = Sequential()
model.add(Convolution2D(32,3,3,input_shape=(64,64,3),activation = 'relu'))

model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Flatten())

model.add(Dense(kernel_initializer='uniform', activation='relu', units=100))

model.add(Dense(kernel_initializer='uniform', activation='softmax', units=141))

model.compile(loss="categorical_crossentropy",optimizer='adam',metrics=["accuracy"])

#preprocessing technique to the image data
from tensorflow.keras.preprocessing.image import ImageDataGenerator
train_datagen = ImageDataGenerator(rescale = 1./255, shear_range = 0.2, zoom_range = 0.2, horizontal_flip = True)
test_datagen = ImageDataGenerator(rescale = 1./255)

x_train = train_datagen.flow_from_directory(r"fruits-360/Training",target_size=(64,64), batch_size = 64, class_mode = "categorical")
x_test = train_datagen.flow_from_directory(r"fruits-360/Test",target_size=(64,64), batch_size = 64, class_mode = "categorical")

history = model.fit(x_train, steps_per_epoch = 945,epochs=10,validation_data = x_test,validation_steps = 322)

# Data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    rotation_range=20,         # Random rotations
    width_shift_range=0.2,     # Horizontal shifts
    height_shift_range=0.2,    # Vertical shifts
    brightness_range=[0.8, 1.2],
    fill_mode='nearest'        # Fill in missing pixels after shifts/rotations
)

test_datagen = ImageDataGenerator(rescale=1./255)


from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from keras.layers import Flatten, Dropout
from keras.regularizers import l2

model = Sequential()

# Convolutional layer with L2 regularization
model.add(Conv2D(32, (3, 3),
                 input_shape=(64, 64, 3),
                 activation='relu',
                 kernel_regularizer=l2(0.001)))  # L2 reg factor can be tuned

model.add(MaxPooling2D(pool_size=(2, 2)))

# Dropout after pooling
model.add(Dropout(0.25))

model.add(Flatten())

# Dense layer with L2 regularization
model.add(Dense(100,
                kernel_initializer='uniform',
                activation='relu',
                kernel_regularizer=l2(0.001)))

# Dropout before final layer
model.add(Dropout(0.5))

model.add(Dense(141,
                kernel_initializer='uniform',
                activation='softmax'))

model.compile(
    loss="categorical_crossentropy",
    optimizer='adam',
    metrics=["accuracy"]
)



import matplotlib.pyplot as plt

# Plot training & validation loss values
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Training Loss', 'Validation Loss'], loc='upper left')
plt.show()

import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Conv2D, MaxPooling2D, Flatten
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Compile the model with additional metrics
model.compile(
    loss="categorical_crossentropy",
    optimizer='adam',
    metrics=[
        "accuracy", 
        tf.keras.metrics.Precision(name='precision'), 
        tf.keras.metrics.Recall(name='recall')
    ]
)

# Preprocessing for image data
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)
test_datagen = ImageDataGenerator(rescale=1./255)

x_train = train_datagen.flow_from_directory(
    r"fruits-360/Training",
    target_size=(64,64),
    batch_size=64,
    class_mode="categorical"
)
x_test = test_datagen.flow_from_directory(
    r"fruits-360/Test",
    target_size=(64,64),
    batch_size=64,
    class_mode="categorical"
)

# Plot training & validation loss values
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Training Loss', 'Validation Loss'], loc='upper left')

plt.subplot(1, 3, 2)
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Training Accuracy', 'Validation Accuracy'], loc='upper left')

plt.subplot(1, 3, 3)
plt.plot(history.history['precision'])
plt.plot(history.history['val_precision'])
plt.plot(history.history['recall'])
plt.plot(history.history['val_recall'])
plt.title('Precision & Recall')
plt.ylabel('Score')
plt.xlabel('Epoch')
plt.legend(['Train Precision', 'Val Precision', 'Train Recall', 'Val Recall'], loc='upper left')

plt.tight_layout()
plt.show()


import numpy as np
from sklearn.metrics import accuracy_score, precision_score, classification_report

# Predict on test data
# Make sure steps covers the whole test set:
test_steps = x_test.samples // x_test.batch_size
predictions = model.predict(x_test, steps=test_steps, verbose=1)
y_pred = np.argmax(predictions, axis=1)

# Get the true labels from the generator
y_true = x_test.classes[:len(y_pred)]

# Calculate Accuracy
accuracy = accuracy_score(y_true, y_pred)

# Calculate Precision (weighted average is typically used for multi-class)
precision = precision_score(y_true, y_pred, average='weighted')

print("Accuracy: {:.2f}%".format(accuracy * 100))
print("Precision: {:.2f}%".format(precision * 100))

# Optionally, print a full classification report:
print("\nClassification Report:\n", classification_report(y_true, y_pred))

# Save the model
model.save("detect.h5")

print(x_train.class_indices)
