// Home.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Or use a different icon library

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Professional</Text>
        <Text style={styles.subHeaderText}>Best Medical Specialists</Text>
        <Image
          style={styles.headerImage}
          source={{ uri: 'https://wallpapers.com/images/hd/modern-hospital-building-illustration-n7pd9krca2gr8qda.png' }}  // Replace with actual image URL
        />
      </View>

      {/* Main Grid */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="favorite" size={40} color="#00cc66" />
          <Text style={styles.gridText}>Health Tools</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Icon name="coronavirus" size={40} color="#00cc66" />
          <Text style={styles.gridText}>COVID-19</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Icon name="scanner" size={40} color="#00cc66" />
          <Text style={styles.gridText}>MRI/CT Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Icon name="local-hospital" size={40} color="#00cc66" />
          <Text style={styles.gridText}>Laboratories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Icon name="person-search" size={40} color="#00cc66" />
          <Text style={styles.gridText}>Channelling</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Icon name="person" size={40} color="#00cc66" />
          <Text style={styles.gridText}>My Doctors</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency and Hotline */}
      <View style={styles.emergencyContainer}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Icon name="local-phone" size={24} color="white" />
          <Text style={styles.emergencyText}>EMERGENCY SERVICE</Text>
        </TouchableOpacity>

        <View style={styles.hotlineContainer}>
          <TouchableOpacity style={styles.hotlineButton}>
            <Icon name="call" size={24} color="white" />
            <Text style={styles.hotlineText}>HOTLINE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackButton}>
            <Icon name="feedback" size={24} color="white" />
            <Text style={styles.feedbackText}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFDD44',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  headerImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  gridText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  emergencyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
  },
  emergencyButton: {
    backgroundColor: '#FFCC00',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  emergencyText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  hotlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  hotlineButton: {
    backgroundColor: '#00CC66',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    width: '48%',
    justifyContent: 'center',
  },
  hotlineText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  feedbackButton: {
    backgroundColor: '#999999',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    width: '48%',
    justifyContent: 'center',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Home;

