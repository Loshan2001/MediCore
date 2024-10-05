import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import all screens for the app navigation
import ReportScreen from '../screens/Report/ReportScreen';
import GenerateReportScreen from '../screens/Report/GenerateReportScreen';
import GenerateReportFilterScreen from '../screens/Report/GenerateReportFilterScreen';
import GenerateReportAlertScreen from '../screens/Report/GenerateReportAlertScreen';
import ReportViewScreen from '../screens/Report/ReportViewScreen';
import AppointmentScreen from '../screens/Appointment/AppointmentScreen';
import DoctorSearchResultsScreen from '../screens/Appointment/DoctorSearchResultsScreen';
import DoctorDetailScreen from '../screens/Appointment/DoctorDetailScreen';
import HospitalSearchResultsScreen from '../screens/Appointment/HospitalSearchResultsScreen';
import HospitalDetailScreen from '../screens/Appointment/HospitalDetailScreen';
import AppointmentConfirmationScreen from '../screens/Appointment/AppointmentConfirmationScreen';
import Home from '../screens/Report/Home';
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

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="GenerateReport" component={GenerateReportScreen} />
    <Stack.Screen name="GenerateReportFilter" component={GenerateReportFilterScreen} />
    <Stack.Screen name="GenerateReportAlert" component={GenerateReportAlertScreen} />
    <Stack.Screen name="ReportView" component={ReportViewScreen} />
  </Stack.Navigator>
);

const AppointmentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
    <Stack.Screen name="DoctorSearchResults" component={DoctorSearchResultsScreen} />
    <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
    <Stack.Screen name="HospitalSearchResults" component={HospitalSearchResultsScreen} />
    <Stack.Screen name="HospitalDetail" component={HospitalDetailScreen} />
    <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmationScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="AppointmentHistory" component={AppointmentHistoryScreen} />
    <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
    <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Appointment') iconName = 'calendar-outline';
        else if (route.name === 'Report') iconName = 'document-text-outline';
        else if (route.name === 'Profile') iconName = 'person-outline';
        return <Icon name={iconName} size={size} color="white" />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#005596',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderTopWidth: 0,
      },
      tabBarItemStyle: {
        paddingBottom: 9,
        paddingTop: 10,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Appointment" component={AppointmentStack} />
    <Tab.Screen name="Report" component={ReportScreen} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#005596');
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#005596" barStyle="light-content" /> 
      <SafeAreaView style={styles.safeArea}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#005596',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default AppNavigation;