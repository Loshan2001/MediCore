import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const GenerateReportAlertScreen = ({ navigation, route }) => {
 
  const { bookingData } = route.params;

  return (
    <LinearGradient
      colors={['#005596', '#ffff']} 
      style={styles.container}
    >
     
      <View style={styles.reportContainer}>
        <Image
           source={ {uri: 'https://www.freeiconspng.com/thumbs/report-icon/report-icon-20.png'}} // Add your success icon here
          style={styles.icon}
        />
        <Text style={styles.successText}>Report Generated Successfully</Text>

        
        <Text style={styles.bookingInfo}>
          Patient: {bookingData?.userId?.fullName}
        </Text>
        <Text style={styles.bookingInfo}>
          Doctor: {bookingData?.doctorId?.fullName}
        </Text>
        <Text style={styles.bookingInfo}>
          Hospital: {bookingData?.appointmentId?.hospitalName}
        </Text>
      </View>

      {/* Buttons: View Report and Back to Home */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewReportButton}
          onPress={() => navigation.navigate('ReportView',{ bookingData: bookingData})}
        >
          <Text style={styles.buttonText}>View Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToHomeButton}
          onPress={() => navigation.navigate('HomeScreen' )}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  reportContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 70, 
    height: 100,
    marginBottom: 10,
  },
  successText: {
    fontSize: 20, 
    color: '#005596', 
    fontWeight: 'bold', 
  },
  bookingInfo: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: '100%',
    paddingHorizontal: 40,
  },
  viewReportButton: {
    backgroundColor: '#005596', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%', 
  },
  backToHomeButton: {
    backgroundColor: '#424242', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%', 
  },
  buttonText: {
    color: '#FFF', 
    fontWeight: '600',
    textAlign: 'center', 
  },
});

export default GenerateReportAlertScreen;
