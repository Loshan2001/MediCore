import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { Picker } from '@react-native-picker/picker'; 

const AppointmentScreen = ({ navigation }) => {
  const [searchType, setSearchType] = useState('doctor'); 
  const [doctorName, setDoctorName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [doctors, setDoctors] = useState([]); 
  const [hospitals, setHospitals] = useState([]); 
  const [loadingDoctors, setLoadingDoctors] = useState(false); 
  const [loadingHospitals, setLoadingHospitals] = useState(false); 

 
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        const response = await fetch('http://localhost:5001/api/doctor/getAll');
        const data = await response.json();
        const doctorList = data.filter(doc => doc.userType === 'doctor'); 
        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        Alert.alert('Error', 'Could not load doctors.');
      } finally {
        setLoadingDoctors(false);
      }
    };

    const fetchHospitals = async () => {
      setLoadingHospitals(true);
      try {
        const response = await fetch('http://localhost:5001/api/hospital/getAll');
        const data = await response.json();
        setHospitals(data); 
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        Alert.alert('Error', 'Could not load hospitals.');
      } finally {
        setLoadingHospitals(false);
      }
    };

    fetchDoctors();
    fetchHospitals();
  }, []);

  
  const validateInput = () => {
    if (searchType === 'doctor' && !doctorName.trim()) {
      Alert.alert('Error', 'Please select a doctor.');
      return false;
    }
    if (searchType === 'hospital' && !hospitalName.trim()) {
      Alert.alert('Error', 'Please select a hospital.');
      return false;
    }
    return true;
  };

  const searchAppointment = () => {
    if (validateInput()) {
      if (searchType === 'doctor') {
        navigation.navigate('DoctorSearchResults', { doctorName });
      } else if (searchType === 'hospital') {
        navigation.navigate('HospitalDetail', { hospitalName });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffff']} 
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Book an Appointment</Text>

          {/* Toggle Buttons for Search Type */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, searchType === 'doctor' && styles.activeButton]}
              onPress={() => {
                setSearchType('doctor');
                setHospitalName(''); 
              }}
            >
              <Text style={styles.toggleButtonText}>Search by Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, searchType === 'hospital' && styles.activeButton]}
              onPress={() => {
                setSearchType('hospital');
                setDoctorName(''); 
              }}
            >
              <Text style={styles.toggleButtonText}>Search by Hospital</Text>
            </TouchableOpacity>
          </View>

          {/* Doctor Name Dropdown */}
          {searchType === 'doctor' && (
            loadingDoctors ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={styles.input}>
                <Picker
                  selectedValue={doctorName}
                  onValueChange={(itemValue) => setDoctorName(itemValue)}
                >
                  <Picker.Item label="Select Doctor" value="" />
                  {doctors.map((doctor) => (
                    <Picker.Item key={doctor._id} label={doctor.fullName} value={doctor.fullName} />
                  ))}
                </Picker>
              </View>
            )
          )}

          {/* Hospital Name Dropdown */}
          {searchType === 'hospital' && (
            loadingHospitals ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={styles.input}>
                <Picker
                  selectedValue={hospitalName}
                  onValueChange={(itemValue) => setHospitalName(itemValue)}
                >
                  <Picker.Item label="Select Hospital" value="" />
                  {hospitals.map((hospital) => (
                    <Picker.Item key={hospital._id} label={hospital.name} value={hospital.name} />
                  ))}
                </Picker>
              </View>
            )
          )}

          {/* Search Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchAppointment}
            activeOpacity={0.7}
          >
            <Text style={styles.searchButtonText}>Search</Text>
            <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity> 
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004e92', 
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: '#005596',
  },
  toggleButtonText: {
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds shadow on Android
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    transform: [{ scale: 1.0 }],
  },
  searchButtonText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 5,
  },
});

export default AppointmentScreen;

