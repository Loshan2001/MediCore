import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MEDICAL</Text>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg' }} // Replace with actual image
            style={styles.profileImage}
          />
        </View>

        {/* Profile Info */}
        <Text style={styles.title}>MY PROFILE</Text>
        <Text style={styles.info}>User Name: IMESHA PASINDU</Text>
        <Text style={styles.info}>Date of Birth: 1990-05-11</Text>
        <Text style={styles.info}>Address: 9, New Road COL-3</Text>
        <Text style={styles.info}>Email: imasha@gmail.com</Text>
        <Text style={styles.info}>Phone No: 0773456798</Text>
        <Text style={styles.info}>Age: 35</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MedicalHistory')}
        >
          <Text style={styles.buttonText}>Medical History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AppointmentHistory')}
        >
          <Text style={styles.buttonText}>Appointment History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UpdateAccount')}
        >
          <Text style={styles.buttonText}>Update Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcon: {
    fontSize: 20,
    
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#005596',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
