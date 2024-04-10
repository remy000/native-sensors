import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MapScreen from './MapScreen';
import ProximityScreen from './ProximityScreen';
import LightScreen from './LightScreen';
import StepCounter from './StepCounter';



const Tab=createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
    options={{
        activeTintColor: '#00563B',
        inactiveTintColor: 'gray',
    
       }}
    >
    <Tab.Screen name='Map' component={MapScreen}
     options={{
        headerShown: false,
      }}
    
    />
    <Tab.Screen name='Light' component={LightScreen}
     options={{
        headerShown: false,
      }}
    
    />
    <Tab.Screen name='Pedometer' component={StepCounter}
     options={{
        headerShown: false,
      }}
    
    />
     <Tab.Screen name='proximity' component={ProximityScreen}
     options={{
        headerShown: false,
      }}
    
    />

    </Tab.Navigator>
  )
}

export default HomeTab

const styles = StyleSheet.create({})