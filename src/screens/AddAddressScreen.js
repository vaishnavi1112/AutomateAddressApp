import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const AddAddressScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('LocationPermissionScreen')}
      >
        <Text style={styles.buttonText}>Add address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FF6B3F',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddAddressScreen;