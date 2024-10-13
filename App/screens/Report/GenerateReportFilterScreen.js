import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext';
import config from '../../config/config';
const GenerateReportFilterScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // To keep track of selected booking
  const itemsPerPage = 3;
  const { user } = useContext(AuthContext);

  // Fetch past bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/booking/past/${user.id}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching past bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  // Filter the bookings by patient name or ID
  const filteredData = bookings.filter(
    (item) =>
      item.userId.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.userId._id.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle card selection
  const handleCardPress = (item) => {
    setSelectedBooking(item); // Set the selected booking
  };

  // Navigate to report generation screen
  const generateReport = () => {
    if (selectedBooking) {
      console.log('Selected Booking Data:', selectedBooking);
      
      navigation.navigate('GenerateReportAlert', { bookingData: selectedBooking });
    } else {
      console.log('No booking selected');
    }
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#005596', '#ffff']}
        style={styles.container}
      >
        <Text style={styles.heading}>Generate Report</Text>

        <TextInput
          style={styles.input}
          placeholder="Search by patient name or ID"
          value={searchText}
          onChangeText={setSearchText}
        />

        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              <View
                style={[
                  styles.card,
                  selectedBooking?._id === item._id && styles.selectedCard, // Highlight selected card
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardDate}>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.cardTitle}>{`Patient Name: ${item.userId.fullName}`}</Text>
                <Text style={styles.cardText}>{`Doctor: ${item.doctorId.fullName}`}</Text>
                <Text style={styles.cardText}>{`Hospital: ${item.appointmentId.hospitalName}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Pagination controls */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationText}>{"<<"}</Text>
          </TouchableOpacity>

          {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePageChange(index + 1)}
            >
              <Text style={currentPage === index + 1 ? styles.selectedPage : styles.page}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(filteredData.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
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
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20, paddingBottom: 50 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#fff' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#d6eaff', // Highlight color for selected card
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'flex-end' },
  cardDate: { fontSize: 12, color: '#777' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardText: { fontSize: 14, color: '#555' },
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  page: { marginHorizontal: 5, fontSize: 16, color: '#007BFF' },
  selectedPage: { marginHorizontal: 5, fontSize: 16, fontWeight: 'bold', color: '#333' },
  paginationText: { fontSize: 18, fontWeight: 'bold', color: '#007BFF' },
  buttonContainer: { marginBottom: 20 },
  button: { backgroundColor: '#005596', borderRadius: 8, padding: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default GenerateReportFilterScreen;
