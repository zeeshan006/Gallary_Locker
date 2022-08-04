import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import All_Strings from '../assets/stringConstants/All_Strings';
import { PrivateScreen,Locker, All_Gallery , HideGallery} from '../screen';
const Stack = createStackNavigator();

export default function Private_Route() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: false,
        cardOverlayEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={All_Strings.LOCKER} component={Locker} />
      <Stack.Screen
        name={All_Strings.PRIVATE_SCREEN}
        component={PrivateScreen}
      />
      <Stack.Screen name={All_Strings.ALL_GALLERY} component={All_Gallery} />
      <Stack.Screen name={All_Strings.HIDE_GALLERY} component={HideGallery} />
    </Stack.Navigator>
  );
}
