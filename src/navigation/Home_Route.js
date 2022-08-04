import React from 'react'
import {
  createStackNavigator,
  // CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import All_Strings from '../assets/stringConstants/All_Strings';
import { Gallery, HomeScreen } from '../screen';
const Stack = createStackNavigator();


export default function Home_Route() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: false,
        cardOverlayEnabled: false,
        ...TransitionPresets.DefaultTransition,
      }}>
      <Stack.Screen name={All_Strings.HOMESCREEN} component={HomeScreen} />
      <Stack.Screen name="Gallery" component={Gallery} />
    </Stack.Navigator>
  );
}