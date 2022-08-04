import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';

const styles = StyleSheet.create({
  Image_View_HideGallery: {
    width: '33.3%',
    height: 140,
    marginBottom: '0.5%',
    marginLeft: '0.5%',
  },

  play_Btn_HideGallery: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header_HideGallery: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  image_header_View_HideGallery: {
    backgroundColor: Colors.PURPAL,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  image_Name_text_hideGallery: {
    color: Colors.WHITE,
    alignSelf: 'center',
    fontFamily: 'Sora-Regular',
    fontSize: 20,
    fontWeight: '600',
  },
  import_btn_hideGallery: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.DARK_PURPAL,
    justifyContent: 'center',
  },
  dot_btn_AllGallery: {
    height: 15,
    width: 15,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  view_All_Gallery: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  manu_View_All_Gallery: {
    marginTop: '10%',
    width: 250,
    marginRight: 100,
    backgroundColor: Colors.PURPAL,
    borderRadius: 12,
    borderColor: Colors.LIGHT_PURPAL,
    borderWidth: 1,
  },
  menu_Text_All_Gallery: {
    color: Colors.WHITE,
    alignSelf: 'center',
    fontFamily: 'Sora-Regular',
    fontSize: 14,
  },
  menu_Header_text_All_Gallery: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 3,
    marginLeft: '10%',
    fontFamily: 'Sora-Regular',
  },
  menu_itemTextView_All_Gallery: {
    justifyContent: 'center',
    marginVertical: -5,
    paddingLeft: 10,
    borderRadius: 12,
  },
  menu_itemText_All_Gallery: {
    fontSize: 16,
    fontFamily: 'Sora-Regular',
    color: Colors.WHITE,
  },
  image_header_View_HideGAllery: {
    backgroundColor: Colors.PURPAL,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  menuText_All_Gallery: {
    fontSize: 16,
    fontFamily: 'Sora-Regular',
    color: Colors.WHITE,
  },
  btn_view_All_Gallery: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.DARK_PURPAL,
    justifyContent: 'center',
    },

});
export default styles;