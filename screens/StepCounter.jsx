import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Pedometer,Accelerometer} from 'expo-sensors'

const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isMotionDetected, setIsMotionDetected] = useState(false);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const sub = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
      setSubscription(sub);
    }
  };
  const handleMotionDetection = ({ x, y, z }) => {
    const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    const threshold = 2;
    if (acceleration > threshold) {
      setIsMotionDetected(true);
      alert("Motion Detected");
      setTimeout(() => {
        setIsMotionDetected(false);
      }, 5000); 
    }
  };

  useEffect(() => {
    const setupSubscription = async () => {
      const sub = await subscribe();
      return sub;
    };

    const cleanup = () => {
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };

    setupSubscription();

    return cleanup;
  }, []);

  useEffect(() => {
    const accelerometerSubscription = Accelerometer.addListener(handleMotionDetection);
    return () => {
      accelerometerSubscription.remove();
    };
  }, []);

   return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedometer: {isPedometerAvailable}</Text>
      <Text style={styles.text}>Walk! And watch this go up: {currentStepCount}</Text>
      <Image
        source={require('../assets/walk.gif')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

export default StepCounter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
      },
      text:{
        fontSize:24,
        lineHeight:30,
        fontWeight:'bold'
      },
      image: {
        marginTop:50,
        width: 200,
        height: 200,
      },
})