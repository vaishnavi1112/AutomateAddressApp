import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllSavedAddressesScreen = ({ navigation, route }) => {
  const { savedAddresses } = route.params;
  const [allAddresses, setAllAddresses] = useState([]);

  // Load addresses from AsyncStorage when the component mounts
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const savedData = await AsyncStorage.getItem('allAddresses');
        if (savedData) {
          setAllAddresses(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading addresses from AsyncStorage:', error);
      }
    };
    loadAddresses();
  }, []); // This runs only once when the component mounts

  // Save new address to AsyncStorage
  useEffect(() => {
    if (savedAddresses) {
      setAllAddresses((prevAddresses) => {
        const updatedAddresses = [...prevAddresses, savedAddresses];
        // Save updated addresses to AsyncStorage
        AsyncStorage.setItem('allAddresses', JSON.stringify(updatedAddresses));
        return updatedAddresses;
      });
    }
  }, [savedAddresses]); // This only runs when savedAddresses changes

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Saved Addresses</Text>
      </View>
      <View>
        {allAddresses.length > 0 ? (
          <FlatList
            data={allAddresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.addressCard}>
                <Text style={styles.addressField}>House No./Flat No.: {item.houseNumber}</Text>
                <Text style={styles.addressField}>Building Name: {item.buildingName}</Text>
                <Text style={styles.addressField}>Landmark: {item.landmark}</Text>
                <Text style={styles.addressField}>Address Type: {item.addressType}</Text>
                <Text style={styles.addressField}>Receiver's Name: {item.receiverName}</Text>
                <Text style={styles.addressField}>Phone Number: {item.phoneNumber}</Text>
                <Text style={styles.addressField}>Pet's Name: {item.petName}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noAddresses}>No saved addresses available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
  addressCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  addressField: {
    fontSize: 14,
    marginBottom: 8,
  },
  noAddresses: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  backButton:{
    fontSize:20,
  },
});

export default AllSavedAddressesScreen;
