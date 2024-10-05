import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import Icon from 'react-native-vector-icons/Ionicons'; 

const AppointmentConfirmationScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffffff']} // Gradient from blue to white
        style={styles.gradientBackground}
      >
        {/* Success Icon and Message */}
        <View style={styles.confirmationBox}>
          <View style={styles.iconContainer}>
            <Icon name="checkmark-circle-outline" size={70} color="green" />
          </View>
          <Text style={styles.successMessage}>Channelling Confirmed</Text>
          <Text style={styles.confirmationText}>
            Thank you for channelling the doctor with us, your information is safe and secure. 
            <Text style={styles.moreText}> see more...</Text>
          </Text>
          <Text style={styles.appointmentNo}>Appointment No #24</Text>
        </View>

        {/* Go Back to Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.homeButtonText}>Go Back to Home</Text>
          <Icon name="home-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  confirmationBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#d4f8e8',
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  confirmationText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  moreText: {
    color: '#397b9c',
    fontWeight: 'bold',
  },
  appointmentNo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005596',
    backgroundColor: '#eaf3f7',
    padding: 10,
    borderRadius: 12,
    textAlign: 'center',
    width: '100%',
    marginTop: 10,
  },
  homeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
});

export default AppointmentConfirmationScreen;
