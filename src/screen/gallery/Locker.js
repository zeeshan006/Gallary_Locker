import {View, Text, ImageBackground, Image, Modal, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import Image_Path from '../../assets/image_path/Image_Path';
import Buttons from '../../component/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './Styles'; 
import Colors from '../../assets/colors/Colors';
import All_Strings from '../../assets/stringConstants/All_Strings';
import { useIsFocused } from '@react-navigation/native';

export default function Locker({ navigation, route }) {
   const dataCome = route?.params?.dataCome;
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [passwordNew, setPasswordNew] = useState()
  const [showModel, setModal] = useState(false);
  const focuse = useIsFocused();
  
 const [dataC, setDataC]=useState(false)
  const passwordHandler = text => {
    setPasswordNew(text);
    console.log('Password:::::', text);
  };
  const backBtnHandler = () => {
    setModal(false)
  }
  const confirmBtnHeandler = () => {getdata()}
  const getdata = () => {
    if (password === passwordNew) {
      setShow(false);
      setModal(false);
      setPasswordNew('')
      setDataC(false)
      navigation.navigate(All_Strings.PRIVATE_SCREEN, {
        dataCome: dataCome,
        Hidedata:false,
      });
    } else {
      console.log('Password is wrong:::::');
      setShow(true);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('password');
      if (value !== null) {
        console.log(value);
        setPassword(value)
      }
    } catch (e) {
      console.log(e);
    }
  };

 
  const onpres_Handler = () => {setModal(true) };
  useEffect(() => {
    getData()
  },[focuse])
  return (
    <View style={styles.lock_View}>
      <ImageBackground
        source={Image_Path.BACKGROUNG_IMAGE}
        style={{width: '100%', height: '100%'}}
      />
      <View style={styles.lock_Img_View}>
        <View style={styles.lock_Image_View}>
          <Image
            source={Image_Path.LOCK_IMAGE}
            style={{width: 65, height: 65, marginBottom: 25}}
          />

          <Text style={styles.lock_Private_Text}>Private files</Text>
          <Text style={styles.lock_Text}>
            Private gallery help you to make your data private and more secure.
          </Text>
          <Buttons
            text={'Enter Private Files '}
            onpress={onpres_Handler}
            color={Colors.PURPAL}
          />
        </View>
      </View>
      <Modal
        visible={showModel}
        transparent
        onRequestClose={() => setModal(false)}
        animationType="slide"
        hardwareAccelerated>
        <ScrollView style={styles.Password_View}>
          <View style={styles.text_view}>
            <View style={styles.back_Btn}>
              <TouchableOpacity onPress={backBtnHandler}>
                <Image source={Image_Path.BACK} style={styles.back_Btn_Image} />
              </TouchableOpacity>
              <Text style={styles.Create_Password_text}>Private files</Text>
            </View>
            <Text style={styles.Enter_text}>Enter your password</Text>
          </View>
          <View style={styles.locker_view}>
            <Image
              source={require('../../assets/images/locker.png')}
              style={styles.locker_Image}
            />
          </View>
          <View style={styles.otp_View}>
            <OTPInputView
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              keyboardType="number-pad"
              selectionColor={Colors.WHITE}
              onCodeFilled={passwordHandler}
              onCodeChanged={() => {
                setShow(false);
              }}
            />
          </View>
          {show ? (
            <View style={styles.error_View}>
              <Text style={styles.error_Text}>Wrong password!</Text>
            </View>
          ) : null}
          <View style={styles.btn_View}>
            <TouchableOpacity style={styles.finger_Print}>
              <Text style={styles.finger_Print_Text}>Use fingerprint</Text>
            </TouchableOpacity>
            <Buttons
              text={'Done'}
              color={Colors.PURPAL}
              onpress={confirmBtnHeandler}
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
