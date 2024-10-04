// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Perform login logic, then navigate to Profile
//     navigation.navigate('Main');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>MEDICAL</Text>
//       <TextInput
//         placeholder="User Name"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button title="Sign In" onPress={handleLogin} />
//       <Text onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // default selection

  const handleLogin = () => {
    if (selectedRole === 'doctor') {
      // Navigate to Doctor's Home Screen
      navigation.navigate('DoctorHome');
    } else {
      // Navigate to User's Home Screen
      navigation.navigate('Main');
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/background.png' }} // Replace with actual image URI
      style={styles.background}
    >
      <LinearGradient
        colors={['#FFDD44', '#FFCC00']}
        style={styles.container}
      >
        <Text style={styles.title}>MEDICAL</Text>

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

        <View style={styles.inputContainer}>
          <Icon name="person" size={24} color="#000" />
          <TextInput
            placeholder="User Name"
            value={username}
            onChangeText={setUsername}
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the radio buttons
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15, // Horizontal spacing between buttons
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 18,
    color: '#000',
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
    backgroundColor: '#FFCC00',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
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
