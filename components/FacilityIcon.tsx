import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type FacilityIconProps = {
  name: string;
  image: any;
  onPress: () => void;
};

export default function FacilityIcon({ name, image, onPress }: FacilityIconProps) {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      <Image source={image} style={styles.iconImage} />
      <Text style={styles.iconText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 160, // Retain the rectangle shape for the icon
    height: 200, // Retain the height
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10, // Add space between icons
    backgroundColor: '#fff',
    borderRadius: 10, // Subtle rounding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  iconImage: {
    width: 140, // Increased the width of the image
    height: 140, // Increased the height of the image
    borderRadius: 10, // Matching border radius
    marginBottom: 10, // Maintain spacing between image and text
  },
  iconText: {
    fontSize: 16, // Adjusted text size
    fontWeight: 'bold',
    color: '#333',
  },
});
