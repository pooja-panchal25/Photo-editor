import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { GiphySDK, GiphyDialog, GiphyMediaView } from '@giphy/react-native-sdk';

// Initialize Giphy
GiphySDK.configure({ apiKey: 'WnwL7NiRyJWIJ8jXoxweFbelSlBlHLCC' });

export default function GiphyScreen() {
  const [gifUrl, setGifUrl] = useState(null);

  const openGiphy = () => {
    GiphyDialog.configure({ theme: 'Dark' });
    GiphyDialog.show();
    const listener = GiphyDialog.addListener('onMediaSelect', (media) => {
    console.log("in print--->",JSON.stringify(media))
      setGifUrl(media.url);
      GiphyDialog.hide();
      listener.remove();
    });
    
  };
console.log("in print==>state",gifUrl)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Giphy Picker" onPress={openGiphy} />
      {gifUrl && (
        <Image
          source={{ uri: gifUrl }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
}
