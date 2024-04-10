import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {LightSensor} from'expo-sensors'
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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Intensity: {light}</Text>
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
      fontSize: 24,
      fontWeight:'bold'
    },
  });