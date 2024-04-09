import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './screens/MapScreen';
import HomeTab from './screens/HomeTab';
import {NavigationContainer} from '@react-navigation/native'
export default function App() {
  return (
    <NavigationContainer>
      <HomeTab/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
