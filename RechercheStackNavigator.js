// src/RechercheStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RechercheScreen from './RechercheScreen';
import RechercheCode from './Recherche/RechercheCode'; // Assurez-vous que le fichier existe.
import RechercheQrCode from './Recherche/RechercheQrCode'; // Assurez-vous que le fichier existe.

const Stack = createStackNavigator();

const RechercheStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RechercheMain" component={RechercheScreen} />
      <Stack.Screen name="RechercheCode" component={RechercheCode} />
      <Stack.Screen name="RechercheQrCode" component={RechercheQrCode} />
    </Stack.Navigator>
  );
};

export default RechercheStackNavigator;
