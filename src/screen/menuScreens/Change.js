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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../component/Buttons';
import styles from './Styles';

export default function Change({ navigation }) {
  const [eyeShow, setEye] = useState(true);
  const [eyeNew, setEyeNew] = useState(true);
  const [oldpassword, setOldpassword] = useState();
  const [password, setPassword] = useState();
  const [newpassword, setNewPassword] = useState();
  const [storePassword, setStorePassword] = useState(false);
  const [errorShow, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    getData();
  });
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('password');
      if (value !== null) {
        setPassword(value);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('password', value);
      setError(false);
      setStorePassword(true);
      setOldpassword('');
      setNewPassword('');
    } catch (e) {
      console.log('Error', e);
    };
  }
    const backHandler = () => {
      navigation.goBack();
    };
    const sendBtnHandler = () => {
      if (oldpassword !== undefined && newpassword !== undefined) {
        if (oldpassword === password) {
          storeData(newpassword);
          setEmpty(false);
        } else {
          setEmpty(false)
          setError(true);
        }
      } else {
        setEmpty(true);
      }
    };
  const oldpasswordHandler = text => {
      setEmpty(false)
      setOldpassword(text);
    };
  const newpasswordHandler = text => {
      setEmpty(false)
      setNewPassword(text);
    };
    const eyeHandler = () => {
      setEyeNew(!eyeNew);
    };
    const eyeInvisibleHandler = () => {
      setEye(!eyeShow);
    };
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.DARK_PURPAL }}>
        <Statusbar color={Colors.DARK_PURPAL} hide={false} />
        <Header onpress={backHandler} text={'Change password'} />
        <View
          style={styles.image_View_Change}>
          <Image
            source={Image_Path.LOCKER}
            style={styles.image_Locker_Change}
          />
        </View>

        <View style={{ width: '100%', marginBottom: '5%' }}>
          <Text
            style={styles.text_OldText_Change}>
            Enter old password
          </Text>
          <UserTextInput
            placeholder={'Old password'}
            maxLength={4}
            onpress={eyeHandler}
            show={eyeNew}
            showEye={true}
            onChangeText={oldpasswordHandler}
            value={oldpassword}
            keyboardType={'number-pad'}
          />
        </View>
        {errorShow ? (
          <View
            style={styles.error_View_Change}>
            <Text
              style={styles.error_text_Change}>
              Old password is wrong!
            </Text>
          </View>
        ) : null}
        {empty ? (
          <View
            style={styles.error_View_Change}>
            <Text
              style={styles.error_text_Change}>
              Password field is empty!
            </Text>
          </View>
        ) : null}
        <View style={{ width: '100%' }}>
          <Text
            style={styles.text_OldText_Change}>
            Enter new password
          </Text>
          <View
            style={styles.input_View_Change}>
            <View
              style={styles.imputText_View_change}>
              <TextInput
                keyboardType={'number-pad'}
                secureTextEntry={eyeShow}
                placeholder={'New password'}
                placeholderTextColor={Colors.WHITE}
                maxLength={4}
                selectionColor={Colors.X_LIGHT_PURPAL}
                onChangeText={newpasswordHandler}
                value={newpassword}
                style={styles.input_Text_Style_Change}
              />

              <TouchableOpacity
                style={styles.img_view_Change}
                onPress={eyeInvisibleHandler}>
                <Image
                  source={eyeShow ? Image_Path.EYE_INVISIBLE : Image_Path.EYE}
                  style={styles.img_style_Change}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: '12%' }}>
          <Buttons text={'Save'} onpress={sendBtnHandler} />
        </View>
        <Modal
          visible={storePassword}
          transparent
          onRequestClose={() => setStorePassword(false)}
          animationType="slide"
          hardwareAccelerated>
          <View
            style={styles.modle_Whole_View_Change}>
            <View
              style={styles.modle_view_Change}>
              <Text
                style={styles.success_Text_View}>
                Success
              </Text>
              <Text
                style={styles.password_SaveText_Change}>
                Password saved
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: Colors.LIGHT_PURPAL, borderRadius: 10 }}
                onPress={() => {
                  setStorePassword(false);
                  navigation.goBack();
                }}>
                <Text
                  style={styles.done_text_Change}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }