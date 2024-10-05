import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo
import { LinearGradient } from 'expo-linear-gradient';

const medicalHistory = [
  { id: '1', description: 'Body checkup at Hemas Hospital', date: '21 AUG', systolic: '130mmHg', diastolic: '80mmHg' },
  { id: '2', description: 'Body checkup at Lanka Hospital', date: '14 JUL', systolic: '120mmHg', diastolic: '70mmHg' },
  // Add more history here
];

const MedicalHistoryScreen = () => {
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
            <Text style={styles.bpText}> {item.systolic}/{item.diastolic} mmHg</Text>
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
        <FlatList
          data={medicalHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderMedicalHistory}
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
