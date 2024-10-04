import React from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';

// Example usage
async function shareContent() {
  await Sharing.shareAsync('file://path/to/file'); // Update with the actual file path
}

import { PermissionsAndroid } from 'react-native';

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
            <h1>Dr. Rajiv Nirmal Report</h1>
            <img src="https://example.com/report.png" alt="Report Image" style="width:100%; height:auto;"/>
            <p>Report Details...</p>
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

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing report:', error);
      Alert.alert('Error', 'Failed to share the report.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dr. Rajiv Nirmal Report</Text>
      <Image
        source={{ uri: 'https://example.com/report.png' }}
        style={styles.reportImage}
      />
      <View style={styles.buttonContainer}>
        <Button title="Download" onPress={createPDF} />
        <Button title="Share" onPress={shareReport} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reportImage: {
    width: 300,
    height: 400,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ReportViewScreen;