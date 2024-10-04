// src/screens/DoctorSearchResultsScreen.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DoctorCard from '../../components/DoctorCard';

const DoctorSearchResultsScreen = ({ navigation }) => {
  const doctors = [
    { 
      name: 'Dr. Aneesha De Silva', 
      specialization: 'Neurosurgeon', 
      hospital: 'Hemas Wattala', 
      image: 'https://via.placeholder.com/60' 
    },
    { 
      name: 'Dr. Nuran Senanayake', 
      specialization: 'General Physician', 
      hospital: 'Lanka Hospital', 
      image: 'https://via.placeholder.com/60' 
    },
  ];

  const handleDoctorSelect = (doctor) => {
    // Navigate to DoctorDetailScreen and pass the selected doctor
    navigation.navigate('DoctorDetail', { doctor });
  };

  return (
    <ScrollView style={styles.container}>
      {doctors.map((doctor, index) => (
        <DoctorCard 
          key={index} 
          doctor={doctor} 
          onPress={() => handleDoctorSelect(doctor)} 
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
});

export default DoctorSearchResultsScreen;
