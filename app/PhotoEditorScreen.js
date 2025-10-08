import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PhotoEditor from '@baronha/react-native-photo-editor';

const { width } = Dimensions.get('window');
const stickers = []; // Add your sticker assets if needed

const PhotoEditorScreen = () => {
  const [photo, setPhoto] = useState({});
  const remoteURL =
    'https://images.unsplash.com/photo-1634915728822-5ad85582837a?auto=format&fit=crop&w=774&q=80';

  const onEdit = async () => {
    try {
      const path = await PhotoEditor.open({
        path: photo?.uri || remoteURL,
        stickers,
      });
      setPhoto({
        ...photo,
        uri: path,
      });
      console.log('Edited Image Path:', path);
    } catch (e) {
      console.log('Editor Error:', e);
    }
  };

  const openPicker = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onEdit}>
        {photo?.uri ? (
          <Image style={styles.image} source={{ uri: photo.uri }} />
        ) : (
          <Image style={styles.image} source={{ uri: remoteURL }} />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openPicker}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onEdit}>
        <Text style={styles.buttonText}>Edit with Photo Editor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PhotoEditorScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff' },
  image: { width, height: width, marginVertical: 10 },
  button: {
    margin: 10,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
