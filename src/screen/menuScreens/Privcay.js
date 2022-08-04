import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import Statusbar from '../../component/Statusbar'
import Colors from '../../assets/colors/Colors'
import styles from './Styles'
export default function Privcay({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: Colors.DARK_PURPAL}}>
      <Statusbar color={Colors.DARK_PURPAL} hide={false} />
      <Header
        text={'Privacy Policy'}
        onpress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.view_Privcay}>
        <Text
          style={styles.text_Privacy}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          {'\n'} {'\n'}
          {'\n'}Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{'\n'} {'\n'}
          {'\n'} Excepteur sint occaecat cupidatat non proident, sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </View>
  );
}