import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const RechercheCode = () => {
  const [cipCode, setCipCode] = useState('');
  const [medicineName, setMedicineName] = useState('');

  const fetchMedicineName = async () => {
    try {
      const response = await fetch(`http://192.168.56.1:3000/api/medicaments/${cipCode}`);
      const data = await response.json();
      if (response.ok) {
        setMedicineName(data.name);
      } else {
        setMedicineName('Médicament non trouvé.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMedicineName('Erreur de connexion au serveur.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entrez le code CIP"
        placeholderTextColor="#5e8b7e" // Une teinte de vert plus foncé pour le placeholder
        value={cipCode}
        onChangeText={setCipCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={fetchMedicineName}>
        <Text style={styles.buttonText}>Rechercher le médicament</Text>
      </TouchableOpacity>
      {medicineName ? (
        <View style={styles.medicineContainer}>
          <Text style={styles.medicineNameLabel}>Nom du médicament:</Text>
          <Text style={styles.medicineName}>{medicineName}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonSignaler]} onPress={fetchMedicineName}>
            <Text style={styles.buttonText}>Signaler</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Un fond légèrement gris, propre et professionnel
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: 'white', // Fond blanc pour l'input
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5e8b7e', // Une bordure verte
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#5e8b7e', // Vert de la pharmacie
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Texte blanc pour contraster avec le bouton vert
    fontSize: 18,
  },
  buttonSignaler: {
    marginTop: 30,
  },
  medicineContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  medicineNameLabel: {
    fontSize: 16,
    color: '#5e8b7e', // Utiliser le vert pour le label
    textAlign: 'center',
  },
  medicineName: {
    fontSize: 24,
    color: '#3a5a40', // Un vert plus sombre pour le nom du médicament
    textAlign: 'center',
  },
});

export default RechercheCode;
