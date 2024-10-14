import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext'; // Assuming you have an AuthContext
import config from '../../config/config';

const AppointmentHistoryScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get user data from AuthContext


useEffect(() => {
  const fetchAppointments = async () => {
    try {
      let response;

      // Fetch user details and extract userType from the response
      const userRes = await axios.get(`${config.baseURL}/api/user/${user.id}`);
      const userType = userRes.data.userType;


      


      // Make the appropriate API call based on userType
      if (userType === 'doctor') {
        response = await axios.get(`${config.baseURL}/api/booking/past/${user.id}`);
      } else if (userType === 'patient') {
        response = await axios.get(`${config.baseURL}/api/booking/history/${user.id}`);
      }

      if (response && response.data) {
        const appointmentData = response.data.map(item => ({
          id: item._id,
          doctor: item.doctorId.fullName,
          date: new Date(item.appointmentId.appointmentDate).toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric'
          }),
          hospital: item.appointmentId.hospitalName,
          time: item.appointmentId.appointmentTimeSlot,
        }));
        setAppointments(appointmentData);
      } else {
        console.error('No data returned from API');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, [user.id]);

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.doctorName}>{item.doctor}</Text>
          <View style={styles.row}>
            <FontAwesome name="map-marker" size={16} color="gray" />
            <Text style={styles.hospitalText}>{item.hospital}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="clock-o" size={16} color="gray" />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{item.date}</Text>
          {/* <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>VIEW</Text>
          </TouchableOpacity> */}
        </View>
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
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={renderAppointment}
            showsVerticalScrollIndicator={false} // Hides vertical scroll bar
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
    width: '100%',
  },
  details: {
    flex: 1,
  },
  doctorName: {
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
  hospitalText: {
    marginLeft: 5,
    color: '#777',
  },
  timeText: {
    marginLeft: 5,
    color: '#777',
  },
  dateView: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppointmentHistoryScreen;
