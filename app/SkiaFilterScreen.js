import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Canvas, Image as SkiaImage, useImage, Paint, ColorMatrix } from '@shopify/react-native-skia';

const SkiaFilterScreen = () => {
  const image = useImage('https://images.unsplash.com/photo-1634915728822-5ad85582837a?auto=format&fit=crop&w=774&q=80');
  const [brightness, setBrightness] = useState(1);

  if (!image) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Canvas style={styles.canvas}>
        <Paint>
          <ColorMatrix matrix={[
            brightness, 0, 0, 0, 0,
            0, brightness, 0, 0, 0,
            0, 0, brightness, 0, 0,
            0, 0, 0, 1, 0,
          ]} />
        </Paint>
        <SkiaImage image={image} x={0} y={0} width={300} height={300} fit="cover" />
      </Canvas>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setBrightness(b => Math.min(b + 0.1, 2))}>
          <Text style={styles.button}>Brightness +</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBrightness(b => Math.max(b - 0.1, 0))}>
          <Text style={styles.button}>Brightness -</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SkiaFilterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  canvas: { width: 300, height: 300, borderRadius: 10 },
  controls: { flexDirection: 'row', marginTop: 20 },
  button: {
    color: '#fff',
    backgroundColor: '#000',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});
