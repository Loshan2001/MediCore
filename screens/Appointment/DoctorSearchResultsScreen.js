import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    navigation.navigate('DoctorDetail', { doctor });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffff']}  // Gradient background
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {doctors.map((doctor, index) => (
            <DoctorCard 
              key={index} 
              doctor={doctor} 
              onPress={() => handleDoctorSelect(doctor)} 
            />
          ))}
        </ScrollView>
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
  },
  scrollContent: {
    padding: 20,
  },
});

export default DoctorSearchResultsScreen;
