import React from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
// import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';

const ReportViewScreen = ({ route }) => {
  const { bookingData } = route.params;

  const patientName = bookingData?.userId?.fullName;
  const doctorName = bookingData?.doctorId?.fullName;
  const hospitalName = bookingData?.appointmentId?.hospitalName;
  const specialization = bookingData?.doctorId?.specialization; 

  const createPDF = async () => {
    try {
      
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #ffffff;
                color: #333333;
                margin: 20px;
              }
              h1 {
                text-align: center;
                color: #005596;
                margin-bottom: 20px;
              }
              .invoice-container {
                border: 1px solid #ccc;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <h1>MEDICAL REPORT</h1>
              <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
              <table>
                <tr><th>Patient Name</th><td>${patientName}</td></tr>
                <tr><th>Doctor Name</th><td>${doctorName}</td></tr>
                <tr><th>Hospital Name</th><td>${hospitalName}</td></tr>
                <tr><th>Specialization</th><td>${specialization}</td></tr>
                <tr><th>Description</th><td>The patient underwent a successful surgical procedure on ${new Date().toLocaleDateString()}. Post-operative recovery has been uneventful, with the patient demonstrating good healing and minimal pain. Discharge instructions were provided, including wound care and activity restrictions.</td></tr>
              </table>
            </div>
          </body>
        </html>
      `;
  
      // Create the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      // console.log('PDF generated at:', uri);
      
      Alert.alert('Success', `PDF has been created successfully`);
      return uri;
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', `Failed to create the PDF: ${error.message}`);
    }
  };
  const shareReport = async () => {
    try {
      console.log('Initiating share process...');
      const pdfPath = await createPDF();
      if (!pdfPath) {
        console.log('PDF path is undefined, aborting share');
        return;
      }
  
      if (!(await Sharing.isAvailableAsync())) {
        console.log('Sharing is not available on this device');
        Alert.alert('Sharing is not available on this device');
        return;
      }
  
      console.log('Sharing PDF from path:', pdfPath);
      await Sharing.shareAsync(pdfPath, { mimeType: 'application/pdf', dialogTitle: 'Share Medical Report' });
      console.log('Share completed successfully');
    } catch (error) {
      console.error('Error sharing report:', error);
      Alert.alert('Error', `Failed to share the report: ${error.message}`);
    }
  };

  return (
    <LinearGradient
      colors={['#005596', '#ffffff']}
      style={styles.container}
    >
      <Text style={styles.title}>{patientName}'s Report</Text>
      <ScrollView style={styles.reportContainer}>
        <View style={styles.reportContent}>
          <Text style={styles.reportTitle}>MEDICAL REPORT</Text>
          <Text style={styles.reportDate}>Date: {new Date().toLocaleDateString()}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Patient Name:</Text>
            <Text style={styles.infoValue}>{patientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Doctor Name:</Text>
            <Text style={styles.infoValue}>{doctorName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hospital Name:</Text>
            <Text style={styles.infoValue}>{hospitalName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Specialization:</Text>
            <Text style={styles.infoValue}>{specialization}</Text>
          </View>
          <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>Description:</Text>
  <Text style={styles.infoValue}>
    The patient underwent a successful surgical procedure on <Text style={styles.redText}>{new Date().toLocaleDateString()}</Text>. Post-operative recovery has been uneventful, with the patient demonstrating good healing and minimal pain. Discharge instructions were provided, including wound care and activity restrictions.
  </Text>
</View>

        </View>
      </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  reportContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  reportContent: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005596',
    marginBottom: 10,
  },
  reportDate: {
    fontSize: 16,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: '40%',
  },
  infoValue: {
    width: '60%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#005596',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  redText: {
    color: 'green', // Set the text color to red
  },
  
});

export default ReportViewScreen;