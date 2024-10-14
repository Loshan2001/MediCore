import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // Assuming you have an AuthContext
import config from '../../config/config';

const MedicalHistoryScreen = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get user data from AuthContext

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        // Fetch user details to determine userType
        const userRes = await axios.get(`${config.baseURL}/api/user/${user.id}`);
        const userType = userRes.data.userType; // Extract userType from the response
        

        let response;
        // Based on the userType, make appropriate API call
        if (userType === 'doctor') {
          response = await axios.get(`${config.baseURL}/api/booking/past/${user.id}`);
        } else if (userType === 'patient') {
          response = await axios.get(`${config.baseURL}/api/booking/history/${user.id}`);
        }

        if (response && response.data) {
          // Assuming the response data has an array of medical history
          const historyData = response.data.map(item => ({
            id: item._id,
            description: item.appointmentId.hospitalName,
            doctor : item.doctorId.fullName,
            date: new Date(item.date).toLocaleDateString('en-US', {
              day: 'numeric', month: 'short',
            }),
            systolic: item.systolic,
            diastolic: item.diastolic,
          }));
          setMedicalHistory(historyData);
        } else {
          console.error('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching medical history:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [user.id]);

  const renderMedicalHistory = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.row}>
            <FontAwesome name="calendar" size={16} color="gray" />
            <Text style={styles.dateText}> {item.date}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="heartbeat" size={16} color="gray" />
            <Text style={styles.bpText}> {item.systolic}7/{item.diastolic} 30 mmHg</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>VIEW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={medicalHistory}
            keyExtractor={(item) => item.id}
            renderItem={renderMedicalHistory}
          />
        )}
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
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateText: {
    marginLeft: 5,
    color: '#777',
  },
  bpText: {
    marginLeft: 5,
    color: '#777',
  },
  viewButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MedicalHistoryScreen;
