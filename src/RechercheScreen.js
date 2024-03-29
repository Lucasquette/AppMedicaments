import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const RechercheScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('RechercheQrCode')} // Assurez-vous que le nom 'RechercheQrCode' correspond exactement au nom défini dans votre Stack.Navigator ou BottomTab.Navigator
      >
        <Text style={styles.buttonText}>Scanner QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('RechercheCode')} // Assurez-vous que le nom 'RechercheCode' correspond exactement au nom défini dans votre Stack.Navigator ou BottomTab.Navigator
      >
        <Text style={styles.buttonText}>Entrer le Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#73BD75',
    width: '80%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 3 },
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default RechercheScreen;
