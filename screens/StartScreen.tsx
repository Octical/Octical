import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Start'>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  useEffect(() => {
    // Automatically navigate to Home after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  const handleTap = () => {
    // Navigate to Home when the screen is tapped
    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <ImageBackground source={require('../assets/start-background.png')} style={styles.background}>
        {/* No overlay or text, just background image */}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },
});
