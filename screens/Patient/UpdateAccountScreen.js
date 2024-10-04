import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const UpdateAccountScreen = () => {
  const [fullName, setFullName] = useState('IMESHA PASINDU');
  const [email, setEmail] = useState('imasha@gmail.com');
  const [address, setAddress] = useState('9, NEW ROAD COLOMBO - 03');
  const [phone, setPhone] = useState('0773456798');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    // Update account logic
    alert('Account Updated');
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      
      {/* Profile Image and Info */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
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
    color: '#333',
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
    backgroundColor: '#4a90e2',
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
