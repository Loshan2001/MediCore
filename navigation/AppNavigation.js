
import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Provides navigation context for the app
import { createStackNavigator } from '@react-navigation/stack'; // Creates stack-based navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Creates bottom tab-based navigation
import Icon from 'react-native-vector-icons/Ionicons'; // Icons for the bottom tab navigation

// Import all screens for the app navigation
import ReportScreen from '../screens/ReportScreen';
import GenerateReportScreen from '../screens/GenerateReportScreen';
import GenerateReportFilterScreen from '../screens/GenerateReportFilterScreen';
import GenerateReportAlertScreen from '../screens/GenerateReportAlertScreen';
import ReportViewScreen from '../screens/ReportViewScreen';
import AppointmentScreen from '../screens/Appointment/AppointmentScreen';                 
import DoctorSearchResultsScreen from '../screens/Appointment/DoctorSearchResultsScreen';   
import DoctorDetailScreen from '../screens/Appointment/DoctorDetailScreen';                 
import HospitalSearchResultsScreen from '../screens/Appointment/HospitalSearchResultsScreen'; 
import HospitalDetailScreen from '../screens/Appointment/HospitalDetailScreen';             
import AppointmentConfirmationScreen from '../screens/Appointment/AppointmentConfirmationScreen';
import Home from '../screens/Home';
// Import patient-related screens
import LoginScreen from '../screens/Patient/LoginScreen';
import SignUpScreen from '../screens/Patient/SignUpScreen';
import ProfileScreen from '../screens/Patient/ProfileScreen';
import AppointmentHistoryScreen from '../screens/Patient/AppointmentHistoryScreen';
import MedicalHistoryScreen from '../screens/Patient/MedicalHistoryScreen';
import UpdateAccountScreen from '../screens/Patient/UpdateAccountScreen';



// Create Stack Navigator and Bottom Tab Navigator instances
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the authentication flow (Login, SignUp)
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false  }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

// Stack Navigator for detailed stack-based flows
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
      <Stack.Screen name="GenerateReport" component={GenerateReportScreen} />
      <Stack.Screen name="GenerateReportFilter" component={GenerateReportFilterScreen} />
      <Stack.Screen name="GenerateReportAlert" component={GenerateReportAlertScreen} />
      <Stack.Screen name="ReportView" component={ReportViewScreen} />
      <Stack.Screen name="DoctorSearchResults" component={DoctorSearchResultsScreen} />
      <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
      <Stack.Screen name="HospitalSearchResults" component={HospitalSearchResultsScreen} />
      <Stack.Screen name="HospitalDetail" component={HospitalDetailScreen} />
      <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmationScreen} />
      <Stack.Screen name="AppointmentHistory" component={AppointmentHistoryScreen} />
      <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
      <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />
    </Stack.Navigator>
  );
};


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Assign different icons based on the route name
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Appointment') {
            iconName = 'calendar-outline'; // Icon for Appointment Screen
          } else if (route.name === 'Report') {
            iconName = 'document-text-outline'; // Icon for Report Screen
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          // Return the corresponding icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#397b9c',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
         
        },
      })}
    >
      {/* Existing screens */}
      <Tab.Screen name="Home" component={StackNavigator} />

      {/* New Appointment and Report Screens with icons */}
      <Tab.Screen name="Appointment" component={AppointmentScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />

      {/* Profile Screen */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


// Main App Navigation with conditional navigation
const AppNavigation = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Auth Stack: for screens without the bottom tab (like login/signup) */}
         
          <Stack.Screen name="Auth" component={AuthStack} />
          {/* Main Tab Navigator with bottom tabs */}
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

// Styling for Safe Area
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default AppNavigation;
