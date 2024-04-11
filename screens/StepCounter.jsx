import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Pedometer} from 'expo-sensors'

const StepCounter = () => {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedometer: {isPedometerAvailable}</Text>
      <Text style={styles.text}>Walk! And watch this go up: {currentStepCount}</Text>
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
      },
      text:{
        fontSize:24
      }
})