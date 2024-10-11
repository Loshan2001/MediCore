import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  const confirmAppointment = () => {
    navigation.navigate('AppointmentConfirmation', { doctor });
  };

  // Format the date (assuming appointmentDate is a string or Date object)
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Adding leading zero if needed
    const day = (`0${d.getDate()}`).slice(-2); // Adding leading zero if needed
    return `${year}-${month}-${day}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffffff']} // Gradient background
        style={styles.gradientBackground}
      >
        {/* Header with back button and icons */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{doctor.doctorName}</Text>
          <Icon name="notifications-outline" size={24} color="#fff" />
        </View>

        {/* Doctor's profile image */}
        <Image source={{ uri: 'https://www.freeiconspng.com/uploads/doctors-transparent-icon-10.png' }} style={styles.image} />

        {/* Doctor's details */}
        <Text style={styles.name}>{doctor.doctorName}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.activeAppointments}>Maximum Appointments: {doctor.maxPatients}</Text>

        {/* Appointment Details */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Icon name="calendar-outline" size={18} color="#333" />
            <Text style={styles.infoText}>{formatDate(doctor.appointmentDate)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="location-outline" size={18} color="#333" />
            <Text style={styles.infoText}>{doctor.hospitalName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="time-outline" size={18} color="#333" />
            <Text style={styles.infoText}>{doctor.appointmentTimeSlot}</Text>
          </View>
        </View>

        {/* Confirm Appointment Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={confirmAppointment}>
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  specialization: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  activeAppointments: {
    fontSize: 14,
    color: '#005596',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default DoctorDetailScreen;
