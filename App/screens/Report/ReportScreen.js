import React, { useEffect, useState , useContext} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext';
import config from '../../config/config';
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [doctorData, setDoctorData] = useState(null);
  const { user } = useContext(AuthContext); 
  console.log(user.id)
  useEffect(() => {
    // Fetch doctor data from API
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/doctor/${user.id}`); // API call using the doctor's ID
        const result = await response.json();
        setDoctorData(result); // Store the response in state
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, []);

  if (!doctorData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    ); // Show loading state while fetching data
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#005596', '#ffff']}
        style={styles.content}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Icon name="notifications" size={24} color="#333" />
        </View>

        {/* Enlarged Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.welcomeText}>Welcome {doctorData.fullName}</Text>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/585/326/small_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png',
              }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.title}>{doctorData.specialization}</Text>
              <Text style={styles.infoText}>Name: {doctorData.fullName}</Text>
              <Text style={styles.infoText}>Phone: {doctorData.phoneNo}</Text>
              <Text style={styles.infoText}>Email: {doctorData.email}</Text>
              <Text style={styles.infoText}>Status: Active</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="person-search" size={24} color="#fff" />
            <Text style={styles.actionText}>Duty</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('GenerateReport')}
          >
            <Icon name="assignment" size={24} color="#fff" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => console.log('Availability')}
          >
            <Icon name="event-available" size={24} color="#fff" />
            <Text style={styles.actionText}>Availability</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,  // For Android shadow
    height: height * 0.4, // Adjust the height
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center', // Center align the welcome text
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 2,
    borderColor: '#005596', // Add border around profile image
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005596',
    marginBottom: 10,
    textAlign: 'left',  // Ensure text is left-aligned
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'left',  // Ensure info text is left-aligned
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#005596',  // Orange color for buttons
    borderRadius: 15,
    width: width * 0.28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,  // Android shadow
  },
  actionText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',  // Center the text inside the button
  },
});

export default HomeScreen;
