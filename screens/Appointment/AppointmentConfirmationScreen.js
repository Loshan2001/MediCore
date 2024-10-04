import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const AppointmentConfirmationScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      {/* Success Icon and Message */}
      <View style={styles.confirmationBox}>
        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle-outline" size={70} color="green" />
        </View>
        <Text style={styles.successMessage}>Channelling Confirmed</Text>
        <Text style={styles.confirmationText}>
          Thank you for channelling the doctor with us, your information is safe here and won't be shared among others. 
          <Text style={styles.moreText}> see more...</Text>
        </Text>
        <Text style={styles.appointmentNo}>Appointment No #24</Text>
      </View>

      {/* Go Back to Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Go Back to Home</Text>
        <Icon name="home-outline" size={18} color="#397b9c" />
      </TouchableOpacity>

      {/* Bottom Tab */}
      {/* <View style={styles.bottomTab}>
        <Icon name="home-outline" size={28} color="#333" />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Icon name="bookmark-outline" size={28} color="#333" />
        <Icon name="person-outline" size={28} color="#333" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  confirmationBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    backgroundColor: '#d4f8e8',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  confirmationText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  moreText: {
    color: '#397b9c',
    fontWeight: 'bold',
  },
  appointmentNo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#eaf3f7',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  homeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderColor: '#397b9c',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#397b9c',
    marginRight: 10,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: '#397b9c',
    padding: 10,
    borderRadius: 50,
  },
});

export default AppointmentConfirmationScreen;
