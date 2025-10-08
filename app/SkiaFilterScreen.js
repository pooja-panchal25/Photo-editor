import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Canvas, Image as SkiaImage, useImage, Paint, ColorMatrix } from '@shopify/react-native-skia';

const SkiaFilterScreen = () => {
  const image = useImage('https://images.unsplash.com/photo-1634915728822-5ad85582837a?auto=format&fit=crop&w=774&q=80');
  const [selectedFilter, setSelectedFilter] = useState('original');

  const filters = {
    original: [
      1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0,
    ],
    blackAndWhite: [
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0, 0, 0, 1, 0,
    ],
    tokyo: [
      1.2, 0, 0, 0, 0.05,
      0, 1.1, 0, 0, 0.02,
      0, 0, 0.9, 0, 0.15,
      0, 0, 0, 1, 0,
    ],
    vintage: [
      1.3, 0.2, 0, 0, 0,
      0.1, 1.1, 0.1, 0, 0,
      0, 0.1, 0.8, 0, 0,
      0, 0, 0, 1, 0,
    ],
    cool: [
      0.9, 0, 0, 0, 0,
      0, 0.95, 0, 0, 0,
      0, 0, 1.2, 0, 0.1,
      0, 0, 0, 1, 0,
    ],
    warm: [
      1.3, 0, 0, 0, 0.1,
      0, 1.1, 0, 0, 0.05,
      0, 0, 0.8, 0, 0,
      0, 0, 0, 1, 0,
    ],
    dramatic: [
      1.5, 0, 0, 0, -0.1,
      0, 1.5, 0, 0, -0.1,
      0, 0, 1.5, 0, -0.1,
      0, 0, 0, 1, 0,
    ],
    fade: [
      0.9, 0, 0, 0, 0.15,
      0, 0.9, 0, 0, 0.15,
      0, 0, 0.9, 0, 0.15,
      0, 0, 0, 1, 0,
    ],
    sepia: [
      0.393, 0.769, 0.189, 0, 0,
      0.349, 0.686, 0.168, 0, 0,
      0.272, 0.534, 0.131, 0, 0,
      0, 0, 0, 1, 0,
    ],
    moonlight: [
      0.8, 0, 0.2, 0, 0,
      0, 0.9, 0.1, 0, 0,
      0.1, 0, 1.1, 0, 0.1,
      0, 0, 0, 1, 0,
    ],
  };

  if (!image) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Canvas style={styles.canvas}>
        <SkiaImage 
          image={image} 
          x={0} 
          y={0} 
          width={300} 
          height={300} 
          fit="cover"
        >
          <Paint>
            <ColorMatrix matrix={filters[selectedFilter]} />
          </Paint>
        </SkiaImage>
      </Canvas>

      <View style={styles.filterSection}>
        <Text style={styles.title}>Choose Filter</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {Object.keys(filters).map((filterName) => (
            <TouchableOpacity
              key={filterName}
              onPress={() => setSelectedFilter(filterName)}
              style={[
                styles.filterButton,
                selectedFilter === filterName && styles.selectedFilter,
              ]}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filterName && styles.selectedFilterText,
              ]}>
                {filterName.charAt(0).toUpperCase() + filterName.slice(1).replace(/([A-Z])/g, ' $1')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SkiaFilterScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  canvas: { 
    width: 300, 
    height: 300, 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterSection: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    paddingLeft: 10,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedFilter: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#fff',
  },
});