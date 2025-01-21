import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Simple icon component using unicode symbols or basic shapes
const SimpleIcon = ({ name, size = 20, color = '#000' }) => {
  const icons = {
    'arrow-left': '←',
    'map-marker': '📍',
    'silverware': '🍽️',
    'home': '🏠',
    'briefcase': '💼',
    'dots': '•••',
  };

  return (
    <Text style={{ fontSize: size, color: color }}>
      {icons[name] || '•'}
    </Text>
  );
};

const LocationConfirmScreen = ({ navigation,route }) => {
  const {locationName,selectedPlace}=route.params;
  const [addressType, setAddressType] = useState('');
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SimpleIcon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Location</Text>
        </View>

        {/* Map Preview */}
        <View style={styles.mapPreview}>
          {/* Map would go here */}
          <View style={styles.locationPin}>
            <SimpleIcon name="silverware" size={24} color="#fff" />
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.locationDetails}>
          <View style={styles.locationHeader}>
            <SimpleIcon name="map-marker" size={20} color="#666" />
            <Text style={styles.locationTitle}>{selectedPlace}</Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.locationAddress}>
            {locationName}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formLabel}>Enter complete address</Text> 
          <TextInput
            style={styles.input}
            placeholder="House No./Flat No."
            placeholderTextColor="#999"
          />        
          <TextInput
            style={styles.input}
            placeholder="Building name"
            placeholderTextColor="#999"
          />       
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            placeholderTextColor="#999"
          />

          <Text style={styles.formLabel}>Save address as</Text>
          
          <View style={styles.addressTypes}>
            <TouchableOpacity
              style={[
                styles.addressType,
                addressType === 'home' && styles.addressTypeActive,
              ]}
              onPress={() => setAddressType('home')}>
              <SimpleIcon name="home" size={16} color={addressType === 'home' ? '#fff' : '#666'} />
              <Text style={[
                styles.addressTypeText,
                addressType === 'home' && styles.addressTypeTextActive
              ]}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.addressType,
                addressType === 'office' && styles.addressTypeActive,
              ]}
              onPress={() => setAddressType('office')}>
              <SimpleIcon name="briefcase" size={16} color={addressType === 'office' ? '#fff' : '#666'} />
              <Text style={[
                styles.addressTypeText,
                addressType === 'office' && styles.addressTypeTextActive
              ]}>Office</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.addressType,
                addressType === 'others' && styles.addressTypeActive,
              ]}
              onPress={() => setAddressType('others')}>
              <SimpleIcon name="dots" size={16} color={addressType === 'others' ? '#fff' : '#666'} />
              <Text style={[
                styles.addressTypeText,
                addressType === 'others' && styles.addressTypeTextActive
              ]}>Others</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Receiver's name"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Receiver's phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Pet's name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  changeButton: {
    color: '#ff6b3f',
    fontSize: 14,
  },
  locationAddress: {
    color: '#666',
    marginLeft: 28,
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
});

export default LocationConfirmScreen;