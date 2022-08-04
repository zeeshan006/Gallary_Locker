import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler
} from 'react-native';
import React, {useState,useEffect} from 'react';
import Statusbar from '../../component/Statusbar';
import Colors from '../../assets/colors/Colors';
import Image_Path from '../../assets/image_path/Image_Path';
import All_Strings from '../../assets/stringConstants/All_Strings';
import styles from './Styles';

export default function Menu({navigation}) {
  const [data, setData] = useState([
    {
      image: Image_Path.FINGER,
      text: 'Fingerprint ',
      screen: All_Strings.FINGERPRINT,
    },
    {
      image: Image_Path.FEEDBACK,
      text: 'Feedback ',
      screen: All_Strings.FEEDBACK,
    },
    {
      image: Image_Path.CHANGE_PASSWORD,
      text: 'Change password ',
      screen: All_Strings.CHANGE_PASSWORD,
    },
    {
      image: Image_Path.RATE,
      text: 'Rate us ',
      screen: All_Strings.RATE_US,
    },
    {
      image: Image_Path.SHARE,
      text: 'Share app',
      screen: All_Strings.POLICY,
    },
    {
      image: Image_Path.POLICY,
      text: 'Privacy policy',
      screen: All_Strings.POLICY,
    },
    {
      image: Image_Path.ADD_REMOVE,
      text: 'Remove ads',
      screen: All_Strings.POLICY,
    },
  ]);
 const onpressHandler = (value) => {
    
  };
   useEffect(() => {
     const backAction = () => {
       navigation.goBack();
       return true;
     };

     const backHandler = BackHandler.addEventListener(
       'hardwareBackPress',
       backAction,
     );

     return () => backHandler.remove();
   }, []);
  return (
    <View style={styles.menu_View}>
      <Statusbar color={Colors.DARK_PURPAL} hide={false} />
      <ImageBackground
        source={Image_Path.MENU_BACKGROUND}
        style={{width: '100%', height: '100%'}}
      />
      <View style={styles.menu}>
        <View style={styles.menu_Header}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              marginVertical: '5%',
              marginBottom: '10%',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={Image_Path.MENU_ICON}
            />

            <Text
              style={styles.menu_Image}>
              Menu{' '}
            </Text>
          </TouchableOpacity>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{marginVertical: '5%', flexDirection: 'row'}}
                    onPress={() => {
                        navigation.navigate(item.screen);
                    }}
                >
                <Image
                  source={item.image}
                  style={{width: 22, height: 22, marginRight: '5%'}}
                  resizeMode={'contain'}
                />
                <Text
                  style={styles.menu_text_list}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}
