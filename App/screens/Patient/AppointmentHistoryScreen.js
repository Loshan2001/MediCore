import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const appointments = [
  { id: '1', doctor: 'Dr. Aneesha De Silva', date: '21 AUG', hospital: 'Hemas Hospital', time: '2:00pm - 5:00pm' },
  { id: '2', doctor: 'Dr. Nuran Senanayake', date: '14 JUL', hospital: 'Lanka Hospital', time: '12:00pm - 3:00pm' },
  { id: '3', doctor: 'Dr. Aneesha De Silva', date: '21 JUNE', hospital: 'Hemas Hospital', time: '10:00am - 12:00pm' },
  { id: '4', doctor: 'Dr. Nuran Senanayake', date: '04 APRIL', hospital: 'Lanka Hospital', time: '2:00pm - 5:00pm' },
  { id: '5', doctor: 'Dr. Aneesha De Silva', date: '08 MAR', hospital: 'Hemas Hospital', time: '3:00pm - 5:30pm' },
];

const AppointmentHistoryScreen = () => {
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
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>VIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointment}
          showsVerticalScrollIndicator={false} // Hides vertical scroll bar
        />
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
