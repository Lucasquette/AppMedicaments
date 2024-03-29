import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ResultScreen = ({ route }) => {
  const { cipCode } = route.params;
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`http://192.168.56.1:3000/api/medicaments/${cipCode}`);
        const data = await response.json();
        if (response.status === 200) {
          setMedicine(data);
        } else {
          setMedicine({ name: 'Médicament non trouvé.' });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setMedicine({ name: 'Erreur de connexion au serveur.' });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [cipCode]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.infoText}>Nom du médicament: {medicine.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center'
  },
});

export default ResultScreen;
