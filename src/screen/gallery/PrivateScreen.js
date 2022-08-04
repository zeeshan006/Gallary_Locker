import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  BackHandler,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import styles from './Styles';
import Statusbar from '../../component/Statusbar';
import Image_Path from '../../assets/image_path/Image_Path';
import All_Strings from '../../assets/stringConstants/All_Strings';
import Buttons from '../../component/Buttons';
import {useIsFocused} from '@react-navigation/native';
import UserTextInput from '../../component/UserTextInput';
import All_Gallery from '../private/All_Gallery';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function PrivateScreen({navigation, route}) {
  const dataCome = route?.params?.dataCome;
  const hidedata = route?.params?.Hidedata;
  const [nameFolder, setNameFolder] = useState('Default');
  const [showInput, setShowInput] = useState(false);
  const [showNxtScreenBtn, setShowNxtScreenBtn] = useState(false);
  const [showrmdr, setshowrmdr] = useState(false);
  const isFocused = useIsFocused();
  const [show, setShow] = useState(false);
  console.log('this is the data::::', dataCome);
  const [photo, setPhoto] = useState([
    {
      image: Image_Path.ADD_IMAGE,
      folder_Name: 'Add Album',
      counter: ' ',
    },
  ]);
  let array = photo;
  const arrayPhoto = [
    ...new Map(array.map(item => [JSON.stringify(item), item])).values(),
  ];
  var uniq = {};
  var arrFiltered = arrayPhoto.filter(
    obj => !uniq[obj.folder_Name] && (uniq[obj.folder_Name] = true),
  );
  const [data, setData] = useState([
    {
      image: Image_Path.ADD_IMAGE,
      folder_Name: 'Add Album',
      counter: ' ',
    },
  ]);
  useEffect(() => {}, [isFocused, photo]);
  useEffect(() => {
    getData();
    setShowNxtScreenBtn(dataCome);
  }, [dataCome]);

  useEffect(() => {
    storeData(data);
  });
  // useEffect(() => {
  //   console.log('This is if condition.....', photo.length);
  //   setTimeout(() => {
  //   if (photo.length === 1) {
  //     setShowInput(true);
  //   } else {
  //     setShowInput(false);
  //   }
  //   }, 2000);
    
  // },[]);

  

  const importHandler = () => {};

  const plusButtonHandler = () => {
    navigation.push(All_Strings.ALL_GALLERY);
  };

  const folderNameHandler = text => {
    setShow(false);
    setNameFolder(text);
  };
  const createFolderHandler = () => {
    const index = data.findIndex(object => object.folder_Name === nameFolder);
    if (index === -1) {
      setData([...data, {folder_Name: nameFolder}]);
      setShowInput(false);
      setShow(false);
      storeData(data);
      setShowNxtScreenBtn(false);
      if (dataCome) {
        navigation.push(All_Strings.HIDE_GALLERY, {
          foldername: nameFolder,
          dataCome: true,
          dataNotCome: true,
        });
      } else {
        navigation.push(All_Strings.ALL_GALLERY, {
          FolderName: nameFolder,
          dataCome: true,

          dataNotCome: true,
          newDataIs: true,
        });
      }
    } else {
      setShow(true);
    }
  };
  const storeData = async value => {
    // if(value!==)
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('folderName', jsonValue);
      // console.log('The DATA IS SSSSSSSS', value);
    } catch (e) {
      console.log('Error', e);
    }
  };
  useEffect(() => {
    const backAction = () => {
      navigation.popToTop(All_Strings.PRIVATE_SCREEN);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
 
  const getData = async () => {
    console.log('The DATA IS SSSSSSSS)&&&&&&&&&&&&&&&&&&', isFocused);
    try {
      const jsonValue = await AsyncStorage.getItem('folderName');
      if (jsonValue != null) {
        console.log('coming data:::::::', JSON.parse(jsonValue));
        setData(JSON.parse(jsonValue))   
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // getData();
    // storeData(data);
    getImage();
  }, [data]);
  const getImage = async () => {
    // console.log('------------Data Is Here--------------:');
    for (let i = 0; i < data.length; i++) {
      //  console.log(
      //    '------------Data Is Here--------------:',
      //    data[i].folder_Name,
      //  );
      try {
        const jsonValue = await AsyncStorage.getItem(data[i].folder_Name);
        // console.log(
        //   '------------Data Is Here--------------:',
        //   data[i],
        // );

        if (jsonValue != null) {
          console.log(
            '------------Data Is Here--------------:',
            JSON.parse(jsonValue).length,
          );
          setPhoto(photo => [
            ...photo,
            {
              folder_Name: data[i].folder_Name,
              image: JSON.parse(jsonValue),
              counter: JSON.parse(jsonValue).length,
            },
          ]);
        } else {
          null;
        }
      } catch (e) {
        console.log('error:::::', e);
      }
    }
  };

  const renderItem = ({item}) => {
    // console.log(item);
    const imageShow = () => {
      if (item.folder_Name === 'Add Album') {
        return Image_Path.ADD_IMAGE;
      } else if (item.image.length !== 0) {
        return {uri: item?.image[0]?.uri};
      } else {
        return Image_Path.NO_PHOTO;
      }
    };
    // console.log(

    //   '------------------------This is the Photo data-------------------',
    //   photo,
    // );
    const counterShow = () => {
      if (item.folder_Name === 'Add Album') {
        return false;
      } else {
        return true;
      }
    };

    return (
      <TouchableOpacity
        style={styles.home_Folder_Image}
        onPress={() => {
          // console.log(item);
          if (item.folder_Name === 'Add Album') {
            setShowInput(true);
          } else {
            setShowNxtScreenBtn(false);
            navigation.push(All_Strings.HIDE_GALLERY, {
              foldername: item.folder_Name,
              dataCome: showNxtScreenBtn,
              // importbtn:
            });
          }
        }}>
        <Image
          source={
            imageShow()

            // {uri: item?.image[0]?.uri}
          }
          style={{height: 140, width: '100%', borderRadius: 15}}
        />
        <View style={styles.home_Folder_Text_View}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.folderText_Name_PrivateScreen}>
              {item.folder_Name}
            </Text>
          </View>
          <View
            style={
              counterShow() ? styles.home_Folder_Text : styles.home_Folder_Text2
            }>
            <Text style={styles.folderText_Counter_PrivateScreen}>
              {item.counter ? item.counter : '0'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.home_View}>
      <Statusbar color={Colors.PURPAL} hide={false} />
      <View
        style={{
          width: '95%',
          backgroundColor: Colors.PURPAL,
          borderRadius: 20,
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <Image
          style={{width: 15, height: 15, marginRight: 5}}
          source={Image_Path.WARNING}
        />
        <Text
          style={{
            color: Colors.WHITE,
            alignSelf: 'center',
            fontFamily: 'Sora-Regular',
            fontSize: 12,
            fontWeight: '400',
            paddingVertical: 5,
          }}>
          {"Please don't uninstall the app to avoid file loss."}
        </Text>
      </View>
      <FlatList
        columnWrapperStyle={styles.flatlist_counterWrap_PrivateScreen}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={arrFiltered}
        renderItem={renderItem}
      />

      {showNxtScreenBtn ? (
        <View style={styles.button_View_PrivateScreen}>
          <Buttons text={'Choose Folder'} onpress={importHandler} />
        </View>
      ) : (
        <TouchableOpacity
          style={{position: 'absolute', bottom: 15, right: 15}}
          onPress={plusButtonHandler}>
          <Image
            source={Image_Path.PLUS_BUTTON}
            style={{height: 120, width: 120}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
      <Modal
        visible={showInput}
        transparent
        onRequestClose={() => setShowInput(false)}
        animationType="slide"
        hardwareAccelerated>
        <View
          style={{
            flex: 1,
          }}>
          <ImageBackground
            source={Image_Path.BACKGROUNG_IMAGE}
            style={{
              height: windowHeight,
              width: windowWidth,
            }}
          />
          <View style={styles.modal_View_PrivateScree}>
            <Text style={styles.modal_album_text_PrivateScreen}>New album</Text>
            <UserTextInput
              placeholder={'Album name'}
              onChangeText={folderNameHandler}
            />
            {show ? (
              <View style={styles.error_View}>
                <Text style={styles.error_Text}>
                  Folder are not create with same name.
                </Text>
              </View>
            ) : null}
            <Buttons text={'Create Album'} onpress={createFolderHandler} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
