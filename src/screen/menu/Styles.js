import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';

const styles = StyleSheet.create({
  menu_View: {flex: 1, backgroundColor: Colors.DARK_PURPAL},
  menu: {position: 'absolute', bottom: 0, top: 0, width: '100%'},
  menu_Header: {width: '90%', alignSelf: 'center'},
  menu_Image: {
    fontFamily: 'Sora-Regular',
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    },
    menu_text_list: {
        fontFamily: 'Sora-Regular',
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: '400',
    }
                  
});
export default styles;