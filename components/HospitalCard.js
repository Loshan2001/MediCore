// src/components/HospitalCard.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HospitalCard = ({ hospital, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>{hospital.name}</Text>
        <Text style={styles.address}>{hospital.address}</Text>
        <Button title="View" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    color: '#777',
  },
});

export default HospitalCard;
