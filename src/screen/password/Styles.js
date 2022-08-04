import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';
const styles = StyleSheet.create({
  Password_View: {
    flex: 1,
    backgroundColor: Colors.DARK_PURPAL,
  },
  text_view: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: '5%',
    paddingTop: '10%',
  },
  Create_Password_text: {
    fontFamily: 'Sora-Regular',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 17,
    color: Colors.WHITE,
  },
 
  Enter_text: {
    fontFamily: 'Sora-Regular',
    fontWeight: '200',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.WHITE,
    lineHeight: 22,
  },
  
  locker_view: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: '3%',
  },
  locker_Image: {
    width: '80%',
    height: 150,
    marginLeft: '25%',
  },

  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 13,
    borderBottomWidth: 1,
    color: Colors.WHITE,
    fontSize: 29,
    fontFamily: 'Sora-Regular',
  },

  underlineStyleHighLighted: {
    borderColor: Colors.LIGHT_PURPAL,
  },
  otp_View: {
    width: '80%',
    height: 80,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  error_View: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    // borderWidth: 1,
    // borderColor:Colors.REd,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error_Text: {
    color: Colors.REd,
    fontFamily: 'Sora-Regular',
    textAlign: 'center',
    marginVertical: '3%',
    justifyContent: 'center',
  },
  btn_View: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: '5%',
  },
  finger_Print: {
    alignItems: 'center',
    marginVertical: '5%',
  },
  finger_Print_Text: {color: Colors.SKY_BLUE, fontFamily: 'Sora-Regular'},
});

export default styles;
