import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const patientData = [
  { id: '001211G', name: 'Rohan Dasun', date: '2023-07-24', doctor: 'Dr. Rajiv Nirmal' },
  { id: '001316F', name: 'Chamara', date: '2023-07-24', doctor: 'Dr. Rajiv Nirmal' },
  { id: '001214G', name: 'Sarathkumar', date: '2023-07-24', doctor: 'Dr. Rohan De Silva' },
  { id: '002241G', name: 'Daniel', date: '2023-09-20', doctor: 'Dr. Rajiv Nirmal' },
  { id: '001219G', name: 'Rohan Dasun', date: '2023-09-30', doctor: 'Dr. Abdul Samad' },
  // Add more data here as needed
];

const ITEMS_PER_PAGE = 3; // Number of items per page

const GenerateReportScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(patientData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPatientItem = ({ item }) => (
    <View style={styles.patientItem}>
      <View>
        <Text style={styles.patientName}>{`Patient Name: ${item.name}`}</Text>
        <Text style={styles.patientId}>{`Patient ID: ${item.id}`}</Text>
        <Text style={styles.doctorText}>{`Channeled ${item.doctor}`}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );

  // Pagination logic
  const currentItems = patientData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffff']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Generate Report</Text>

          <FlatList
            data={currentItems}
            keyExtractor={(item) => item.id}
            renderItem={renderPatientItem}
            contentContainerStyle={styles.list}
          />

          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
            >
              <Text style={currentPage === 1 ? styles.disabled : styles.pageButton}>«</Text>
            </TouchableOpacity>
            {[...Array(totalPages)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePageChange(index + 1)}
              >
                <Text style={currentPage === index + 1 ? styles.pageButtonActive : styles.pageButton}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              disabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
            >
              <Text style={currentPage === totalPages ? styles.disabled : styles.pageButton}>»</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('GenerateReportFilter')}
            >
              <View style={styles.buttonSolid}>
                <Text style={styles.buttonText}>Generate Report</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Edit Entry')}>
              <View style={styles.buttonSolid}>
                <Text style={styles.buttonText}>Edit Entry</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, // Add extra padding at the bottom
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,  // For Android shadow
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  patientId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#555',
  },
  doctorText: {
    fontSize: 12,
    marginTop: 3,
    color: '#666',
  },
  dateContainer: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#888',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  pageButton: {
    marginHorizontal: 5,
    fontSize: 18,
    color: '#000',
    padding: 5,
  },
  pageButtonActive: {
    marginHorizontal: 5,
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  disabled: {
    color: '#ccc',
    marginHorizontal: 5,
    fontSize: 18,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20, // Add margin at the bottom
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  buttonSolid: {
    backgroundColor: '#005596',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GenerateReportScreen;