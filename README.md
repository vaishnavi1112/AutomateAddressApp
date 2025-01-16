Address Management App
This project is a React Native application designed for managing user addresses. It allows users to add, edit, and manage delivery addresses with precise geolocation and Google Places Autocomplete API integration.
 
Features
•    Map integration for selecting precise delivery locations.
•    Google Places Autocomplete for address search.
•    Manual form entry for detailed address input.
•    Options to set default addresses.
•    CRUD operations for address management (Add/Edit/Delete).
•    Seamless user experience with validation and error handling.
 
Setup Instructions
1. Prerequisites
Before setting up the project, ensure you have the following installed:
•    Node.js: Version >= 14.x
•    npm or yarn
•    React Native CLI: For running the application.
•    Android Studio and/or Xcode: For running the app on emulators or physical devices.
•    Google Maps API Key: Required for map and autocomplete features. You can create one from the Google Cloud Console.
 
2. Clone the Repository
bash
Copy code
git clone <repository-url>
cd <project-folder>
 
3. Install Dependencies
Run the following command to install all required dependencies:
bash
Copy code
npm install
OR
bash
Copy code
yarn install
 
4. Add Google Maps API Key
1.    Create a new API key from the Google Cloud Console.
2.    Enable the following APIs:
o    Google Maps JavaScript API
o    Places API
3.    Add the API key to the project:
o    In the android/app/src/main/AndroidManifest.xml file, add:
xml
Copy code
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY" />
o    For iOS, open AppDelegate.m and configure the API key using the GoogleMaps library (if integrated).
 
5. Add Required Permissions
Android Permissions
Add the following permissions to your AndroidManifest.xml file:
xml
Copy code
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
For Android 12 and above, also include:
xml
Copy code
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
Ensure you handle runtime permissions in your app using react-native-permissions or a similar library.
iOS Permissions
Add the following keys to your Info.plist file to request location permissions:
xml
Copy code
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need access to your location to show you relevant addresses on the map.</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>We need access to your location to improve user experience.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need access to your location to show you precise addresses.</string>
For MapKit (if used):
xml
Copy code
<key>NSLocationTemporaryUsageDescriptionDictionary</key>
<dict>
    <key>MapKitUsage</key>
    <string>We need your location to provide mapping features.</string>
</dict>
 
6. Run the Application
For Android:
bash
Copy code
npx react-native run-android
For iOS:
1.    Navigate to the iOS folder:
bash
Copy code
cd ios
pod install
cd ..
2.    Run:
bash
Copy code
npx react-native run-ios
 
7. Environment Variables
Store sensitive keys like the API key in a .env file for better security. Use a library like react-native-dotenv for accessing environment variables.
Example .env file:
makefile
Copy code
GOOGLE_MAPS_API_KEY=YOUR_API_KEY
Update the code to read the API key from .env:
javascript
Copy code
import { GOOGLE_MAPS_API_KEY } from '@env';

<GooglePlacesAutocomplete
  query={{
    key: GOOGLE_MAPS_API_KEY,
    language: 'en',
  }}
/>
 
Usage
1.    Open the app and click "Add Address".
2.    Search for a location using the search bar or navigate the map.
3.    Fill in the address details manually if needed.
4.    Save the address and view it in the address list.
 
Troubleshooting
1.    API Errors:
o    Ensure the correct API key is configured and enabled in the Google Cloud Console.
o    Check that billing is enabled on your Google Cloud account.
2.    Location Permissions:
o    Ensure location permissions are enabled on your device.
3.    Dependency Issues:
o    Run npm install or yarn install to ensure all dependencies are installed.
o    For iOS, always run pod install after adding new dependencies.
 
Future Improvements
•    Offline support for address management.
•    Localization support for multiple languages.
 
License
This project is licensed under the MIT License.
 
Contributions
Feel free to fork the repository and contribute to the project. Open a pull request for any feature or bug fix you’d like to add!


