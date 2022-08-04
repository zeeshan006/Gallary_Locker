import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  BackHandler,
  Linking,
  Platform,
} from 'react-native';

import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoEditor from '@baronha/react-native-photo-editor';
import AndroidOpenSettings from 'react-native-android-open-settings';
import RNEncryptionModule from '@dhairyasharma/react-native-encryption';
import Statusbar from '../../component/Statusbar';
import Colors from '../../assets/colors/Colors';
import Image_Path from '../../assets/image_path/Image_Path';
import CameraRoll from '@react-native-community/cameraroll';
import Buttons from '../../component/Buttons';
import ImageView from 'better-react-native-image-viewing';
import styles from '../private/Styles';
import All_Strings from '../../assets/stringConstants/All_Strings';
export default function HideGallery({navigation, route}) {
  const {foldername, dataCome} = route.params;
  console.log('--------Foldername------:', route.params);
  const [raawData, setRaawData] = useState([]);
  const [index, setIndex] = useState();
  const [visible, setIsVisible] = useState(false);
  const [showbtnImport, setShowbtnImport] = useState(false);
  const [dataaNotCome, setDataNoteCome] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [unhideAlert, setunhide] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [selectLockImages, setSelectLockImages] = useState(false);
  const [fill, setFill] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [delAlert, setDelAlert] = useState(false);
  const [delSelectedAlert, setDelSelectedAlert] = useState(false);
  var RNFS = require('react-native-fs');
  let rawData = [];
  const importHandler = () => {
    RNEncryptionModule.encryptFile(
      rawData[0]?.uriImg,
      rawData[0]?.uriImg,
      '1234',
    )
      .then(res => {
        console.log('success', res);
        if (res.status == 'success') {
          rawData.map(item => {
            console.log(
              '--------------Hide_Photo-----------',
              item.uriImg.substring(item.uri.lastIndexOf('/') + 1),
            );
            let photo = item.uriImg;
            console.log('Delete::::::::::::::::::::', photo);
            const image = CameraRoll.deletePhotos([photo]).then(res => {
              console.log('RRRRESSSSSSSSSSSSSSSSSS::::::', res);
            });
            if (image) {
              SetImageHideHandler();
              setHideAlert(true);
            } else {
              console.log('error/// else part', error);
            }
          });
        } else {
          console.log('====================================');
          console.log('ERROR::::', res);
          console.log('====================================');
        }
      })
      .catch(err => {
        //  CameraRoll.deletePhotos([photo]);
        console.log('err:::::', err);
        setPermissionModal(true);
      });
  };
  const openSettingHandlePress = useCallback(async () => {
    // await Linking.openSettings();
    AndroidOpenSettings.appDetailsSettings();
  }, []);
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

  const SetImageHideHandler = () => {
    if (rawData) {
      setShowbtnImport(false);
      let aeeay = [];
      aeeay = raawData;
      aeeay = aeeay.concat(rawData);
      setRaawData(aeeay);
      storeDataRaw(null);
      setDataNoteCome(false);
      setShowbtnImport(false);
    }
  };
  const unHidePhotos = value => {
    console.log('this is the Index:::::::::::::', value);
    try {
      let photo =
        'file:///storage/emulated/0/Pictures/.Gallery_Locker/' +
        raawData[value].uri.substring(raawData[value].uri.lastIndexOf('/') + 1);
      console.log('Image is*******************:', photo);
      const image = CameraRoll.save(photo, {
        album: 'Gallery_Locker',
      }).then(() => {
        deletehandlerSelected(value, photo);
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  async function deletehandlerSelected(index, filepath) {
    console.log('This is the path if dele data:', filepath);
    let exists = await RNFS.exists(filepath);
    if (exists) {
      // exists call delete
      await RNFS.unlink(filepath);
      console.log('File Deleted');
      raawData.splice(index, 1);
      setHideAlert(true),
      setunhide(true);
      getData();
      // setIsVisible(false);
    } else {
      console.log('File Not Available');
    }
  }
  const unHideSelectedPhotos = value => {
    console.log('this is the Index:::::::::::::', value);
    try {
      // let photo =
      //   'file:///storage/emulated/0/Pictures/.Gallery_Locker/' +
      //   raawData[value].uri.substring(raawData[value].uri.lastIndexOf('/') + 1);
      // console.log('Image is*******************:', photo);
      const image = CameraRoll.save(value.uri, {
        album: 'Gallery_Locker',
      }).then(() => {
        var index = raawData.findIndex(data => data.uri === value.uri);
        var uri = value.uri;
        deletehandler(index, uri);
      });
      if (image) {
        setSelectLockImages(false);
        setSelectData([]);
        setHideAlert(true), setunhide(true);
        getData();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const backHandler = () => {
    navigation.push(All_Strings.PRIVATE_SCREEN);
  };
  const storeDataRaw = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('rawData', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('rawData');
      if (jsonValue != null) {
        rawData = JSON.parse(jsonValue);
      } else {
        null;
      }
    } catch (e) {
      console.log('Error:::', e);
    }
  };
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(foldername, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const OldgetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(foldername);
      if (jsonValue != null) {
        setRaawData(JSON.parse(jsonValue));
      } else {
        setRaawData(raawData);
      }
    } catch (e) {
      console.log('Error:::', e);
    }
  };
  useEffect(() => {
    getData();
  });
  useEffect(() => {
    setShowbtnImport(dataCome);
  }, []);
  useEffect(() => {
    OldgetData();
  }, []);
  useEffect(() => {
    storeData(raawData);
  }, [raawData]);

  const plusButtonHandler = () => {
    navigation.push(All_Strings.ALL_GALLERY, {
      dataNotCome: true,
      FolderName: foldername,
    });
  };
  // const deletehandler = value => {
  //   console.log('this is the Index:::::::::::::', value);
  //   raawData.splice(value, 1);
  //   setDelAlert(false);
  //   storeData(raawData);
  //   getData();
  // };
  async function deletehandler(index, filepath) {
    console.log('This is the path if dele data:', filepath);
    let exists = await RNFS.exists(filepath);
    if (exists) {
      // exists call delete
      await RNFS.unlink(filepath);

      console.log('File Deleted', index, filepath);
      raawData.splice(index, 1);
      setDelAlert(false);
      storeData(raawData);
      getData();
      setIsVisible(false);
    } else {
      console.log('File Not Available');
    }
  }
  const deletehandlerS = () => {
    // console.log('This is the path if dele data:', itmess.uri);
    selectData.map(itmess => {
      let exists = RNFS.exists(itmess.uri);
      if (exists) {
        RNFS.unlink(itmess.uri);

        console.log('File Deleted', index, itmess.uri);
        // raawData.splice(index, 1);
      } else {
        console.log('File Not Available');
      }
    });
  };
  const deleteSelectedhandler = () => {
    selectData.map(items => {
      const index = raawData.findIndex(
        item => item.unique_index === items.unique_index,
      );

      console.log('this is delete items:::::::::::', index, items.uri);
      RNFS.unlink(raawData[index].uri);
      // //   .then(() => {
      raawData.splice(index, 1);
      // // });
      // deletehandlerS(index, items.uri);
    });
    setSelectData([]);
    setDelSelectedAlert(false);
    storeData(raawData);
    getData();
    setSelectLockImages(false);
    // deletehandlerS();
  };
  const longPressSelectedHandler = () => {
    setSelectLockImages(true);
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
          uri: value.uri,
          // 'file:///storage/emulated/0/Pictures/.Gallery_Locker/' +
          // value.uri.substring(value.uri.lastIndexOf('/') + 1),
          width: value.width,
          uriImg: value.uri,
          // lock: false,
        },
      ]);
      console.log(selectData);
    }
  };
  const unHideSelectedImages = () => {
    selectData.map(item => {
      unHideSelectedPhotos(item);
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        {selectLockImages ? (
          <>
            {item.uri.includes('jpg') ||
            item.uri.includes('png') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('avif') ||
            item.uri.includes('jfif') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('png') ? (
              <TouchableOpacity
                style={styles.Image_View_HideGallery}
                onPress={() => {
                  mangeSelected_data(item, index);
                  setFill(!fill);
                }}>
                <Image
                  source={{uri: item.uri}}
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
                  savePhotos(item.image.uri);
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
        ) : (
          <>
            {item.uri.includes('jpg') ||
            item.uri.includes('png') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('avif') ||
            item.uri.includes('jfif') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('jpeg') ||
            item.uri.includes('png') ? (
              <TouchableOpacity
                style={styles.Image_View_HideGallery}
                onLongPress={() => {
                  longPressSelectedHandler();
                }}
                onPress={() => {
                  console.log('Index::::::', index);
                  setIsVisible(true);
                  setIndex(index);
                }}>
                <Image
                  source={{
                    uri: item.uri,
                    // 'file:///storage/emulated/0/Pictures/.Gallery_Locker/' +
                    // item.uri.substring(item.uri.lastIndexOf('/') + 1),
                  }}
                  style={{height: 140, width: '100%'}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.Image_View_HideGallery}
                onPress={() => {
                  console.log('Index::::::', index);
                  setIsVisible(true);
                  setIndex(index);
                }}>
                <Image
                  source={{uri: item?.uri}}
                  style={{height: 140, width: '100%'}}
                />
                <View style={styles.play_Btn_HideGallery}>
                  <Image
                    source={Image_Path.PLAY_BUTTON}
                    style={{height: 30, width: 30, position: 'absolute'}}
                  />
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <View style={{backgroundColor:Colors.DARK_PURPAL, flex:1}}>
      <Statusbar color={Colors.PURPAL} hide={false} />
      <View style={styles.header_HideGallery}>
        <TouchableOpacity onPress={backHandler}>
          <Image
            source={Image_Path.BACK}
            style={{marginLeft: 5, width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          width: '98%',
        }}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={raawData}
        renderItem={renderItem}
      />
      <ImageView
        doubleTapToZoomEnabled={true}
        images={raawData}
        imageIndex={index}
        visible={visible}
        animationType={'fade'}
        presentationStyle="fullScreen"
        onRequestClose={() => setIsVisible(false)}
        HeaderComponent={({imageIndex}) => {
          // console.log(raawData[imageIndex].uri);
          return (
            <View style={styles.image_header_View_HideGAllery}>
              <Statusbar color={Colors.PURPAL} hide={false} />
              <TouchableOpacity onPress={()=>{setIsVisible(false)}}>
                <Image
                  source={Image_Path.BACK}
                  style={{marginLeft: 5, width: 30, height: 30}}
                />
              </TouchableOpacity>

              <View style={{justifyContent: 'center'}}>
                <Text style={styles.image_Name_text_hideGallery}>
                  {raawData[imageIndex]?.uri
                    .substring(raawData[imageIndex]?.uri.lastIndexOf('/') + 1)
                    .split('.')[0].length > 15
                    ? `${raawData[imageIndex]?.uri
                        .substring(
                          raawData[imageIndex]?.uri.lastIndexOf('/') + 1,
                        )
                        .split('.')[0]
                        .substr(0, 15)}` + `...`
                    : raawData[imageIndex]?.uri
                        .substring(
                          raawData[imageIndex]?.uri.lastIndexOf('/') + 1,
                        )
                        .split('.')[0]}
                </Text>
              </View>
              <TouchableOpacity
                style={{marginLeft: 8, width: 20, height: 20}}
                onPress={() => {}}>
                {/* <Image
                  source={Image_Path.MENU_ICON}
                  style={{marginLeft: 8, width: 20, height: 20}}
                /> */}
              </TouchableOpacity>
            </View>
          );
        }}
        FooterComponent={({imageIndex}) => {
          return (
            <View
              style={{
                backgroundColor: Colors.PURPAL,
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Image
                  source={Image_Path.SHARE}
                  style={{height: 25, width: 25}}
                />
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: 'Sora-Regular',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  Share
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                // onPress={deletehandler(imageIndex)}
                onPress={() => {
                  console.log(
                    'DELETEIIIIIIIIIMMMMMMMMMMMMAAAAGGGGGEE:::::::::',
                    raawData[imageIndex]?.uri,
                  );

                  setDelAlert(true);
                }}>
                <Image
                  source={Image_Path.DELETE}
                  style={{height: 25, width: 25}}
                />
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: 'Sora-Regular',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={async () => {
                  const result = await PhotoEditor.open({
                    path: raawData[imageIndex].uri,
                    stickers: [
                      'https://cdn-icons-png.flaticon.com/512/5272/5272912.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272913.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272916.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272918.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272920.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272923.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272925.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272926.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272929.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272931.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272932.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272934.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272936.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272939.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272940.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272942.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272944.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272948.png',
                      'https://cdn-icons-png.flaticon.com/512/5272/5272950.png',
                    ],
                  });
                  console.log('This is a edit image:::::::', result);
                }}>
                <Image
                  source={Image_Path.EDIT}
                  style={{height: 25, width: 25}}
                />
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: 'Sora-Regular',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
                              <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => unHidePhotos(imageIndex)}>
                  <Image
                    source={Image_Path.UNLOCK}
                    style={{height: 25, width: 25}}
                  />
                  <Text
                    style={{
                      color: Colors.WHITE,
                      fontFamily: 'Sora-Regular',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Unlock
                  </Text>
                </TouchableOpacity>
              <Modal
                visible={delAlert}
                transparent
                onRequestClose={() => setDelAlert(false)}
                animationType="fade"
                hardwareAccelerated>
                <View
                  style={{
                    backgroundColor: '#0D082B99',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 200,
                      backgroundColor: '#2F1D59',
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.DARK_PURPAL,
                    }}>
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontFamily: 'Sora-Regular',
                        fontWeight: '400',
                        fontSize: 15,
                        marginBottom: '3%',
                      }}>
                      Delete
                    </Text>
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontFamily: 'Sora-Regular',
                        fontWeight: '600',
                        fontSize: 20,
                        marginBottom: '10%',
                      }}>
                      Are you sure you want to delete?
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.LIGHT_PURPAL,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        setDelAlert(false);
                        // setIsVisible(false);
                        console.log('Press successfully............!');
                        deletehandler(imageIndex, raawData[imageIndex]?.uri);
                      }}>
                      <Text
                        style={{
                          color: Colors.WHITE,
                          fontFamily: 'Sora-Regular',
                          fontWeight: '400',
                          fontSize: 15,
                          marginHorizontal: '7%',
                          marginVertical: '3%',
                        }}>
                        Sure
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          );
        }}
      />
     
      {selectLockImages ? (
        <View
          style={{
            backgroundColor: Colors.PURPAL,

            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Image source={Image_Path.SHARE} style={{height: 25, width: 25}} />
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontSize: 14,
                fontWeight: '600',
              }}>
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              console.log('This is delet>>>>>>>>>>>>>>>>>', delSelectedAlert);
              setDelSelectedAlert(true);
            }}>
            <Image source={Image_Path.DELETE} style={{height: 25, width: 25}} />
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontSize: 14,
                fontWeight: '600',
              }}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Image source={Image_Path.EDIT} style={{height: 25, width: 25}} />
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontSize: 14,
                fontWeight: '600',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => unHideSelectedImages()}>
            <Image source={Image_Path.UNLOCK} style={{height: 25, width: 25}} />
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontSize: 14,
                fontWeight: '600',
              }}>
              Unlock
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {showbtnImport ? (
            <View style={styles.import_btn_hideGallery}>
              <Buttons text={'Import'} onpress={importHandler} />
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
        </>
      )}
      <Modal
        visible={permissionModal}
        transparent
        animationType="fade"
        hardwareAccelerated>
        <View
          style={{
            backgroundColor: '#0D082B99',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: 300,
              backgroundColor: '#2F1D59',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.DARK_PURPAL,
            }}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontWeight: '400',
                fontSize: 15,
                marginBottom: '3%',
              }}>
              {'Permission Needed'}
            </Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontWeight: '600',
                fontSize: 20,
                marginBottom: '10%',
              }}>
              {'Permission>Storage>Allow management of all files'}
            </Text>
            <TouchableOpacity
              style={{backgroundColor: Colors.LIGHT_PURPAL, borderRadius: 10}}
              onPress={() => {
                setunhide(false);
                setPermissionModal(false);
                openSettingHandlePress();
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: 'Sora-Regular',
                  fontWeight: '400',
                  fontSize: 15,
                  marginHorizontal: '7%',
                  marginVertical: '3%',
                }}>
                allow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={hideAlert}
        transparent
        animationType="fade"
        hardwareAccelerated>
        <View
          style={{
            backgroundColor: '#0D082B99',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              backgroundColor: '#2F1D59',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.DARK_PURPAL,
            }}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontWeight: '400',
                fontSize: 15,
                marginBottom: '3%',
              }}>
              Success
            </Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontWeight: '600',
                fontSize: 20,
                marginBottom: '10%',
              }}>
              {unhideAlert
                ? 'Files moved to gallery '
                : 'Files moved to locker'}
            </Text>
            <TouchableOpacity
              style={{backgroundColor: Colors.LIGHT_PURPAL, borderRadius: 10}}
              onPress={() => {
                storeData(raawData);
                setunhide(false);
                setHideAlert(false);
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: 'Sora-Regular',
                  fontWeight: '400',
                  fontSize: 15,
                  marginHorizontal: '7%',
                  marginVertical: '3%',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={delSelectedAlert}
        transparent
        onRequestClose={() => setDelSelectedAlert(false)}
        animationType="fade"
        hardwareAccelerated>
        <View
          style={{
            backgroundColor: '#0D082B99',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              backgroundColor: '#2F1D59',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.DARK_PURPAL,
            }}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontWeight: '400',
                fontSize: 15,
                marginBottom: '3%',
              }}>
              Delete
            </Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'Sora-Regular',
                fontWeight: '600',
                fontSize: 20,
                marginBottom: '10%',
              }}>
              Are you sure you want to delete?
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.LIGHT_PURPAL,
                borderRadius: 10,
              }}
              onPress={() => {
                setDelSelectedAlert(false);
                deleteSelectedhandler();
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: 'Sora-Regular',
                  fontWeight: '400',
                  fontSize: 15,
                  marginHorizontal: '7%',
                  marginVertical: '3%',
                }}>
                Sure
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
