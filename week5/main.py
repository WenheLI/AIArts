import tensorflow as tf

from tensorflow import keras
import tensorflow_datasets as tfds
from tensorflow.keras import layers, datasets, models
if __name__ == "__main__":
    dataloader = tfds.load("cifar10", as_supervised=True)
    train, test = dataloader["train"], dataloader["test"]
    # (train_x, train_y), (test_x, test_y) = datasets.cifar10.load_data()
    # train_x = train_x / 255.0
    # test_x = test_x / 255.0
    train = train.map(
        lambda image, label: (tf.image.convert_image_dtype(image, tf.float32), label)
    ).cache().map(
        lambda image, label: (tf.image.random_flip_left_right(image), label)
    ).map(
        lambda image, label: (tf.image.random_contrast(image, lower=0.0, upper=1.0), label)
    ).shuffle(
        100
    ).batch(
        64
    ).repeat()
    model = models.Sequential()
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
    model.add(layers.MaxPooling2D(2, 2))
    model.add(layers.Dropout(.25))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Dropout(.5))
    model.add(layers.Conv2D(128, (3, 3), activation='relu'))
    model.add(layers.Conv2D(128, (3, 3), activation='relu'))
    model.add(layers.Dropout(.5))
    model.add(layers.Flatten())
    model.add(layers.Dense(128, activation='relu'))
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(32, activation='relu'))
    model.add(layers.Dense(10, activation='softmax'))

    model.summary()
    
    model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
    
    model.fit(train, epochs=20)

    test_loss, test_acc = model.evaluate(test)
    print(test_loss, test_acc)

    model.save('cifar10-64.h5')