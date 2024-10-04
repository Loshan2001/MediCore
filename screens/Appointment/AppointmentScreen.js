import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For vector icons

const AppointmentScreen = ({ navigation }) => {
  const [doctorName, setDoctorName] = useState('Dr. Sanjeewa Garusinghe');
  const [hospitalName, setHospitalName] = useState('Hemas Hospital, Wattala');
  const [specialization, setSpecialization] = useState('Neurosurgeon');
  const [date, setDate] = useState('');

  const searchAppointment = () => {
    // Navigate to Doctor Search Results
    navigation.navigate('DoctorSearchResults');
  };

  const searchHospital = () => {
    // Navigate to HospitalDetailScreen
    navigation.navigate('HospitalDetail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>

      <TextInput
        placeholder="Doctor Name"
        style={styles.input}
        value={doctorName}
        onChangeText={setDoctorName}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Hospital Name"
        style={styles.input}
        value={hospitalName}
        onChangeText={setHospitalName}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Specialization"
        style={styles.input}
        value={specialization}
        onChangeText={setSpecialization}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Pick Date"
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#999"
      />

      {/* Search Button for Doctor */}
      <TouchableOpacity style={styles.searchButton} onPress={searchAppointment}>
        <Text style={styles.searchButtonText}>Search</Text>
        <Ionicons name="search" size={18} color="#fff" style={styles.searchIcon} />
      </TouchableOpacity> 

      {/* Search Button for Hospital */}
      <View style={{ marginTop: 10 }} />
      <TouchableOpacity style={styles.searchButton} onPress={searchHospital}>
        <Text style={styles.searchButtonText}>Search Hospital</Text>
        <Ionicons name="search" size={18} color="#fff" style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: '#333',
    fontSize: 16,
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a718d',
    paddingVertical: 15,
    borderRadius: 10,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 5,
  },
});

export default AppointmentScreen;
