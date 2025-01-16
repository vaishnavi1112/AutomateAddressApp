import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddAddressScreen from './src/screens/AddAddressScreen';
import LocationPermissionScreen from './src/screens/LocationPermissionScreen';
import AddressSearchScreen from './src/screens/AddressSearchScreen';
import MapScreen from './src/screens/MapScreen';
import ManualEntryScreen from './src/screens/ManualEntryScreen';
import SavedAddressesScreen from './src/screens/ManualAddressesScreen';
import ConfirmLocationScreen from './src/screens/ConfirmLocationScreen';
import AddNewAddressScreen from './src/screens/AddNewAddress';
import AllSavedAddressesScreen from './src/screens/AllSavedAddressScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddAddressScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddNewAddressScreen" component={AddNewAddressScreen} />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
        <Stack.Screen name="AddressSearchScreen" component={AddressSearchScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ManualEntryScreen" component={ManualEntryScreen} />
        <Stack.Screen name="SavedAddressesScreen" component={SavedAddressesScreen} />
        <Stack.Screen name="ConfirmLocationScreen" component={ConfirmLocationScreen} />
        <Stack.Screen name="AllSavedAddressesScreen" component={AllSavedAddressesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
