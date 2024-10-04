import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For back, calendar, and clock icons

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  const confirmAppointment = () => {
    // Navigate to AppointmentConfirmationScreen
    navigation.navigate('AppointmentConfirmation', { doctor });
  };

  return (
    <View style={styles.container}>
      {/* Header with back button and icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{doctor.name}</Text>
        <Icon name="notifications-outline" size={24} color="#000" />
      </View>

      {/* Doctor's profile image */}
      <Image source={{ uri: doctor.image }} style={styles.image} />

      {/* Doctor's details */}
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialization}>{doctor.specialization}</Text>
      <Text style={styles.activeAppointments}>Active Appointments: {doctor.activeAppointments}</Text>

      {/* Appointment Details */}
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Icon name="calendar-outline" size={18} color="#333" />
          <Text style={styles.infoText}>20 August 2024</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-outline" size={18} color="#333" />
          <Text style={styles.infoText}>Hemas Wattala</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="time-outline" size={18} color="#333" />
          <Text style={styles.infoText}>2.00pm - 4.00pm</Text>
        </View>
      </View>

      {/* Confirm Appointment Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmAppointment}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>

      {/* Bottom Tab Placeholder */}
      {/* <View style={styles.bottomTab}>
        <Icon name="home-outline" size={28} color="#333" />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Icon name="bookmark-outline" size={28} color="#333" />
        <Icon name="person-outline" size={28} color="#333" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialization: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
  },
  activeAppointments: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#333',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#397b9c',
    padding: 10,
    borderRadius: 50,
  },
});

export default DoctorDetailScreen;
