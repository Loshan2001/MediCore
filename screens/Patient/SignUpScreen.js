import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/hospitallogo.webp'; // Ensure this path is correct

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Sign-up logic here
    navigation.navigate('Login');
  };

  return (
    <ImageBackground 
      source={Logo} 
      style={styles.background}
    >
      <LinearGradient
        colors={['#FFDD44', '#FFCC00']}
        style={styles.container}
      >
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
            onChangeText={setEmail}
            style={styles.input}
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
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    backgroundColor: '#ffa200',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  signUpButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
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
