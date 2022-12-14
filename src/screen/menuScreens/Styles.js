import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';

const styles = StyleSheet.create({
  image_View_Change: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: '15%',
  },
  image_Locker_Change: {
    width: '80%',
    height: 150,
    marginLeft: '25%',
  },
  text_OldText_Change: {
    marginLeft: '12%',
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '300',
    fontSize: 15,
    marginBottom: 5,
  },
  error_View_Change: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  error_text_Change: {
    color: Colors.REd,
    fontFamily: 'Sora-Regular',
    textAlign: 'center',
    marginVertical: '3%',
    justifyContent: 'center',
  },
  input_View_Change: {
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.PURPAL,
    borderRadius: 15,
  },
  imputText_View_change: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: Colors.PURPAL,
    borderRadius: 15,
  },
  input_Text_Style_Change: {
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '300',
    fontSize: 18,
    marginVertical: 4,
    marginLeft: '2%',
    width: '80%',
  },
  img_view_Change: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '18%',
    paddingVertical: '3%',
  },
  img_style_Change: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modle_Whole_View_Change: {
    backgroundColor: '#0D082B99',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modle_view_Change: {
    width: '80%',
    height: 200,
    backgroundColor: '#2F1D59',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.DARK_PURPAL,
  },
  success_Text_View: {
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '400',
    fontSize: 15,
    marginBottom: '3%',
  },
  password_SaveText_Change: {
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: '10%',
  },
  done_text_Change: {
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '400',
    fontSize: 15,
    marginHorizontal: '7%',
    marginVertical: '3%',
  },
  text_feedback: {
    marginLeft: '12%',
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
  },
  text_EnterEmail_feedback: {
    marginLeft: '12%',
    color: Colors.WHITE,
    fontFamily: 'Sora-Regular',
    fontWeight: '300',
    fontSize: 15,
    marginBottom: 5,
  },
  view_Privcay: {width: '80%', alignSelf: 'center', marginTop: '10%'},
  text_Privacy: {
    fontSize: 18,
    fontFamily: 'Sora-Regular',
    color: Colors.WHITE,
    fontWeight: '300',
  },
});
export default styles;