import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

const ScanScreen = ({ navigation }) => {
  const [scan, setScan] = useState(false);

  const handleBarCodeRead = ({ type, data }) => {
    setScan(false); // Stop scanning
    navigation.navigate('ResultScreen', { cipCode: data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scanner le code QR du médicament</Text>
      {scan && (
        <RNCamera
          style={styles.preview}
          onBarCodeRead={handleBarCodeRead}
          captureAudio={false}
        />
      )}
      {!scan && (
        <Button title="Démarrer le scan" onPress={() => setScan(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ScanScreen;
