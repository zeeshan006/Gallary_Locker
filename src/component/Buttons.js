import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Colors from '../assets/colors/Colors';
export default function Buttons({text, onpress}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.LIGHT_PURPAL,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
     onPress={onpress}
    >
      <Text
        style={{
          paddingVertical: 15,
          color: Colors.WHITE,
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Sora-Regular',
        }}>
       {text}
      </Text>
    </TouchableOpacity>
  );
}
