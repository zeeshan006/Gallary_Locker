import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../assets/colors/Colors';
import Header from '../../component/Header';
import Statusbar from '../../component/Statusbar';
import Image_Path from '../../assets/image_path/Image_Path';
import UserTextInput from '../../component/UserTextInput';
import Buttons from '../../component/Buttons';
export default function Fingerprint({navigation}) {
  const backHandler = () => {
    navigation.goBack();
  }; 
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.DARK_PURPAL}}>
      <Statusbar color={Colors.DARK_PURPAL} hide={false} />
      <Header onpress={backHandler} text={'Fingerprint'} />
      <View style={{width: '80%', alignSelf:'center'}}>
        <Text
          style={{
            marginLeft:'5%',
            color: Colors.WHITE,
            fontFamily: 'Sora-Regular',
            fontWeight: '400',
            fontSize: 14,
          }}>
          Please add your fingerprint password
        </Text>
      </View>
    </ScrollView>
  );
}
