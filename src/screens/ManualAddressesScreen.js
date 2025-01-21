import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ManualAddressScreen = ({ navigation,route }) => {
  const [addresses, setAddresses] = React.useState(route.params?.newAddress ? [route.params.newAddress] : []);
  console.log(addresses)
  return (
    <SafeAreaView style={styles.container}>
    <View >
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
             <Text>{item.receiverName}, {item.receiverPhone}</Text>
            <Text>{item.houseNo}, {item.buildingNo}, {item.roadNo}</Text>
            <Text>{item.city}, {item.state}, {item.pincode}</Text>
          </View>
        )}
      />
     <TouchableOpacity 
             style={styles.button}
             onPress={() => navigation.navigate('AddAddressScreen')}
           >
             <Text style={styles.buttonText}>Add New address</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent:'center'
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    height:500,
    justifyContent:'center'
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

export default ManualAddressScreen;