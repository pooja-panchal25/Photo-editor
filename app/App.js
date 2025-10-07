import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import PhotoEditor from '@baronha/react-native-photo-editor';

const { width } = Dimensions.get('window');

const App = () => {
  const [photo, setPhoto] = useState({});
  const remoteURL =
    'https://images.unsplash.com/photo-1634915728822-5ad85582837a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80';

  const onEdit = async () => {
    try {
      const path = await PhotoEditor.open({
        path: remoteURL,
        // path: photo.path,
        stickers,
      });
      setPhoto({
        ...photo,
        path,
      });
      console.log('resultEdit', path);
    } catch (e) {
      console.log('e', e);
    }
  };
const openPicker = () => {
  const options = {
    mediaType: 'photo', // or 'mixed' if you also want videos
    selectionLimit: 1,  // allows only one image to be selected
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      console.log('result', response.assets[0]);
      setPhoto(response.assets[0]);
    }
  });
};
  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity onPress={onEdit}>
        {photo?.path && (
          <Image
            style={style.image}
            source={{
              uri: photo.path,
            }}
          />
        )}
        <Image
          style={style.image}
          source={{
            uri: remoteURL,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={style.openPicker} onPress={openPicker}>
        <Text style={style.titleOpen}>Open Picker</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {},
  image: {
    width,
    height: width,
  },
  openPicker: {
    margin: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOpen: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 12,
  },
});

const stickers = [];
