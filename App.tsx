import React, {Component} from 'react'
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font';

import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';

import Tabs from './navigation'

const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold' : require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular' : require('./assets/fonts/Roboto-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Home'
      >
        <Drawer.Screen name="Home" component={Tabs} />
        <Drawer.Screen name="Quiz" component={QuizScreen} />
        <Drawer.Screen name='Result' component={ResultScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
