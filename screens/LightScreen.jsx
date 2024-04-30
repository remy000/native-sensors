import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {LightSensor} from'expo-sensors'
import * as Brightness from 'expo-brightness';
import {LineChart} from 'react-native-chart-kit'

const LightScreen = () => {
    const [light, setLight] = useState(0);
    const [data, setData] = useState({ labels: [], datasets: [{ data: [] }] });
    const MAX_DATA_POINTS = 4;

    useEffect(() => {
      const getLightData = async () => {
        try {
          LightSensor.setUpdateInterval(1000);
          LightSensor.addListener((data) => {
            setLight(data.illuminance);
            handleLightLevelChange(data.illuminance);
            updateChartData(data.illuminance);
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
          // Alert.alert('High Light Detected', 'Consider adjusting lights for comfort');
        }
      };

      const updateChartData = (lightIntensity) => {
        const currentTime = new Date().toLocaleTimeString();
        setData((prevData) => {
          const newLabels = [...prevData.labels, currentTime].slice(-MAX_DATA_POINTS);
          const newData = [...prevData.datasets[0].data, lightIntensity].slice(-MAX_DATA_POINTS);
          return {
            labels: newLabels,
            datasets: [{ data: newData }],
          };
        });
      };




  return (
    <View style={styles.container}>
       <Image
        source={require('../assets/light.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Light Intensity: {light.toFixed(3)}</Text>
     
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 50} 
        height={250}
        yAxisSuffix=" lux"
        chartConfig={{
          backgroundGradientFrom: '#add8e6',
          backgroundGradientTo: '#add8e6',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        bezier
        style={styles.chart}
        xLabelsOffset={-2} 
/>
    </View>
  )
}

export default LightScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'white'
    },
    text: {
      fontSize: 18,
      fontWeight:'bold',
      marginTop:10,
      color:'blue'
    },
    image: {
      width: 200, 
      height: 200,
   },
    chart: {
      marginVertical: 30,
      borderRadius: 20,
    },
  });