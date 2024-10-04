import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';

const patientData = [
  { id: '001211G', name: 'Rohan Dasun', doctor: 'Dr. Rajiv Nirmal', date: '2023-07-24' },
  { id: '001316F', name: 'Chamara', doctor: 'Dr. Rajiv Nirmal', date: '2023-07-24' },
  { id: '002241G', name: 'Daniel', doctor: 'Dr. Rajiv Nirmal', date: '2023-09-20' },
  { id: '001219G', name: 'Rohan Dasun', doctor: 'Dr. Abdul Samad', date: '2023-09-30' },
  // Add more data if needed
];

const doctors = [
  'Dr. Rajiv Nirmal',
  'Dr. Ashwin Kumar',
  'Dr. Abdul Samad',
  'All'
];

const GenerateReportFilterScreen = ({ navigation }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Rajiv Nirmal');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const itemsPerPage = 3;

  const generateReport = () => {
    navigation.navigate('GenerateReportAlert');
  };

  const filteredData = patientData.filter(
    (item) => (selectedDoctor === 'All' || item.doctor === selectedDoctor) &&
    (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
     item.id.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Generate Report</Text>
      
      {/* Custom Dropdown */}
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedDoctor}</Text>
      </TouchableOpacity>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search by patient name or ID"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Modal for doctor selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {doctors.map((doctor) => (
            <TouchableOpacity
              key={doctor}
              style={styles.modalItem}
              onPress={() => {
                setSelectedDoctor(doctor);
                setModalVisible(false);
              }}
            >
              <Text>{doctor}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* FlatList to display patients */}
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardText}>{item.date}</Text>
            </View>
            <Text style={styles.cardTitle}>{`Patient Name: ${item.name}`}</Text>
            <Text style={styles.cardText}>{`Patient ID: ${item.id}`}</Text>
            <Text style={styles.cardText}>{`Channeled ${item.doctor}`}</Text>
          </View>
        )}
      />

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationText}>{"<<"}</Text>
        </TouchableOpacity>

        {[1, 2, 3, 4, 5].map((page) => (
          <TouchableOpacity key={page} onPress={() => setCurrentPage(page)}>
            <Text style={currentPage === page ? styles.selectedPage : styles.page}>
              {page}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
          disabled={currentPage === 5}
        >
          <Text style={styles.paginationText}>{">>"}</Text>
        </TouchableOpacity>
      </View>

      {/* Generate Report Button */}
      <Button title="Generate Report" onPress={generateReport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  page: {
    marginHorizontal: 5,
    fontSize: 16,
    color: 'black',
  },
  selectedPage: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  paginationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GenerateReportFilterScreen;