import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import FacilityDetailScreen from './screens/FacilityDetailScreen';
import ProfileScreen from './screens/ProfileScreen'; // Added Profile Screen
import UploadImg from './screens/UploadImg';

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  FacilityDetail: { name: string };
  Profile: undefined; // Added Profile Screen
  UploadImg: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Occupancy Overview' }} />
        <Stack.Screen
          name="FacilityDetail"
          component={FacilityDetailScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="UploadImg" component={UploadImg} options={{ title: 'Image Upload' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
