import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Logo from '../../assets/hospitallogo.webp';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/api/user/signup', {
        fullName,
        email: email.toLowerCase(), // Ensure email is lowercase
        password,
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Unable to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert('Error', 'There was a problem with the signup process.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={Logo} style={styles.background}>
        <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <Icon name="person" size={24} color="#000" />
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email" size={24} color="#000" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())} // Convert to lowercase
              style={styles.input}
              autoCapitalize="none" // Prevent auto-capitalization
              keyboardType="email-address" // Use email keyboard
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={24} color="#000" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={24} color="#000" />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.signInText} onPress={() => navigation.navigate('Login')}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  signUpButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  signInLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SignUpScreen;