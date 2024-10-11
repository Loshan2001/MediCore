import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Text, ActivityIndicator, Alert, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DoctorCard from '../../components/DoctorCard';

const DoctorSearchResultsScreen = ({ navigation, route }) => {
  const { doctorName } = route.params;
  const [doctorData, setDoctorData] = useState([]); 
  const [filteredDoctorData, setFilteredDoctorData] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/doctor/search?doctorName=${doctorName}`);
        const data = await response.json();
        setDoctorData(data);
        setFilteredDoctorData(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        Alert.alert('Error', 'Could not load doctor details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorName]);

  const handleSearch = (text) => {
    setSearchDate(text);

    const filteredData = doctorData.filter((doctor) => {
      const formattedDate = new Date(doctor.appointmentDate).toLocaleDateString();
      return formattedDate.includes(text);
    });

    setFilteredDoctorData(filteredData);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#005596" />
      </View>
    );
  }

  if (doctorData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No doctor found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#005596', '#ffff']} style={styles.gradientBackground}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by appointment date (YYYY-MM-DD)"
          value={searchDate}
          onChangeText={handleSearch}
        />
        {filteredDoctorData.length > 0 ? ( // Check if filtered data exists
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {filteredDoctorData.map((doctor, index) => {
              const { doctorName: name, user = {}, hospitalName, appointmentDate, appointmentTimeSlot } = doctor;
              const { specialization = 'N/A' } = user;
              const formattedDate = new Date(appointmentDate).toLocaleDateString();
              const timeSlot = appointmentTimeSlot || 'N/A';

              return (
                <DoctorCard
                  key={index}
                  doctor={{
                    name,
                    specialization,
                    hospital: hospitalName,
                    appointmentDate: formattedDate,
                    timeSlot,
                  }}
                  onPress={() => navigation.navigate('DoctorDetailScreen', { doctor })}
                />
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.centered}>
            <Text style={styles.errorText}>No appointments available.</Text>
          </View>
        )}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 20,
    backgroundColor: '#fff',
  },
});

export default DoctorSearchResultsScreen;
