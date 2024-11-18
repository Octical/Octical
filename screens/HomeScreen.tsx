import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import FacilityIcon from '../components/FacilityIcon';
import { StackNavigationProp } from '@react-navigation/stack';

// Directly use 'any' for navigation prop type if you don't need specific types
type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const facilities = [
    { id: '1', name: 'Gym', image: require('../assets/gym.png') },
    { id: '2', name: 'Library', image: require('../assets/library.png') },
    { id: '3', name: 'Laundry', image: require('../assets/laundry.png') },
    { id: '4', name: 'Pool Table', image: require('../assets/pool-table.png') },
  ];

  return (
    <ImageBackground source={require('../assets/home-background.png')} style={styles.background}>
      <View style={styles.container}>
        {facilities.map((facility) => (
          <FacilityIcon
            key={facility.id}
            name={facility.name}
            image={facility.image}
            onPress={() => navigation.navigate('FacilityDetail', { name: facility.name })}
          />
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start', // Keep aligning icons at the top
    paddingVertical: 80, // Increased padding to move icons further down
  },
});
