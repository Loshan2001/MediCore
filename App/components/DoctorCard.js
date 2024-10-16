
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DoctorCard = ({ doctor, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: "https://www.buckeyehealthandresearch.com/wp-content/uploads/2023/03/schedule-appointment-button-2.png"}} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.hospital}>{doctor.hospital}</Text>
        <Text style={styles.time}>{doctor.timeSlot}</Text>
      </View>
      <View style={styles.bookContainer}>
        <Text style={styles.date}>{doctor.appointmentDate}</Text>
        <TouchableOpacity style={styles.bookButton} onPress={onPress}>
          <Text style={styles.bookText}>+ Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  details: {
    flex: 3,
    paddingLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hospital: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  bookContainer: {
    flex: 1,
    alignItems: 'center',
  },
  date: {
    fontSize: 9,
    color: '#333',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#e6ffed',
    borderRadius: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  bookText: {
    color: '#00c853',
    fontWeight: 'bold',
  },
});

export default DoctorCard;
