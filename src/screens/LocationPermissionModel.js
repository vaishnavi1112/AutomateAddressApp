import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocationPermissionModal = ({ visible, onClose, onGoToSettings }) => {
  const steps = [
    'Choose "Separate"',
    'Go to location',
    'Click on "While using app"',
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Icon 
              name="map-marker" 
              size={24} 
              color="#666"
            />
            <Text style={styles.headerText}>Enable location permission</Text>
          </View>
          <Text style={styles.subText}>
            Please enable location permissions for a better experience
          </Text>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <Icon 
                  name="check-circle" 
                  size={24} 
                  color="#4CAF50"
                />
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={onGoToSettings}
          >
            <Text style={styles.settingsButtonText}>Go to settings</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  subText: {
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
});

export default LocationPermissionModal;
