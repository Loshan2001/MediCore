import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const GenerateReportAlertScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#005596', '#ffff']} // Gradient background
      style={styles.container}
    >
      {/* Success Icon with Text */}
      <View style={styles.reportContainer}>
        <Image
           source={ {uri: 'https://www.freeiconspng.com/thumbs/report-icon/report-icon-20.png'}} // Add your success icon here
          style={styles.icon}
        />
        <Text style={styles.successText}>Report Generated Successfully</Text>
      </View>

      {/* Buttons: View Report and Back to Home */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewReportButton}
          onPress={() => navigation.navigate('ReportView')}
        >
          <Text style={styles.buttonText}>View Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToHomeButton}
          onPress={() => navigation.navigate('Home')}
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
    backgroundColor: '#FFFFFF', // White background for contrast
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
    width: 70, // Increased size for better visibility
    height: 100,
    marginBottom: 10,
  },
  successText: {
    fontSize: 20, // Slightly larger font size
    color: '#005596', // Green color for success text
    fontWeight: 'bold', // Bold text for emphasis
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust space evenly between buttons
    width: '100%',
    paddingHorizontal: 40,
  },
  viewReportButton: {
    backgroundColor: '#005596', // Button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%', // Adjust width to allow both buttons to fit
  },
  backToHomeButton: {
    backgroundColor: '#424242', // Dark grey for "Back to Home" button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%', // Same width as the other button
  },
  buttonText: {
    color: '#FFF', // White text color
    fontWeight: '600',
    textAlign: 'center', // Center align text
  },
});

export default GenerateReportAlertScreen;
