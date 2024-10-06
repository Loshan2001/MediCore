import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For vector icons
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds

const AppointmentScreen = ({ navigation }) => {
  const [doctorName, setDoctorName] = useState('Dr. Sanjeewa Garusinghe');
  const [hospitalName, setHospitalName] = useState('Hemas Hospital, Wattala');
  const [specialization, setSpecialization] = useState('Neurosurgeon');
  const [date, setDate] = useState('');

  const searchAppointment = () => {
    navigation.navigate('DoctorSearchResults');
  };

  const searchHospital = () => {
    navigation.navigate('HospitalDetail');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        // colors={['#004e92', '#000428']}// Darker, richer gradient background
        colors={['#005596', '#ffff']}   
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Book an Appointment</Text>

          <TextInput
            placeholder="Doctor Name"
            style={styles.input}
            value={doctorName}
            onChangeText={setDoctorName}
            placeholderTextColor="#ddd"
          />

          <TextInput
            placeholder="Hospital Name"
            style={styles.input}
            value={hospitalName}
            onChangeText={setHospitalName}
            placeholderTextColor="#ddd"
          />

          <TextInput
            placeholder="Specialization"
            style={styles.input}
            value={specialization}
            onChangeText={setSpecialization}
            placeholderTextColor="#ddd"
          />

          <TextInput
            placeholder="Pick Date"
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholderTextColor="#ddd"
          />

          {/* Search Button for Doctor */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchAppointment}
            activeOpacity={0.7}
          >
            <Text style={styles.searchButtonText}>Search</Text>
            <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity> 

          {/* Search Button for Hospital */}
          <TouchableOpacity
            style={[styles.searchButton, { marginTop: 10 }]}
            onPress={searchHospital}
            activeOpacity={0.7}
          >
            <Text style={styles.searchButtonText}>Search Hospital</Text>
            <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004e92', // Backup color for the gradient
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds shadow on Android
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005596',
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    transform: [{ scale: 1.0 }],
  },
  searchButtonText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 5,
  },
});

export default AppointmentScreen;




// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // For vector icons
// import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
// import axios from 'axios'; // Axios for API requests

// const AppointmentScreen = ({ navigation }) => {
//   const [doctorName, setDoctorName] = useState('');
//   const [hospitalName, setHospitalName] = useState('');
//   const [specialization, setSpecialization] = useState('');
//   const [date, setDate] = useState('');

//   const searchAppointment = async () => {
//     try {
//       // Make a POST request to create an appointment
//       const response = await axios.post('http://localhost:5001/api/appointment/create/appointments', {
//         doctorName,
//         hospitalName,
//         specialization,
//         date,
//         user
//       });

//       Alert.alert('Success', 'Appointment created successfully');
//       navigation.navigate('DoctorSearchResults'); // Navigate to results
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to create appointment');
//     }
//   };

//   const searchHospital = () => {
//     navigation.navigate('HospitalDetail');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <LinearGradient
//         colors={['#005596', '#ffff']}
//         style={styles.gradientBackground}
//       >
//         <View style={styles.container}>
//           <Text style={styles.title}>Book an Appointment</Text>

//           <TextInput
//             placeholder="Doctor Name"
//             style={styles.input}
//             value={doctorName}
//             onChangeText={setDoctorName}
//             placeholderTextColor="#ddd"
//           />

//           <TextInput
//             placeholder="Hospital Name"
//             style={styles.input}
//             value={hospitalName}
//             onChangeText={setHospitalName}
//             placeholderTextColor="#ddd"
//           />

//           <TextInput
//             placeholder="Specialization"
//             style={styles.input}
//             value={specialization}
//             onChangeText={setSpecialization}
//             placeholderTextColor="#ddd"
//           />

//           <TextInput
//             placeholder="Pick Date"
//             style={styles.input}
//             value={date}
//             onChangeText={setDate}
//             placeholderTextColor="#ddd"
//           />

//           {/* Search Button for Doctor */}
//           <TouchableOpacity
//             style={styles.searchButton}
//             onPress={searchAppointment}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.searchButtonText}>Search</Text>
//             <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
//           </TouchableOpacity> 

//           {/* Search Button for Hospital */}
//           <TouchableOpacity
//             style={[styles.searchButton, { marginTop: 10 }]}
//             onPress={searchHospital}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.searchButtonText}>Search Hospital</Text>
//             <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#004e92', // Backup color for the gradient
//   },
//   gradientBackground: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 25,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     color: '#fff',
//     fontSize: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Adds shadow on Android
//   },
//   searchButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#005596',
//     paddingVertical: 15,
//     borderRadius: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Shadow for Android
//     transform: [{ scale: 1.0 }],
//   },
//   searchButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     marginRight: 10,
//   },
//   searchIcon: {
//     marginLeft: 5,
//   },
// });

// export default AppointmentScreen;
