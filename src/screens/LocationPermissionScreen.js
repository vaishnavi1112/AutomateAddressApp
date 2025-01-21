import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import "react-native-get-random-values";
const LocationPermissionScreen = ({ navigation }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Request permission when component mounts
  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        // Check if permission is already granted
        const result = await check(
          Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );
        
        // If permission is granted, navigate to the next screen
        if (result === RESULTS.GRANTED) {
          setPermissionStatus('Permission granted');
          navigation.navigate('AddressSearchScreen',{enableLocation:true});
        } else {
          // Request permission if not granted
          const requestResult = await request(
            Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          );
          navigation.navigate('AddressSearchScreen',{enableLocation:false});
          
          if (requestResult === RESULTS.GRANTED) {
            setPermissionStatus('Permission granted');
             navigation.navigate('MapScreen');
          } else if (requestResult === RESULTS.DENIED) {
            setPermissionStatus('Permission denied');
          } else if (requestResult === RESULTS.BLOCKED) {
            setPermissionStatus('Permission blocked');
          }
        }
      } catch (error) {
        console.warn('Permission request failed:', error);
        setPermissionStatus('Permission request failed');
      }   
      setLoading(false); 
    };

    checkAndRequestPermission();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Requesting location permission...</Text>
      ) : (
        <Text>{permissionStatus}</Text>
      )}
      {permissionStatus === 'Permission blocked' && (
        <Button
          title="Open Settings"
          onPress={() => {
            // Open app settings on the device
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              // Android settings can be opened here if needed
              // Linking.openURL('package:com.yourapp');
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationPermissionScreen;
