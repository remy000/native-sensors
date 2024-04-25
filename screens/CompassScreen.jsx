import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Magnetometer} from 'expo-sensors'
import { FontAwesome } from '@expo/vector-icons';

const CompassScreen = () => {
  const [heading,setHeading]=useState(0);
  const YOUR_IMAGE_INITIAL_ORIENTATION_OFFSET = 180;
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
            let heading = (angle * 180) / Math.PI;
            heading = (heading + 360) % 360; 
            heading += YOUR_IMAGE_INITIAL_ORIENTATION_OFFSET;
            setHeading(heading);
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
  const getDirection = (heading) => {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const angleRanges = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]; 
    let adjustedHeading = (heading + 360) % 360; 
    for (let i = 0; i < angleRanges.length; i++) {
      if (adjustedHeading < angleRanges[i]) {
        return directions[i];
      }
    }
    return directions[0];
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Heading: {heading.toFixed(2)}°</Text>
      <Text style={styles.directionText}>{getDirection(heading)}</Text>
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