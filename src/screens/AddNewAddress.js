import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from "@react-native-community/checkbox";

const AddressForm = ({navigation,route}) => {
  const {enableLocation} = route.params;
  const [formData, setFormData] = useState({
    pincode: '',
    city: '',
    state: '',
    houseNo: '',
    buildingNo: '',
    roadName: '',
    receiverName: '',
    receiverPhone: '',
    isDefault: false,
  });
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const handleLocationEnable = () => {
    setShowPermissionModal(true);
  };

  const handleGoToSettings = () => {
    setShowPermissionModal(false);
    Linking.openSettings();
  };

  

  const handleSubmit = () => {
    navigation.navigate("ManualAddressScreen",{newAddress:formData})
    console.log('Form data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                     <Text style={styles.backButton}>←</Text>
                   </TouchableOpacity>
          <Text style={styles.headerText}>Manual Address</Text>
        </View>

        {/* Location Permission Banner */}
       {!enableLocation && (
         <View style={styles.locationBanner}>
         <View style={styles.locationIconContainer}>
          <Icon 
                            name="map-marker" 
                            size={24} 
                            color="#4CAF50"
                          />
         </View>
         <View style={styles.locationTextContainer}>
           <Text style={styles.locationTitle}>Enable location permission</Text>
           <Text style={styles.locationSubtitle}>Your precise location helps us deliver on time</Text>
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


        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            value={formData.pincode}
            onChangeText={(text) => setFormData({...formData, pincode: text})}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={formData.city}
              onChangeText={(text) => setFormData({...formData, city: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => setFormData({...formData, state: text})}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="House/Flat no."
            value={formData.houseNo}
            onChangeText={(text) => setFormData({...formData, houseNo: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Building no."
            value={formData.buildingNo}
            onChangeText={(text) => setFormData({...formData, buildingNo: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Road Name/ Area/ Colony"
            value={formData.roadName}
            onChangeText={(text) => setFormData({...formData, roadName: text})}
          />

          <Text style={[styles.sectionTitle, styles.receiverTitle]}>Receiver's details</Text>

          <TextInput
            style={styles.input}
            placeholder="Receiver's name"
            value={formData.receiverName}
            onChangeText={(text) => setFormData({...formData, receiverName: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Receiver's phone number"
            value={formData.receiverPhone}
            onChangeText={(text) => setFormData({...formData, receiverPhone: text})}
            keyboardType="phone-pad"
          />

          <View style={styles.checkboxContainer}>
            <CheckBox 
              status={formData.isDefault ? 'checked' : 'unchecked'}
              onPress={() => setFormData({...formData, isDefault: !formData.isDefault})}
            />
            <Text style={styles.checkboxLabel}>Set as default address</Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save address</Text>
          </TouchableOpacity>

        </View>    
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
      borderBottomColor: '#e0e0e0',
    },
    headerText: {
      fontSize: 18,
      fontWeight: '500',
      marginLeft: 16,
    },
    backButton:{
      fontSize:20,
    },
    locationBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF5EC',
      padding: 16,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 8,
    },
    locationIconContainer: {
      marginRight: 12,
    },
    locationTextContainer: {
      flex: 1,
    },
    locationTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    locationSubtitle: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
    },
    enableButton: {
      backgroundColor: '#E86C2C',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    enableButtonText: {
      color: '#fff',
      fontWeight: '500',
    },
    formContainer: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 16,
      color: '#333',
    },
    receiverTitle: {
      marginTop: 24,
    },
    input: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfInput: {
      width: '48%',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    checkboxLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: '#333',
    },
    submitButton: {
      backgroundColor: '#E86C2C',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 24,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    // Modal specific styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      width: '90%',
      maxWidth: 400,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    modalHeaderText: {
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
      color: '#333',
    },
    modalSubText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 20,
    },
    stepsContainer: {
      marginVertical: 16,
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    stepText: {
      marginLeft: 12,
      fontSize: 16,
      color: '#333',
    },
    settingsButton: {
      backgroundColor: '#E86C2C',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    settingsButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
 
    inputLabel: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    errorText: {
      color: '#ff0000',
      fontSize: 12,
      marginTop: 4,
    },
    placeholderText: {
      color: '#999',
    },
    disabledInput: {
      backgroundColor: '#f5f5f5',
      color: '#999',
    },
    focusedInput: {
      borderColor: '#E86C2C',
    },
   
    divider: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 16,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  });
  
  export default AddressForm;