import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Magnetometer} from 'expo-sensors'
import { FontAwesome } from '@expo/vector-icons';

const CompassScreen = () => {
  const [heading,setHeading]=useState(0);
  useEffect(()=>{
    const subscribe = () => {
      Magnetometer.isAvailableAsync().then((isAvailable) => {
        if (!isAvailable) {
          console.log('Magnetometer is not available on this device');
          return;
        }

        const subscription = Magnetometer.addListener((result) => {
          if (result) {
            const { x, y } = result;
            const angle = Math.atan2(y, x);
            const heading = (angle * 180) / Math.PI;
            setHeading(heading >= 0 ? heading : 360 + heading); 
          }
        });

        return () => {
          subscription.remove();
        };
      });
    };

    subscribe();

    return () => {};
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Heading: {heading.toFixed(2)}°</Text>
      <Image
        source={require('../assets/compass3.webp')} // Change the path to your image file
        style={[styles.image, { transform: [{ rotate: `${heading}deg` }] }]}
        resizeMode="contain"
      />
    </View>
  );
  
}

export default CompassScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  text: {
    fontSize: 24,
  },
  image: {
    marginTop:50,
    width: 200, // Adjust the size of the image as needed
    height: 200,
  },
})