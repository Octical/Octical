import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { useState, useEffect } from 'react';
import { d } from '@vercel/blob/dist/create-folder-DGBfYPet.cjs';

type FacilityDetailScreenRouteProp = RouteProp<RootStackParamList, 'FacilityDetail'>;

type Props = {
  route: FacilityDetailScreenRouteProp;
};

export default function FacilityDetailScreen({ route }: Props) {
  const { name } = route.params;
  const place = useState('gym'); //Default Gym here
  const [data, setData] = useState({"people" : 0, "time" : 0}); //Default 0 here

  useEffect(() => {

    try {
      async function fetchData() {
        console.log("fetching data")
        fetch(
          `http://127.0.0.1:5000/${name.toLocaleLowerCase()}`,
          {
            method: 'GET',
          })
          .then((response) => response.json())
          .then((data) => 
            setData(data));
        }
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    
  }, []);

  console.log(data)

  return (
    <ImageBackground source={require('../assets/detail-background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.occupancy}>Occupancy: {data.people} / 50</Text> 
        <Text style={styles.status}>Status: Busy     Latest Refresh: {data.time} </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  occupancy: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  status: { // Added the 'status' style to fix the error
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
