import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Colors from '../../assets/colors/Colors';
import styles from './Styles';
import AndroidOpenSettings from 'react-native-android-open-settings';
import RNEncryptionModule from '@dhairyasharma/react-native-encryption';
import CameraRoll from '@react-native-community/cameraroll';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoEditor from '@baronha/react-native-photo-editor';
import Statusbar from '../../component/Statusbar';
import Image_Path from '../../assets/image_path/Image_Path';
import ImageView from 'better-react-native-image-viewing';
import Video from 'react-native-video';
import All_Strings from '../../assets/stringConstants/All_Strings';
var RNFS = require('react-native-fs');
export default function Gallery({navigation, route}) {
  const {title, type} = route.params;
  const [data, setData] = useState([]);
  const [permissionModal, setPermissionModal] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState();
  const [hideAlert, setHideAlert] = useState(false);
  const [onRender, setOnrender] = useState(false);
  const [videoPlay, setVideoPlay] = useState(false);

  const indexOFvideo = [];
  const focuse = useIsFocused();

  const mange_Data = [];
  const image = [];

  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const openSettingHandlePress = useCallback(async () => {
    // await Linking.openSettings();
    AndroidOpenSettings.appDetailsSettings();
  }, []);
  const getPhotos = async () => {
    Photo = await CameraRoll.getPhotos({
      first: 10000000,
      assetType: type,
    })
      .then(res => {
        setData(res.edges.map(edge => edge.node));
      })
      .catch(error => {
        console.log(error);
      });
    getImage();
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

  const getImage = () => {
    mange_Data.map(value => {
      image.push({uri: value});
    });
  };
  const dataMange = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].group_name === title && data[i].group_name !== null) {
        console.log(data[i].image);
        mange_Data.push(data[i].image);
      }
    }
  };

  const filterHandler = () => {
    setMenu(true);
  };

  const backHandler = () => {
    navigation.goBack();
  };
  var Hidedata;
  const HideImageHandler = value => {
    console.log('This is Function::', mange_Data[value]);
    setIsVisible(false);
    Hidedata = [
      {
        fileSize: mange_Data[value].fileSize,
        filename: mange_Data[value].filename,
        height: mange_Data[value].height,
        playableDuration: mange_Data[value].playableDuration,
        unique_index: value,
        uri:
          'file:///storage/emulated/0/Pictures/.Gallery_Locker/' +
          mange_Data[value].uri.substring(
            mange_Data[value].uri.lastIndexOf('/') + 1,
          ),
        width: mange_Data[value].width,
        uriImg: mange_Data[value].uri,
        lock: true,
      },
    ];
    storeHideData(Hidedata);
  };

  const storeHideData = async value => {
    console.log('Hide Data store::::::,', value);
    try {
      if (Hidedata.length !== 0) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('rawData', jsonValue);

        navigation.navigate(All_Strings.LOCKER, {dataCome: true});
      } else {
        console.log('The Array is empty>>>>>>>>>>>>>>>>>>>>>>>>');
      }
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
    }
  };
  // const deleteData = value => {
  //   CameraRoll.deletePhotos([value]).catch(e => {
  //     console.error('Delete Error', e);
  //   });
  // };
  async function deleteData(filepath) {
    RNEncryptionModule.encryptFile(
      filepath,
      filepath,
      '1234',
    )
      .then(res => {
        console.log('success', res);
        if (res.status == 'success') {
          let exists = RNFS.exists(filepath);
          if (exists) {
            setHideAlert(false);
            setIsVisible(false);
            // exists call delete
            RNFS.unlink(filepath);
            console.log('File Deleted');
            setOnrender(!onRender);
          } else {
            console.log('File Not Available');
          }
        }
      })
      .catch(err => {
        //  CameraRoll.deletePhotos([photo]);
        console.log('err:::::', err);
        setPermissionModal(true);
      });
  }
  const renderItem = ({item, index}) => {
    console.log(item);
    const videoIndex = value => {
      indexOFvideo.push(value);
    };
    return (
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
            style={styles.home_Folder_Image_Next}
            onPress={() => {
              console.log('Index::::::', index);
              setIsVisible(true);
              setIndex(index);
            }}>
            <Image
              source={{uri: item?.uri}}
              style={{height: 140, width: '100%'}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.home_Folder_Image_Next}
            onPress={() => {
              console.log('Index::::::', index);
              setIsVisible(true);
              setIndex(index);
            }}>
            {videoIndex(index)}
            <Image
              source={{uri: item?.uri}}
              style={{height: 140, width: '100%'}}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                top: 0,
                right: 0,
                left: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={Image_Path.PLAY_BUTTON}
                style={{height: 30, width: 30, position: 'absolute'}}
              />
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  console.log('ImageArr::::::', image);
  useEffect(() => {
    getPhotos();
  }, [onRender, focuse]);
  return (
    <View style={styles.home_View}>
      {dataMange()}
      <Statusbar color={Colors.PURPAL} hide={false} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={backHandler}>
          <Image
            source={Image_Path.BACK}
            style={{marginLeft: 5, width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View style={{margin: 10}} onPress={filterHandler}>
          <Text
            style={{
              color: Colors.WHITE,
              alignSelf: 'center',
              fontFamily: 'Sora-Regular',
              fontSize: 14,
              fontWeight: '400',
            }}>
            {type}{' '}
          </Text>
        </View>
      </View>
      <ImageView
        doubleTapToZoomEnabled={true}
        images={mange_Data}
        imageIndex={index}
        visible={visible}
        animationType={'fade'}
        presentationStyle="fullScreen"
        onRequestClose={() => setIsVisible(false)}
        HeaderComponent={({imageIndex}) => {
          console.log(mange_Data[imageIndex].uri);
          return (
            <View style={styles.image_headerView_Gallery}>
              <Statusbar color={Colors.PURPAL} hide={false} />
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}>
                <Image
                  source={Image_Path.BACK}
                  style={{marginLeft: 5, width: 30, height: 30}}
                />
              </TouchableOpacity>

              <View style={{justifyContent: 'center'}}>
                <Text style={styles.image_NameText_Gallery}>
                  {mange_Data[imageIndex].uri
                    .substring(mange_Data[imageIndex].uri.lastIndexOf('/') + 1)
                    .split('.')[0].length > 15
                    ? `${mange_Data[imageIndex].uri
                        .substring(
                          mange_Data[imageIndex].uri.lastIndexOf('/') + 1,
                        )
                        .split('.')[0]
                        .substr(0, 15)}` + `...`
                    : mange_Data[imageIndex].uri
                        .substring(
                          mange_Data[imageIndex].uri.lastIndexOf('/') + 1,
                        )
                        .split('.')[0]}
                </Text>
              </View>
              <TouchableOpacity
                onPress={backHandler}
                style={{marginLeft: 5, width: 20, height: 20}}>
                {/* <Image
                  source={Image_Path.MENU_ICON}
                  style={{marginLeft: 5, width: 20, height: 20}}
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
              {mange_Data[imageIndex].uri.includes('jpg') ||
              mange_Data[imageIndex].uri.includes('png') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('avif') ||
              mange_Data[imageIndex].uri.includes('jfif') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('png') ? null : (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: height * (400 / 816),
                    left: width * (153 / 306),
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                  }}
                  onPress={() => {
                    console.log('Play Vedio');
                    setVideoPlay(true);
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: 70,
                      position: 'absolute',
                      backgroundColor: '#00000000',
                    }}
                  />
                </TouchableOpacity>
              )}
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
                onPress={() => setHideAlert(true)}>
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
              {mange_Data[imageIndex].uri.includes('jpg') ||
              mange_Data[imageIndex].uri.includes('png') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('avif') ||
              mange_Data[imageIndex].uri.includes('jfif') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('jpeg') ||
              mange_Data[imageIndex].uri.includes('png') ? (
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={async () => {
                    const result = await PhotoEditor.open({
                      path: mange_Data[imageIndex].uri,
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
              ) : null}
              {mange_Data[imageIndex]?.lock ? (
                <TouchableOpacity style={{alignItems: 'center'}}>
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
              ) : (
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    console.log(
                      'HIDEEEEEEE the DATA:::::::::::::',
                      mange_Data[imageIndex].uri,
                    );
                    CameraRoll.save(mange_Data[imageIndex].uri, {
                      album: '.Gallery_Locker',
                    });
                    HideImageHandler(imageIndex);
                  }}>
                  <Image
                    source={Image_Path.LOCKED}
                    style={{height: 25, width: 25}}
                  />
                  <Text
                    style={{
                      color: Colors.WHITE,
                      fontFamily: 'Sora-Regular',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Lock
                  </Text>
                </TouchableOpacity>
              )}
              <Modal
                visible={videoPlay}
                transparent
                onRequestClose={() => setVideoPlay(false)}
                animationType="fade"
                hardwareAccelerated>
                <View
                  style={{
                    backgroundColor: '#000',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{position: 'absolute', top: 0, width: '100%'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setVideoPlay(false);
                      }}
                      style={{marginLeft: 15, width: 50, height: 50, backgroundColor:'red'}}>
                      <Image
                        source={Image_Path.BACK}
                        style={{width: 40, height: 40}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Video
                    source={{
                      uri: mange_Data[imageIndex].uri,
                    }} // Can be a URL or a local file.
                    ref={ref => {
                      player = ref;
                    }}
                    controls
                    fullscreenAutorotate
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                  />
                </View>
              </Modal>
              <Modal
                visible={hideAlert}
                transparent
                onRequestClose={() => setHideAlert(false)}
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
                        deleteData(mange_Data[imageIndex].uri);
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
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          width: '98%',
        }}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={mange_Data}
        renderItem={renderItem}
      />
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
    </View>
  );
}
