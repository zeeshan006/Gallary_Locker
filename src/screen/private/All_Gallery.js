import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import {Menu, MenuItem} from 'react-native-material-menu';
import All_Strings from '../../assets/stringConstants/All_Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statusbar from '../../component/Statusbar';
import Buttons from '../../component/Buttons';
import Colors from '../../assets/colors/Colors';
import Image_Path from '../../assets/image_path/Image_Path';
import styles from './Styles';
export default function All_Gallery({navigation, route}) {
  const dataNotCome = route?.params?.dataNotCome;
  const folderName = route?.params?.FolderName;
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState();
  const [selectAll, setAll] = useState(true);
  const [selectPhoto, setPhoto] = useState(false);
  const [selectVideo, setVideo] = useState(false);
  const [types, setType] = useState('All');
  const [fill, setFill] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [foldersName, setNameFolder] = useState('');
  // console.log('====================================');
  // console.log('Select Array""""""""""""""""""""""""""""""""', selectData);
  // console.log('====================================');
  const filterHandler = () => {
    setMenu(true);
  };
  const backHandler = () => {
    navigation.goBack(All_Strings.PRIVATE_SCREEN);
  };

  const storeData = async value => {
    try {
      if (selectData.length !== 0) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('rawData', jsonValue);
        if (dataNotCome) {
          navigation.push(All_Strings.HIDE_GALLERY, {
            dataCome: true,
            foldername: folderName,
            dataNotCome: true,
          });
        } else {
          navigation.navigate(All_Strings.PRIVATE_SCREEN, { dataCome: true })
        }
      } else {
        console.log('The Array is empty>>>>>>>>>>>>>>>>>>>>>>>>');
      }
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
    }
  };

  const getPhotos = async () => {
    Photo = await CameraRoll.getPhotos({
      first: 100000000,
      assetType: 'Photos',
    })
      .then(res => {
        console.log(res.edges.map(edge => edge.node));
        setData(res.edges.map(edge => edge.node));
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPhotos();
  }, [types]);
  useEffect(() => {
    const backAction = () => {
      navigation.push(All_Strings.PRIVATE_SCREEN);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const importHandler = () => {
    storeData(selectData);
  };

  const mangeSelected_data = (value, index) => {
    value.unique_index = index;
    const index_ = selectData.findIndex(data => data.unique_index === index);
    if (index_ >= 0) {
      selectData.splice(index_, 1)[0];
    } else {
      console.log('This is a image data......::::::::::;', value);
      setSelectData([
        ...selectData,
        {
          fileSize: value.fileSize,
          filename: value.filename,
          height: value.height,
          playableDuration: value.playableDuration,
          unique_index: value.unique_index,
          uri: 'file:///storage/emulated/0/Pictures/.Gallery_Locker/' +
          value.uri.substring(value.uri.lastIndexOf('/') + 1),
          width: value.width,
          uriImg: value.uri,
          lock:true,
        },
        
      ]);
      console.log(selectData);
    }
  };
const savePhotos =async (value) => {
  
    console.log(
      '--------------Hide_Photo-----------',
      item.uri.substring(item.uri.lastIndexOf('/') + 1),
    );

    try {
      
      console.log('Image is*******************:', value);
      const image = await CameraRoll.save(value, {
        album: '.Gallery_Locker',
      });

      if (image) {
       console.log('Successfully saved>>>>>>>>>>>>;')
      }
    } catch (error) {
      console.log('error', error);
    }

};
  
  const renderItem = ({item, index}) => {
    return (
      <>
        {item.image.uri.includes('jpg') ||
        item.image.uri.includes('png') ||
        item.image.uri.includes('jpeg') ||
        item.image.uri.includes('avif') ||
        item.image.uri.includes('jfif') ||
        item.image.uri.includes('jpeg') ||
        item.image.uri.includes('jpeg') ||
        item.image.uri.includes('jpeg') ||
        item.image.uri.includes('png') ? (
          <TouchableOpacity
            style={styles.Image_View_HideGallery}
              onPress={() => {
                CameraRoll.save(item?.image?.uri, {
                  album: '.Gallery_Locker',
                });
              mangeSelected_data(item.image, index);
              setFill(!fill);
            }}>
            <Image
              source={{uri: item?.image?.uri}}
              style={{height: 140, width: '100%'}}
            />
            <Image
              source={
                selectData.find(o => o.unique_index === index)
                  ? Image_Path.FILLED
                  : Image_Path.UNFILLED
              }
              style={styles.dot_btn_AllGallery}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.Image_View_HideGallery}
              onPress={() => {
              savePhotos(item.image.uri)
              mangeSelected_data(item.image, index);
              setFill(!fill);
            }}>
            <Image
              source={{uri: item?.image?.uri}}
              style={{height: 140, width: '100%'}}
            />
            <View style={styles.play_Btn_HideGallery}>
              <Image
                source={Image_Path.PLAY_BUTTON}
                style={{height: 30, width: 30, position: 'absolute'}}
                resizeMode={'contain'}
              />
            </View>
            <Image
              source={
                selectData.find(o => o.unique_index === index)
                  ? Image_Path.FILLED
                  : Image_Path.UNFILLED
              }
              style={styles.dot_btn_AllGallery}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={{backgroundColor: Colors.DARK_PURPAL, flex: 1}}>
      <Statusbar color={Colors.PURPAL} hide={false} />
      <View style={styles.view_All_Gallery}>
        <TouchableOpacity onPress={backHandler}>
          <Image
            source={Image_Path.BACK}
            style={{marginLeft: 5, width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Menu
          visible={menu}
          animationDuration={300}
          onRequestClose={() => {
            setMenu(false);
          }}
          style={styles.manu_View_All_Gallery}
          anchor={
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                margin: 15,
              }}
              onPress={filterHandler}>
              <Text style={styles.menu_Text_All_Gallery}>{types}</Text>
            </TouchableOpacity>
          }>
          <Text style={styles.menu_Header_text_All_Gallery}>
            Select an option
          </Text>
          <MenuItem
            style={styles.menu_itemTextView_All_Gallery}
            textStyle={styles.menu_itemText_All_Gallery}
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
              styles.menu_itemTextView_All_Gallery,
              {backgroundColor: selectPhoto ? Colors.LIGHT_PURPAL : null},
            ]}
            textStyle={styles.menuText_All_Gallery}
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
              styles.menu_itemTextView_All_Gallery,
              {backgroundColor: selectVideo ? Colors.LIGHT_PURPAL : null},
            ]}
            textStyle={styles.menuText_All_Gallery}
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
          width: '98%',
        }}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItem}
      />
      <View style={styles.btn_view_All_Gallery}>
        <Buttons
          text={selectData.length !== 0 ? 'Next' : 'Choose Photo'}
          onpress={importHandler}
        />
      </View>
    </View>
  );
}
