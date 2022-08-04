import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Statusbar from '../../component/Statusbar';
import Colors from '../../assets/colors/Colors';
import Buttons from '../../component/Buttons';
import styles from './Styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
export default function Password_Create({navigation}) {
  const [password, setPassword] = useState(0);
  const [show, setShow] = useState(false);
  const [unComplete, setUnComplete]=useState(false)
  const passwordHandler = text => {
    setPassword(text);
    console.log('password::::',text);
  };
  const doneBtnHeandler = () => {
    console.log(password);
    if (password !== 0) {
      if (!password.match(/^[0-9]{4}$/)) {
        console.log('Password is not save:::');
        setPassword('');
        setUnComplete(false);
        setShow(true);
      } else {
        setShow(false); 
        setUnComplete(false);
         navigation.navigate('Password_Confirm', { password: password });
      }
    } else {
      setUnComplete(true)
      console.log('Paaword are not complete');
    }
  };
  return (
    <ScrollView style={styles.Password_View}>
      <Statusbar color={Colors.DARK_PURPAL} hide={false} />
      <View style={styles.text_view}>
        <Text style={styles.Create_Password_text}>Create Password</Text>
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
          <Text style={styles.error_Text}>Only numbers are allowed. (0-9)</Text>
        </View>
      ) : null}
      {unComplete ? (
        <View style={styles.error_View}>
          <Text style={styles.error_Text}>Please enter 4 digit password!</Text>
        </View>
      ) : null}
      <View style={styles.finger_Print}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginVertical: '5%',
          }}>
          <Text style={styles.finger_Print_Text}>Use fingerprint</Text>
        </TouchableOpacity>
        <Buttons
          text={'Done'}
          color={Colors.PURPAL}
          onpress={doneBtnHeandler}
        />
      </View>
    </ScrollView>
  );
}
