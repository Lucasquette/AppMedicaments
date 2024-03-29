// Importations nécessaires
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

// Configuration des routes
export const routes = {
  accueil: { name: 'Accueil', icon: 'home' },
  carte: { name: 'Carte', icon: 'enviromento' },
  recherche: { name: 'Recherche', icon: 'search1' },
  compte: { name: 'Compte', icon: 'user' },
};

// Dimensions et calculs
const { width } = Dimensions.get('window');
const TAB_WIDTH = (width - 40 * 2) / 4;
const ICON_SIZE = 24; // La taille de votre icône
const PADDING = 10; // L'espace autour de l'icône dans la bulle
const BUBBLE_SIZE = ICON_SIZE + PADDING * 2; // La taille totale de la bulle autour de l'icône

// Composant TabBarComponent
const TabBarComponent = ({ state, navigation, descriptors }) => {
  const translateX = useSharedValue(0);
  const focusedTab = state.index;

  const handleAnimate = (index) => {
    'worklet';
    translateX.value = withTiming(index * TAB_WIDTH + (TAB_WIDTH - BUBBLE_SIZE) / 2, {
      duration: 500,
    });
  };

  useEffect(() => {
    runOnUI(handleAnimate)(focusedTab);
  }, [focusedTab]);

  const rnStyle = useAnimatedStyle(() => {
    return {
      width: BUBBLE_SIZE,
      height: BUBBLE_SIZE,
      borderRadius: BUBBLE_SIZE / 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#73BD75',
      position: 'absolute',
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <>
      <Animated.View style={[styles.container, rnStyle]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const routeName = route.name.toLowerCase();
        const icon = routes[routeName]?.icon;

        return (
          <Pressable
            key={`route-${index}`}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
          >
            <AntDesign
              name={icon}
              size={ICON_SIZE}
              color={isFocused ? '#A9A9A9' : 'black'}
            />
          </Pressable>
        );
      })}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // La définition de width, height, et borderRadius a été déplacée dans rnStyle
    marginHorizontal: 20,
    // Les autres styles de container qui ne changent pas
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Les autres styles que vous pourriez avoir besoin...
});

// Exportation du composant TabBarComponent
export default TabBarComponent;
