import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Image_Path from '../assets/image_path/Image_Path';
import Colors from '../assets/colors/Colors';
export default function Header({ text , onpress}) {
  return (
    <View
      style={{
        width: '98%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{padding: 5,}}
        onPress={onpress}>
        <Image
          source={Image_Path.BACK}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          color: Colors.WHITE,
          fontSize: 22,
          fontWeight: '400',
          marginLeft: 10,
        }}>
        {text}
      </Text>
    </View>
  );
}
