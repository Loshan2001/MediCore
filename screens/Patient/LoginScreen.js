import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/hospitallogo.webp';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // default selection

  const handleLogin = () => {
    // Navigate to Main screen and pass the selectedRole
    navigation.navigate('Main', { role: selectedRole });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={Logo} style={styles.background}>
        <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
          <Text style={styles.title}>MEDICORE</Text>

          {/* Role Selection */}
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedRole('user')}>
              <View style={[styles.radioCircle, selectedRole === 'user' && styles.selectedRadio]} />
              <Text style={styles.radioLabel}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedRole('doctor')}>
              <View style={[styles.radioCircle, selectedRole === 'doctor' && styles.selectedRadio]} />
              <Text style={styles.radioLabel}>Doctor</Text>
            </TouchableOpacity>
          </View>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Icon name="person" size={24} color="#000" />
            <TextInput
              placeholder="User Name"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>

          {/* Password Input */}
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

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>
            Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
    borderRadius: 0, // Optional for rounded corners
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff', // Change to white for better contrast
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#fff', // Change to white for better contrast
  },
  radioLabel: {
    fontSize: 18,
    color: '#fff', // Change to white for better contrast
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
  loginButton: {
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoginScreen;
