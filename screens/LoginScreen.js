// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
// } from 'react-native';
// import { AuthContext } from '../context/AuthContext';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { signIn } = useContext(AuthContext);
  
//   const scaleValue = new Animated.Value(1);

//   const handleLogin = () => {
//     signIn({ username, password });
//     navigation.navigate('Home');
//   };

//   const handlePressIn = () => {
//     Animated.spring(scaleValue, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.spring(scaleValue, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo Section */}
//       <Image
//         source={require('../assets/doctor_logo.png')}
//         style={styles.logo}
//       />
//       <Text style={styles.title}>MEDICAL</Text>

//       {/* Input Fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="User Name"
//         value={username}
//         onChangeText={setUsername}
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       {/* Sign In Button with Animation */}
//       <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPressIn={handlePressIn}
//           onPressOut={handlePressOut}
//           onPress={handleLogin}
//         >
//           <Text style={styles.loginButtonText}>Sign In</Text>
//         </TouchableOpacity>
//       </Animated.View>

//       <Text style={styles.orText}>OR</Text>

//       {/* Sign Up Button with Outlined Style */}
//       <TouchableOpacity style={styles.signupButton}>
//         <Text style={styles.signupButtonText}>Sign Up</Text>
//       </TouchableOpacity>

//       {/* Forgotten Password Button */}
//       <TouchableOpacity>
//         <Text style={styles.forgotPasswordText}>Forgotten Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 32,
//     color: '#4a90e2',
//     marginBottom: 40,
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   loginButton: {
//     width: '100%',
//     backgroundColor: '#4a90e2',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   orText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#888',
//   },
//   signupButton: {
//     width: '100%',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     borderColor: '#4a90e2',
//     borderWidth: 2,
//     marginTop: 10,
//   },
//   signupButtonText: {
//     color: '#4a90e2',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   forgotPasswordText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#4a90e2',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginScreen;
