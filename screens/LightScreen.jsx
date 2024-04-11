import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {LightSensor} from'expo-sensors'
import Svg, { Circle, Path } from 'react-native-svg';
const LightScreen = () => {
    const [light, setLight] = useState(null);
    useEffect(() => {
        const getLightData = async () => {
          try {
            LightSensor.setUpdateInterval(1000); // Update interval in milliseconds
            LightSensor.addListener((data) => {
              setLight(data.illuminance);
            });
          } catch (error) {
            console.log('Light sensor is not available on this device');
          }
        };
    
        getLightData();
    
        return () => {
          LightSensor.removeAllListeners();
        };
      }, []);
      const opacity = light ? light / 1000 : 0;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Intensity: {light}</Text>
      <Image
        source={require('../assets/fire.jpg')} // Change the path to your image file
        style={[styles.image, { opacity }]}
        resizeMode="contain"
      />
    </View>
  )
}

export default LightScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 18,
      fontWeight:'bold'
    },
    image: {
      width: 100, // Adjust the size of the image as needed
      height: 200,
    },
  });