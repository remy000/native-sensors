import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MapScreen from './MapScreen';
import ProximityScreen from './ProximityScreen';
import LightScreen from './LightScreen';
import StepCounter from './StepCounter';
import CompassScreen from './CompassScreen';
import { MaterialIcons,Foundation,Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';


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
      tabBarIcon:()=>(
        <MaterialIcons name="gps-fixed" size={26} color="black" />

      ),
      }}
    
    />
    <Tab.Screen name='Light' component={LightScreen}
     options={{
      tabBarIcon:()=>(
        <Foundation name="lightbulb" size={24} color="black" />

      ),
      }}
    
    />
    <Tab.Screen name='Pedometer' component={StepCounter}
     options={{
      tabBarIcon:()=>(
        <Ionicons name="walk" size={24} color="black" />
      ),
      }}
    
    />
     <Tab.Screen name='compass' component={CompassScreen}
     options={{
      tabBarIcon:()=>(
        <MaterialCommunityIcons name="compass-rose" size={30} color="black" />
      ),
      }}
    
    />
   

    </Tab.Navigator>
  )
}

export default HomeTab

const styles = StyleSheet.create({})