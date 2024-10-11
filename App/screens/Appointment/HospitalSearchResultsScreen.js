import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const HospitalSearchResultsScreen = ({ route }) => {
  const { hospital, doctorName } = route.params; // Get hospital and doctorName from route params
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffffff']}
        style={styles.container}
      >
        {/* Hospital Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://png.pngtree.com/png-vector/20240119/ourmid/pngtree-city-hospital-elements-png-image_11420665.png" }} 
            style={styles.hospitalImage} 
          />
        </View>

     
        <Text style={styles.hospitalName}>{hospital.name}</Text>
        <Text style={styles.hospitalLocation}>📍 {hospital.location}</Text>
        <Text style={styles.hospitalPhone}>📞 {hospital.phone}</Text>
        <Text style={styles.hospitalCity}>City: {hospital.city}</Text>
        <Text style={styles.doctorName}>👨‍⚕️ Doctor: {doctorName}</Text> 

        {/* "Book" Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('AppointmentConfirmation', { hospital })}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  hospitalImage: {
    width: 220,
    height: 220,
    borderRadius: 15,
  },
  hospitalName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  hospitalLocation: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  hospitalPhone: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  hospitalCity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  bookButton: {
    marginTop: 30,
    backgroundColor: '#005596',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorName: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HospitalSearchResultsScreen;
