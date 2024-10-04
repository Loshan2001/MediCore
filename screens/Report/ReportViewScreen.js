import React from 'react';
import { View, Text, Image, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';
import { PermissionsAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const ReportViewScreen = () => {
  // PDF Generation Function
  const createPDF = async () => {
    try {
      // Requesting storage permission for Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download the PDF',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission is required to download the report.');
          return;
        }
      }

      // HTML content of the PDF
      const htmlContent = `
        <html>
          <body>
            <h1 style="text-align: center;">Dr. Rajiv Nirmal Report</h1>
            <img src="https://eforms.com/images/2016/10/medical-invoice-template.png'" alt="Report Image" style="width:100%; height:auto;"/>
            <p style="text-align: center;">Report Details...</p>
          </body>
        </html>
      `;

      // Generate the PDF
      const options = {
        html: htmlContent,
        fileName: 'medical_report',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF has been downloaded to: ${file.filePath}`);
      return file.filePath; // Return the file path for sharing
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'Failed to download the report.');
    }
  };

  // Sharing Function
  const shareReport = async () => {
    try {
      // Generate PDF and get its path
      const pdfPath = await createPDF();
      if (!pdfPath) {
        return; // If PDF generation fails, exit
      }

      // Share the PDF using a general share dialog
      const shareOptions = {
        title: 'Share Report',
        url: `file://${pdfPath}`, // Sharing as a file
        message: 'Here is your medical report.',
        type: 'application/pdf',
      };

      await Sharing.shareAsync(shareOptions.url); // Use expo-sharing
    } catch (error) {
      console.error('Error sharing report:', error);
      Alert.alert('Error', 'Failed to share the report.');
    }
  };

  return (
    <LinearGradient
    colors={['#005596', '#ffff']}// Gradient background
      style={styles.container}
    >
      <Text style={styles.title}>Dr. Rajiv Nirmal Report</Text>
      <Image
        source={{ uri: 'https://eforms.com/images/2016/10/medical-invoice-template.png' }}
        style={styles.reportImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={createPDF}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={shareReport}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24, // Larger font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Dark grey color for contrast
  },
  reportImage: {
    width: '100%', // Make the image responsive
    height: 500,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10, // Rounded corners for the image
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#005596', // Button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%', // Adjust button width
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF', // White text color
    fontWeight: '600',
  },
});

export default ReportViewScreen;
