import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Statusbar from '../../component/Statusbar';
import Colors from '../../assets/colors/Colors';
import Buttons from '../../component/Buttons';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
export default function Password_Confirm({ route, navigation }) {
  const { password } = route.params;
  const [pasword, setPassword] = useState();
  const [show, setShow] = useState(false)
  
  const passwordHandler = (text) => {
    setPassword(text);
    console.log('Password:::::', text);
  }
  const confirmBtnHeandler = () => {
    if (password === pasword) {
      setShow(false)
      dataStore([password])
    } else {
      console.log('Password is wrong:::::');
      setShow(true)
    }
  }
    const dataStore = async value => {
      try {
        await AsyncStorage.setItem('password', value.toString());
        navigation.navigate('Tab_Route');
        console.log('Password is store');
      } catch (e) {
        console.log('Error', e);
      }
    };

    return (
      <ScrollView style={styles.Password_View}>
        <Statusbar color={Colors.DARK_PURPAL} hide={false} />
        <View style={styles.text_view}>
          <Text style={styles.Create_Password_text}>Confirm Password</Text>
          <Text style={styles.Enter_text}>
            Enter a password for make your gallery more save and secure
          </Text>
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
            secureTextEntry={true}
            onCodeChanged={() => {
              setShow(false);
            }}
          />
        </View>
        {show ? (
          <View style={styles.error_View}>
            <Text style={styles.error_Text}>Password are not match!</Text>
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
    );
  }

