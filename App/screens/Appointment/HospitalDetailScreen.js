import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const HospitalDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { hospitalName } = route.params;
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/hospital/search?hospitalName=${hospitalName}`
        );
        const data = await response.json();
        
        // Ensure the data is what you expect
        // console.log('API Response:', data); // Log the response for debugging

        setHospitals(data); // Adjust based on the actual structure of your API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [hospitalName]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.hospital.imageUrl || "https://via.placeholder.com/50",
        }}
        style={styles.hospitalImage}
      />
      <View style={styles.hospitalInfo}>
        <Text style={styles.hospitalName}>{item.hospital.name}</Text>
        <Text style={styles.hospitalAddress}>{item.hospital.address}</Text>
        <Text style={styles.doctorName}>👨‍⚕️ {item.doctorName}</Text>
        <Text style={styles.hospitalPhone}>📞 {item.hospital.number}</Text>
      </View>
      <View style={styles.cityContainer}>
        <Text style={styles.cityText}>{item.hospital.city}</Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            navigation.navigate("HospitalSearchResults", {
              hospital: {
                id : item.hospital._id,
                name: item.hospital.name,
                location: item.hospital.address,
                phone: item.hospital.number,
                city: item.hospital.city,
                
              },
              doctorName: item.doctorName,
              userId : item.user._id,
              appointment_id : item._id
            })
          }
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005596" />
        <Text>Loading hospitals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (hospitals.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text>No more appointments</Text> {/* Display message when no hospitals found */}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#005596", "#ffffff"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.header}>Search Results (Hospital)</Text>
        <FlatList
          data={hospitals}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.hospital._id}-${item.doctorName}`} // Ensures unique key
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.paginationContainer}>
          <Text style={styles.pageNumber}>1</Text>
          <Text style={styles.pageNumber}>2</Text>
          <Text style={styles.pageNumber}>3</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  hospitalImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hospitalAddress: {
    fontSize: 14,
    color: "#777",
  },
  hospitalPhone: {
    fontSize: 14,
    color: "#777",
  },
  cityContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  viewButton: {
    borderColor: "#005596",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewButtonText: {
    color: "#005596",
    fontSize: 14,
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  pageNumber: {
    fontSize: 18,
    paddingHorizontal: 10,
    backgroundColor: "#3333",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HospitalDetailScreen;
