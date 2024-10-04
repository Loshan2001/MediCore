import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds

const hospitals = [
  {
    id: '1',
    name: 'Hemas Hospital',
    location: 'Negombo Rd, Wattala',
    phone: '0112-9090400',
    imageUrl: 'https://via.placeholder.com/50',
    city: 'Wattala',
  },
  {
    id: '2',
    name: 'Nawaloka Hospital',
    location: 'Galle Rd, Colombo',
    phone: '0115-500300',
    imageUrl: 'https://via.placeholder.com/50',
    city: 'Colombo',
  },
  // Add more hospitals as needed
];

const HospitalDetailScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.hospitalImage} />
      <View style={styles.hospitalInfo}>
        <Text style={styles.hospitalName}>{item.name}</Text>
        <Text style={styles.hospitalAddress}>{item.location}</Text>
        <Text style={styles.hospitalPhone}>📞 {item.phone}</Text>
      </View>
      <View style={styles.cityContainer}>
        <Text style={styles.cityText}>{item.city}</Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('HospitalSearchResults', { hospital: item })}
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#005596', '#ffffff']} style={styles.gradientBackground}>
        <Text style={styles.header}>Search Results (Hospital)</Text>
        <FlatList
          data={hospitals}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent} // Adding padding to the FlatList
        />
        <View style={styles.paginationContainer}>
          <Text style={styles.pageNumber}>1</Text>
          <Text style={styles.pageNumber}>2</Text>
          <Text style={styles.pageNumber}>3</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Set text color to match the gradient
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  hospitalImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#777',
  },
  hospitalPhone: {
    fontSize: 14,
    color: '#777',
  },
  cityContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  viewButton: {
    borderColor: '#005596',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewButtonText: {
    color: '#005596',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageNumber: {
    fontSize: 18,
    paddingHorizontal: 10,
    backgroundColor: '#3333', // Optional background color for pagination
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
});

export default HospitalDetailScreen;
