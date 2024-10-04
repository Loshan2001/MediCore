// import React from 'react';
// import { View, Text, Button, FlatList } from 'react-native';

// const patientData = [
//   { id: '001211G', name: 'Rohan Dasun', date: '2023-07-24' },
//   { id: '001216F', name: 'Chamara', date: '2023-07-24' },
//   { id: '001219G', name: 'Daniel', date: '2023-09-30' },
// ];

// const GenerateReportScreen = ({ navigation }) => {
//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Generate Report</Text>
//       <FlatList
//         data={patientData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={{ marginBottom: 20 }}>
//             <Text>{`Patient: ${item.name}`}</Text>
//             <Text>{`ID: ${item.id}`}</Text>
//             <Text>{`Date: ${item.date}`}</Text>
//           </View>
//         )}
//       />
//       <Button title="Generate Report" onPress={() => navigation.navigate('GenerateReportFilter')} />
//     </View>
//   );
// };

// export default GenerateReportScreen;

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

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
        <TouchableOpacity style={styles.actionButton}  onPress={() => navigation.navigate('GenerateReportFilter')} >
          <Text style={styles.buttonText}>Generate Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Edit Entry')}>
          <Text style={styles.buttonText}>Edit Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  patientId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  doctorText: {
    fontSize: 12,
    marginTop: 3,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GenerateReportScreen;
