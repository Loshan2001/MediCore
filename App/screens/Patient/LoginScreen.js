import React, { useState,useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../../assets/hospitallogo.webp';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {signIn} = useContext(AuthContext);  // Access the AuthContext

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/user/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const { userType, userId, token, username } = response.data;
        // console.log("username :"+ username )
        // console.log("userID :"+ userId )
        // console.log("token :"+ token )
        // Store the user data in AuthContext
        signIn({ id: userId, username, token });

        // Navigate to the Main screen with the user role
        Alert.alert('Success', 'Successfully logged in', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main', { role: userType }),
          },
        ]);
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert('Error', 'Invalid email or password. Please check your credentials.');
        } else {
          Alert.alert('Error', `Server error: ${error.response.status}. ${error.response.data.msg || 'Please try again later.'}`);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Please check your internet connection and try again.');
      } else {
        Alert.alert('Error', `An unexpected error occurred: ${error.message}`);
      }
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={Logo} style={styles.background}>
        <LinearGradient colors={['#005596', '#ffffff']} style={styles.container}>
          <Text style={styles.title}>MEDICORE</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="email" size={24} color="#000" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
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
