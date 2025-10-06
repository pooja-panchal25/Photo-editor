import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import PhotoEditor from "@baronha/react-native-photo-editor";

export default function CreatePostScreen() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      response => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Pick Image" onPress={pickImage} />
      {/* Later you can add filters, text, stickers here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
});
