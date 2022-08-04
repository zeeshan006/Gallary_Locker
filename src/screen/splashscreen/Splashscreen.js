import { View, SafeAreaView} from 'react-native';
import React from 'react';
import Statusbar from '../../component/Statusbar'
import FastImage from 'react-native-fast-image';
export default function Splashscreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor:'#000000'
      }}>
      <Statusbar hide={true} />
      <FastImage
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../../assets/images/splashscreen.png')}
      />
    </SafeAreaView>
  );
}
