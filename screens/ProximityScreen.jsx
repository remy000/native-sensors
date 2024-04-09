import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Accelerometer} from 'expo-sensors'
import * as ScreenOrientation from 'expo-screen-orientation'
const ProximityScreen = () => {
    const [isNearby, setIsNearby] = useState(false);

    useEffect(()=>{
        const subscription=Accelerometer.addListener((accelerometerData)=>{
            const { x, y, z } = accelerometerData;
            const proximityThreshold = 0.2; // Adjust this threshold as needed
            const isNear = Math.abs(x) < proximityThreshold && Math.abs(y) < proximityThreshold && Math.abs(z) < proximityThreshold;
            setIsNearby(isNear);
          console.log("isNear", isNearby)
        });
        return()=>{
            subscription.remove();
        }
        
    },[]);
    useEffect(() => {
        const setScreenOrientation = async () => {
            console.log(isNearby)
          if (isNearby) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          } else {
            await ScreenOrientation.unlockAsync();
          }
        };
    
        setScreenOrientation();
      }, [isNearby]);
  return (
    <View style={{ flex: 1 }} />
  )
}

export default ProximityScreen

const styles = StyleSheet.create({})