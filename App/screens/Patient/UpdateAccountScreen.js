import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext'; // Importing AuthContext for user authentication context
import axios from 'axios'; // Import Axios

const UpdateAccountScreen = () => {
  const { user } = useContext(AuthContext); // Getting the authenticated user info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/user/profile/${user.id}`);
        const data = response.data; // Access data directly with Axios

        setFullName(data.fullName);
        setEmail(data.email);
        setAddress(data.address);
        setPhone(data.phone);
      } catch (error) {
        console.error('Failed to load user data', error);
        Alert.alert('Error', 'Failed to load user data. Please try again later.'); // Show alert on error
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/user/update/${user.id}`, {
        fullName,
        email,
        address,
        phone,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Account updated successfully');
        setIsEditing(false);
      } else {
        Alert.alert('Error', 'Failed to update account');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Server error, please try again');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
        <Text style={styles.title}>MY PROFILE</Text>

        {/* Profile Image and Info */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://r2.erweima.ai/imgcompressed/compressed_79dd14c0e92951344d8efc015ecba37c.webp' }} // Replace with actual image
            style={styles.profileImage}
          />
          <Text style={styles.fullName}>{fullName}</Text>
        </View>

        {/* Conditional rendering: edit form or profile details */}
        {isEditing ? (
          <>
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone No"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.profileDetails}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.info}>{fullName}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{email}</Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.info}>{address}</Text>

            <Text style={styles.label}>Phone No:</Text>
            <Text style={styles.info}>{phone}</Text>

            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={styles.buttonText}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eee',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDetails: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  info: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
});

export default UpdateAccountScreen;
