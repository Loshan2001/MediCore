import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HospitalSearchResultsScreen = ({ route }) => {
  const { hospital } = route.params;  // Extract passed hospital data
  const navigation = useNavigation();  // Use navigation to move between screens

  return (
    <View style={styles.container}>
      <Image source={{ uri: hospital.imageUrl }} style={styles.hospitalImage} />
      <Text style={styles.hospitalName}>{hospital.name}</Text>
      <Text style={styles.hospitalLocation}>{hospital.location}</Text>
      <Text style={styles.hospitalPhone}>📞 {hospital.phone}</Text>
      <Text style={styles.hospitalCity}>City: {hospital.city}</Text>

      {/* "Book" Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('AppointmentConfirmation', { hospital })}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  hospitalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hospitalLocation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  hospitalPhone: {
    fontSize: 16,
    color: '#555',
  },
  hospitalCity: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  bookButton: {
    marginTop: 30,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HospitalSearchResultsScreen;
