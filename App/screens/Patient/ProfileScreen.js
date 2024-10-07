import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import axios from 'axios'; // Import axios for API call

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/user/profile/${user.id}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#005596" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

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
        <Text style={styles.info}>User Name: {profile.fullName}</Text>
        <Text style={styles.info}>Address: {profile.address || 'N/A'}</Text>
        <Text style={styles.info}>Email: {profile.email}</Text>
        <Text style={styles.info}>Phone No: {profile.phoneNo || 'N/A'}</Text>
        {/* <Text style={styles.info}>Age: {profile.age || 'N/A'}</Text> */}

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
        <TouchableOpacity style={styles.buttonLogout}
          onPress={() => navigation.navigate('Login')}
        >
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProfileScreen;
