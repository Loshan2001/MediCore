import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const patientData = [
  { id: '001211G', name: 'Rohan Dasun', doctor: 'Dr. Rajiv Nirmal', date: '2023-07-24' },
  { id: '001316F', name: 'Chamara', doctor: 'Dr. Rajiv Nirmal', date: '2023-07-24' },
  { id: '002241G', name: 'Daniel', doctor: 'Dr. Rajiv Nirmal', date: '2023-09-20' },
  { id: '001219G', name: 'Rohan Dasun', doctor: 'Dr. Abdul Samad', date: '2023-09-30' },
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffff']}
        style={styles.container}
      >
        <Text style={styles.heading}>Generate Report</Text>

        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedDoctor}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Search by patient name or ID"
          value={searchText}
          onChangeText={setSearchText}
        />

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
                <Text style={styles.modalText}>{doctor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <Text style={styles.cardTitle}>{`Patient Name: ${item.name}`}</Text>
              <Text style={styles.cardText}>{`Patient ID: ${item.id}`}</Text>
              <Text style={styles.cardText}>{`Channeled ${item.doctor}`}</Text>
            </View>
          )}
        />

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={generateReport}>
            <Text style={styles.buttonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    paddingBottom: 50,  // Add padding to prevent button overlap with the tab bar
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dropdownButton: {
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdownText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardDate: {
    fontSize: 12,
    color: '#777',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  page: {
    marginHorizontal: 5,
    fontSize: 16,
    color: '#007BFF',
  },
  selectedPage: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  paginationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  buttonContainer: {
    marginBottom: 20, // Add margin at the bottom to prevent overlap
  },
  button: {
    backgroundColor: '#005596',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GenerateReportFilterScreen;
