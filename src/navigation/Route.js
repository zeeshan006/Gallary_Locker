import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
// import 'react-native-gesture-handler';
import {TouchableOpacity, Image} from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Splashscreen,
  Password_Confirm,
  Password_Create,
  Menu,
  Privacy,
  Change,
  Feedback,
  Rateus,
  Fingerprint,
  PhotoViewer,
  PhotoViewerLocker,
} from '../screen';
import Tap_Route from '../navigation/Tap_Route';
import All_Strings from '../assets/stringConstants/All_Strings';
import Colors from '../assets/colors/Colors';
import Image_Path from '../assets/image_path/Image_Path';

const Stack = createStackNavigator();
export default function Route() {
  const [password, setPassword] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    getData();
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('password');
      if (value !== null) {
        setPassword(value);
        console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={All_Strings.SPLASHSCREEN}
        screenOptions={{
          // headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
          cardOverlayEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {show ? (
          <Stack.Screen
            name={All_Strings.SPLASHSCREEN}
            component={Splashscreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
              animationEnabled: true,
              cardOverlayEnabled: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        ) : null}
        {password === 0 ? (
          <>
            <Stack.Screen
              name={All_Strings.PASSWORD_CREATE}
              component={Password_Create}
              options={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: true,
                cardOverlayEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name={All_Strings.PASSWORD_COMFIRM}
              component={Password_Confirm}
              options={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: true,
                cardOverlayEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
          </>
        ) : null}

        <Stack.Screen
          name="Tab_Route"
          component={Tap_Route}
          options={({navigation}) => ({
            title: 'Gallery Locker',
            headerStyle: {
              backgroundColor: Colors.PURPAL,
            },

            headerTintColor: Colors.WHITE,
            headerTitleStyle: {
              marginLeft: -20,
              fontWeight: '600',
              fontSize: 17,
              fontFamily: 'Sora-Regular',
            },
            // headerLeft: () => <></>,
            headerLeft: () => {
              return (
                <TouchableOpacity
                  style={{padding: 20}}
                  onPress={() => {
                    navigation.navigate('Menu');
                  }}>
                  <Image
                    source={Image_Path.MENU_ICON}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name={All_Strings.MENU}
          component={Menu}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name={All_Strings.POLICY}
          component={Privacy}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name={All_Strings.CHANGE_PASSWORD}
          component={Change}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name={All_Strings.RATE_US}
          component={Rateus}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name={All_Strings.FEEDBACK}
          component={Feedback}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name={All_Strings.FINGERPRINT}
          component={Fingerprint}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name={All_Strings.PHOTO_VIEWER}
          component={PhotoViewer}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      <Stack.Screen
          name={All_Strings.PHOTO_VIEWER_LOCKER}
          component={PhotoViewerLocker}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
