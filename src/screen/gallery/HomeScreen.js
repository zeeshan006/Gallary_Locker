import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  BackHandler,
  Modal
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import {Menu, MenuItem} from 'react-native-material-menu';
import Colors from '../../assets/colors/Colors';
import {useIsFocused} from '@react-navigation/native';
import styles from './Styles';
import Statusbar from '../../component/Statusbar';
export default function HomeScreen({navigation}) {
  const [img, setImage] = useState([]);
  const [album, setAlbum] = useState([]);
  const [selectAll, setAll] = useState(true);
  const [selectPhoto, setPhoto] = useState(false);
  const [selectVideo, setVideo] = useState(false);
  const [types, setType] = useState('All');
  const data_Mange = [];
  const [menu, setMenu] = useState(false);
  const focuse = useIsFocused();
  const filterHandler = () => {
    setMenu(true);
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
        getAlbums();
      }
    } else {
      getPhotos();
      getAlbums();
    }
  };

  const getAlbums = () => {
    CameraRoll.getAlbums({
      assetType: types,
    })
      .then(res => {
        setAlbum(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPhotos = async () => {
    Photo = await CameraRoll.getPhotos({
      first: 1000000,
      assetType: types,
    })
      .then(res => {
        setImage(res.edges.map(edge => edge.node));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const mangeData = () => {
    album.map(ele => {
      console.log('====================================');
      console.log(ele);
      console.log('====================================');
      for (let i = 0; i < img.length; i++) {
        if (ele.title === img[i].group_name) {
          console.log('I m Here::::::');
          let arr = [];
          let j = 0;
          if (ele.title !== arr[j]) {
            data_Mange.push({
              title: ele.title,
              conter: ele.count,
              image: img[i].image,
            });
          }
          break;
        }
      }
    });
  };

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.home_Folder_Image}
        onPress={() => {
          console.log(item);
          navigation.navigate('Gallery', {title: item.title, type: types});
        }}>
        <Image
          source={{uri: item.image.uri}}
          style={{height: 140, width: '100%', borderRadius: 15}}
        />
        <View style={styles.home_Folder_Text_View}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text
              style={{
                color: Colors.WHITE,
                marginLeft: 3,
                fontSize: 12,
                fontWeight: '400',
                fontFamily: 'Sora-Regular',
              }}>
              {item?.title.length > 8
                ? `${item?.title.substr(0, 8)}` + `...`
                : item?.title}
            </Text>
          </View>
          <View style={styles.home_Folder_Text}>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 12,
                fontWeight: '400',
                fontFamily: 'Sora-Regular',
              }}>
              {item.conter}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      askPermission();
    }, 500);
  }, [types, focuse]);

  return (
    <View style={styles.home_View}>
      {mangeData()}
      <Statusbar color={Colors.PURPAL} hide={false} />
      <View style={{width: '100%', alignItems: 'flex-end'}}>
        <Menu
          visible={menu}
          animationDuration={300}
          onRequestClose={() => {
            setMenu(false);
          }}
          style={styles.menu}
          anchor={
            <TouchableOpacity
              style={styles.home_Filter_View}
              onPress={filterHandler}>
              <Text style={styles.home_Filter_text}>Filter </Text>
              <Image
                source={require('../../assets/icons/filter.png')}
                style={styles.home_Filter_Icon}
              />
            </TouchableOpacity>
          }>
          <Text style={styles.Menu_Header}>Select an option</Text>
          <MenuItem
            style={[
              styles.Menu_Text_Container,
              {backgroundColor: selectAll ? Colors.LIGHT_PURPAL : null},
            ]}
            textStyle={styles.Menu_Text}
            pressColor={Colors.LIGHT_PURPAL}
            onPress={() => {
              setAll(true);
              setPhoto(false);
              setVideo(false);
              setMenu(false);
              setType('All');
            }}>
            All
          </MenuItem>
          <MenuItem
            style={[
              styles.Menu_Text_Container,
              {backgroundColor: selectPhoto ? Colors.LIGHT_PURPAL : null},
            ]}
            textStyle={styles.Menu_Text}
            pressColor={Colors.LIGHT_PURPAL}
            onPress={() => {
              setAll(false);
              setPhoto(true);
              setVideo(false);
              setMenu(false);
              setType('Photos');
            }}>
            Photos
          </MenuItem>
          <MenuItem
            style={[
              styles.Menu_Text_Container,
              {backgroundColor: selectVideo ? Colors.LIGHT_PURPAL : null},
            ]}
            textStyle={styles.Menu_Text}
            pressColor={Colors.LIGHT_PURPAL}
            onPress={() => {
              setAll(false);
              setPhoto(false);
              setVideo(true);
              setMenu(false);
              setType('Videos');
            }}>
            Videos
          </MenuItem>
        </Menu>
      </View>

      <FlatList
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          width: '92%',
          // alignSelf: 'center',
        }}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={data_Mange}
        renderItem={renderItem}
      />
     
    </View>
  );
}
