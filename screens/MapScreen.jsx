import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React,{useState,useEffect, useRef} from 'react'
import MapView, {Marker,Polyline} from 'react-native-maps'
import * as Location from 'expo-location'
const MapScreen = () => {
    const [location ,setLocation]=useState(null);
    const [destination,setDestination]=useState(null);
    const [movementStarted, setMovementStarted] = useState(false);
    const polylineRef = useRef(null);
    useEffect(()=>{
        (async()=>{
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('Permission to access location was denied');
              return;
            }
              let loc=await Location.getCurrentPositionAsync({});
              setLocation(loc);
        })();
    },[]);

    const handleMapPress=async(e)=>{
        setDestination({
            latitude:e.nativeEvent.coordinate.latitude,
            longitude:e.nativeEvent.coordinate.longitude,
        })

    }

    const handleLocationChange = (event) => {
        if (!movementStarted) {
            setMovementStarted(true);
        }
        const { latitude, longitude } = event.nativeEvent.coordinate;
        polylineRef.current.setNativeProps({
            coordinates: [
                { latitude: location.coords.latitude, longitude: location.coords.longitude },
                { latitude, longitude },
            ]
        });
    }






  return (
    <View style={styles.container}>
        {
            location&&(
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude:location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                onPress={handleMapPress}
                >
                    {location.coords && <Marker coordinate={location.coords} title='You are here' />}
                    {
                        destination&&(
                            <>
                            <Marker coordinate={destination} title='Destination'/>
                            <Polyline
                            ref={polylineRef}
                            coordinates={[
                                {
                                    latitude:location.coords.latitude,longitude:location.coords.longitude
                                },
                                destination
                            ]}
                            strokeColor={movementStarted ? '#00f' : '#000'}
                            strokeWidth={6}
                            />
                            </>
                        )
                    }

                </MapView>
            )
        }
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });