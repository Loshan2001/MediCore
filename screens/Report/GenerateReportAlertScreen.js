import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';

const GenerateReportAlertScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Success Icon with Text */}
      <View style={styles.reportContainer}>
        {/* You can use an image for the green checkmark icon */}
        <Image
        //   source={require('./assets/success-icon.png')} // Add the green checkmark icon image to assets
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8', // Light grey background color
  },
  reportContainer: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Grey background for the report container
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  successText: {
    fontSize: 18,
    color: '#4CAF50', // Green color for success text
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  viewReportButton: {
    backgroundColor: '#424242', // Dark grey for the "View Report" button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 20,
  },
  backToHomeButton: {
    backgroundColor: '#E0E0E0', // Light grey for "Back to Home" button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF', // White text color
    fontWeight: '600',
  },
});

export default GenerateReportAlertScreen;
