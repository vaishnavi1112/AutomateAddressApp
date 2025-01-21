import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import MapView, { Marker } from 'react-native-maps';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import LocationPermissionModal from './LocationPermissionModel';

const MapScreen = ({ navigation, route }) => {
  const { enableLocation, details } = route.params || {};

  const [selectedPlace,setSelectedPlace]=useState(details?.formatted_address);
  const [locationName,setLocationName]=useState(details?.name);
  const [region, setRegion] = useState({
    latitude:  details?.geometry?.location?.lat, 
    longitude:  details?.geometry?.location?.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [markerCoords, setMarkerCoords] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
  });

  const handleLocationSelect = (details) => {
    if (details?.geometry?.location) {
      const { lat, lng } = details.geometry.location;
      setRegion({
        ...region,
        latitude: lat,
        longitude: lng,
      });
      setMarkerCoords({
        latitude: lat,
        longitude: lng,
      });
    }
  };
  const [showPermissionModal, setShowPermissionModal] = useState(false);
    const handleLocationEnable = () => {
      setShowPermissionModal(true);
    };
  
    const handleGoToSettings = () => {
      setShowPermissionModal(false);
      Linking.openSettings();
    };

  const useCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        console.log("position",position)
        const { latitude, longitude } = position.coords;
  
        // Update region and marker coordinates
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        setMarkerCoords({
          latitude,
          longitude,
        });
  
        // Fetch address using reverse geocoding
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAasxoqliptkWaRVgUnQ08nBi0OiPktvEw`
          );
          const data = await response.json();
  
          if (data?.results?.length > 0) {
            const address = data.results[0]?.formatted_address;
            setSelectedPlace(address);
            setLocationName(data.results[0]?.formatted_address.split(",")[0]);
            console.log("Address:", address,data.results[0].long_name);
            Alert.alert("Current Location", address); 
          } else {
            console.error("No address found for the coordinates.");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      },
      (error) => {
        Alert.alert("Error", "Unable to fetch your location. Please try again.");
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Text style={styles.backButton}>←</Text>
       </TouchableOpacity>
       <Text style={styles.headerTitle}>Confirm Location</Text>
      </View>

      <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search for an address"
        fetchDetails={true}
        onPress={(data, details) => {
          console.log("detauis",details)
          setLocationName(details?.name)
          setSelectedPlace(details?.formatted_address)
          handleLocationSelect(details);
        }}
         query={{
         key: 'AIzaSyAasxoqliptkWaRVgUnQ08nBi0OiPktvEw',
          language: 'en',
       }}
      />
  </View>
   {/* Location Permission Banner */}
          {!enableLocation &&(
            <View style={styles.locationBanner}>
            <View style={styles.locationIconContainer}>
             <Icon 
                               name="map-marker" 
                               size={24} 
                               color="#4CAF50"
                             />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Use current location</Text>
              <Text style={styles.locationSubtitle}>Enable Permissions for a better experience </Text>
            </View>
            <TouchableOpacity 
              style={styles.enableButton}
              onPress={handleLocationEnable}
            >
              <Text style={styles.enableButtonText}>Enable</Text>
            </TouchableOpacity>
          </View>
          )

          }

      <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={markerCoords} />
      </MapView>
      {/* Location Pin Label */}
      <View style={styles.pinLabel}>
          <Text style={styles.pinLabelTitle}>Order will be delivered here</Text>
          <Text style={styles.pinLabelSubtitle}>Move the pin to change location</Text>
        </View>

      </View>
      <View style={styles.locationInfo}>
      <TouchableOpacity style={styles.currentLocationButton} onPress={enableLocation ? useCurrentLocation : handleLocationEnable}>
          {/* <Ionicons name="locate" size={16} color="#FF6B3F" /> */}
          <Text style={styles.currentLocationText}>Use current location</Text>
        </TouchableOpacity>
        <Text style={styles.locationTitle}>{locationName}</Text>
        <Text style={styles.locationAddress}>
         {selectedPlace}
        </Text>
      </View>
       <TouchableOpacity style={styles.confirmButton}
       onPress={() => navigation.navigate('ConfirmLocationScreen',{locationName:locationName,selectedPlace:selectedPlace})} >
      <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
      <LocationPermissionModal
          visible={showPermissionModal}
          onClose={() => setShowPermissionModal(false)}
          onGoToSettings={handleGoToSettings}
        />
  </SafeAreaView>
  );
};

export default MapScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map:{
    flex:1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  locationInfo: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
    position: 'absolute',
    bottom: 85, 
    left: 0,
    right: 0,
  },
  backButton:{
    fontSize:20,
  },
  enableButton: {
    backgroundColor: '#E86C2C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 16,
  },
  mapPreview: {
    height: 150,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EC',
    padding: 14,
    marginTop: 50,
    borderRadius: 8,
  },
  locationIconContainer: {
    marginRight: 12,
  },
  locationPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b3f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetails: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  form: {
    padding: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  enableButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  addressTypes: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  addressType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 12,
  },
  addressTypeActive: {
    backgroundColor: '#ff6b3f',
    borderColor: '#ff6b3f',
  },
  addressTypeText: {
    marginLeft: 4,
    color: '#666',
  },
  addressTypeTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#ff6b3f',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  pinLabel: {
    position: 'absolute',
    top: '33%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    borderRadius: 8,
  },
  pinLabelTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  pinLabelSubtitle: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:'#ff6b3f',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentLocationText: {
    color: '#FF6B3F',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  changeButton: {
    color: '#FF6B3F',
    fontSize: 14,
  },
  locationAddress: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 28,
  },
  confirmButton: {
    backgroundColor: '#FF6B3F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    position: 'absolute',
    top: '15%',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex:2
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

