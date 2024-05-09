import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Pedometer, Accelerometer } from 'expo-sensors';
import { LineChart, ProgressChart } from 'react-native-chart-kit';

const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isMotionDetected, setIsMotionDetected] = useState(false);
  const [stepChartData, setStepChartData] = useState([]);
  const [motionChartData, setMotionChartData] = useState([]);
  const MAX_DATA_POINTS = 5;
  const MAX_DATA = 10;

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const sub = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
        setStepChartData(prevData => [...prevData.slice(-MAX_DATA + 1), result.steps]);
      });
      setSubscription(sub);
    }
  };

  const handleMotionDetection = ({ x, y, z }) => {
    const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    const threshold = 10;
    if (acceleration > threshold) {
      setIsMotionDetected(true);
      alert('Motion Detected');
      setTimeout(() => {
        setIsMotionDetected(false);
      }, 5000);
      setMotionChartData(prevData => [...prevData.slice(-MAX_DATA+ 1), acceleration]);
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
  }, []); // Removed the dependency array

  useEffect(() => {
    const accelerometerSubscription = Accelerometer.addListener(handleMotionDetection);
    return () => {
      accelerometerSubscription.remove();
    };
  }, []);
  const chartConfig = {
    backgroundGradientFrom: '#90EE90',
    backgroundGradientTo: '#50C878',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/walk.gif')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Pedometer: {isPedometerAvailable}</Text>
      <Text style={styles.text}>Walk! And watch this go up: {currentStepCount}</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Step Count Chart</Text>
        {stepChartData.length>0&&(
          <LineChart
          data={{
            labels: Array.from({ length: stepChartData.length }, (_, i) => (i + 1).toString()),
            datasets: [{ data: stepChartData }]
          }}
          width={320}
          height={200}
          chartConfig={chartConfig}
          bezier
        />

        )}
        
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Motion Detection Chart</Text>
        {motionChartData.length>0&&(
            <ProgressChart
            data={{
              labels: Array.from({ length: motionChartData.length }, (_, i) => (i + 1).toString()),
              data: motionChartData.map((value, index) => ({ value })),
            }}
            width={320}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#90EE90',
              backgroundGradientTo: '#50C878',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />

        )}
        
      </View>
      
    </View>
  );
};

export default StepCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
  },
  image: {
    width: 80,
    height: 80,
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});