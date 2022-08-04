import * as React from 'react';
import {Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Image_Path from '../assets/image_path/Image_Path';
import All_Strings from '../assets/stringConstants/All_Strings';
import Colors from '../assets/colors/Colors';
import Home_Route from './Home_Route';
import Private_Route from './Private_Route';
const Tab = createMaterialTopTabNavigator();
export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.WHITE,
  tabBarInactiveTintColor: Colors.WHITE,
  tabBarPressOpacity: 1,
        tabBarIndicatorStyle: {
    backgroundColor: Colors.LIGHT_PURPAL,
    height: 3
        },
        tabBarStyle: {
          backgroundColor: Colors.X_PURPUL,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home_Route}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={Image_Path.FOCUS_HOME}
                style={{
                  tintColor: focused ? null : Colors.WHITE,
                  height: 25,
                  width: 25,
                }}
                resizeMethod="auto"
              />
            )
          }
            
        }}
      />
      <Tab.Screen
        name={All_Strings.PRIVATE}
        component={Private_Route}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              
                
                  <Image
                    source={Image_Path.FOCUS_LOCK}
                    style={{
                      tintColor: focused ? null : Colors.WHITE,
                      height: 25,
                      width: 25,
                    }}
                    resizeMethod="auto"
                  />
                ) 
          },
        }}
      />
    </Tab.Navigator>
  );
}
