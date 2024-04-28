import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {LightSensor} from'expo-sensors'
import Svg, { Circle, Path } from 'react-native-svg';
import * as Brightness from 'expo-brightness';


const LightScreen = () => {
    const [light, setLight] = useState(null);

    useEffect(() => {
      const getLightData = async () => {
        try {
          LightSensor.setUpdateInterval(1000); // Update interval in milliseconds
          LightSensor.addListener((data) => {
            setLight(data.illuminance);
            handleLightLevelChange(data.illuminance);
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
    useEffect(() => {
      (async () => {
        const { status } = await Brightness.requestPermissionsAsync();
        if (status === 'granted') {
          Brightness.setSystemBrightnessAsync(1);
        }
      })();
    }, []);
      const handleLightLevelChange = (brightness) => {
        if (brightness < 100) {
          Brightness.setSystemBrightnessAsync(brightness/10);
          // Alert.alert('Low Light Detected', 'Consider turning on lights for better visibility');
        } else if (brightness > 1000) {
          Brightness.setSystemBrightnessAsync(1);
          // Increase lights or trigger high light notification
          // Alert.alert('High Light Detected', 'Consider adjusting lights for comfort');
        }
      };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Intensity: {light}</Text>
      <Image
        source={require('../assets/fire.jpg')} // Change the path to your image file
        style={[styles.image, { opacity: light ? light / 1000 : 0 }]}
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