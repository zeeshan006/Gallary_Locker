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
import React, {useEffect, useState, useRef} from 'react';
import Colors from '../../assets/colors/Colors';
import styles from './Styles';
import PhotoEditor from '@baronha/react-native-photo-editor';
import Image_Path from '../../assets/image_path/Image_Path';
const {width} = Dimensions.get('window');
var RNFS = require('react-native-fs');
export default function PhotoViewer({navigation, route}) {
  const {data, indx} = route.params;
  const [delImage, setDelImage] = useState();
  const [delAlert, setDelAlert] = useState(false);
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
  const backbtnHandler = () => {
    navigation.goBack();
  };

  async function deletehandler(index, filepath) {
    console.log('This is the path if dele data:', filepath);
    let exists = await RNFS.exists(filepath);
    if (exists) {
      // exists call delete
      await RNFS.unlink(filepath);
      console.log('File Deleted', index, filepath);
      data.splice(index, 1);
      setDelAlert(false);
      navigation.goBack();
    } else {
      console.log('File Not Available');
    }
  }
  const photoCheck = (item) => {
    if (
      item.uri.includes('jpg') ||
      item.uri.includes('png') ||
      item.uri.includes('jpeg') ||
      item.uri.includes('avif') ||
      item.uri.includes('jfif') ||
      item.uri.includes('jpeg') ||
      item.uri.includes('jpeg') ||
      item.uri.includes('jpeg') ||
      item.uri.includes('png')
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.DARK_PURPAL,
      }}>
      <FlatList
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={indx}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  width: width - 2,
                  // height: '100%',
                  flex: 1,
                  marginHorizontal: 1,
                  borderRadius: 20,
                  backgroundColor: '#000000',
                }}>
                <Image
                  source={{uri: item?.uri}}
                  style={{height: '100%', width: '100%'}}
                  resizeMode={'contain'}
                />
                {photoCheck(item) ? null : (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      position: 'absolute',
                      bottom: 100,
                      top: 100,
                      right: 0,
                      left: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Image_Path.PLAY_BUTTON}
                      style={{height: 70, width: 70, position: 'absolute'}}
                    />
                  </TouchableOpacity>
                )}

                {/* Image Header 🤗🙂🤗 */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={[
                      styles.image_headerView_Gallery,
                      {
                        width: width - 2,
                        // marginHorizontal: 1,
                        //  borderTopLeftRadius: 20,
                        //       borderTopRightRadius: 20,
                        alignSelf: 'center',
                      },
                    ]}>
                    <TouchableOpacity onPress={backbtnHandler}>
                      <Image
                        source={Image_Path.BACK}
                        style={{marginLeft: 5, width: 30, height: 30}}
                      />
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center'}}>
                      <Text style={styles.image_NameText_Gallery}>
                        {item.uri
                          .substring(item.uri.lastIndexOf('/') + 1)
                          .split('.')[0].length > 15
                          ? `${item.uri
                              .substring(item.uri.lastIndexOf('/') + 1)
                              .split('.')[0]
                              .substr(0, 15)}` + `...`
                          : item.uri
                              .substring(item.uri.lastIndexOf('/') + 1)
                              .split('.')[0]}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: width * (15 / 376),
                        width: 20,
                        height: 20,
                      }}>
                      {/* <Image
                          source={Image_Path.MENU_ICON}
                          style={{
                            marginRight: width * (15 / 376),
                            width: 20,
                            height: 20,
                          }}
                        /> */}
                    </View>
                  </View>
                </View>
                {/* Image Footer 🤗🙂🤗 */}
                <View
                  style={{
                    backgroundColor: Colors.PURPAL,
                    height: 70,
                    position: 'absolute',
                    bottom: 0,
                    width: width - 2,
                    marginHorizontal: 1,
                    borderTopEndRadius: 10,
                    borderTopStartRadius: 10,

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
                    onPress={() => {
                      setDelImage(item.uri);
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
                  {photoCheck(item) ? (
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={async () => {
                        const result = await PhotoEditor.open({
                          path: item.uri,
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
                  {data[indx]?.lock ? (
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
                    <TouchableOpacity style={{alignItems: 'center'}}>
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
                </View>
              </View>
              {/* Modal for Delete Image............ */}
              <Modal
                visible={delAlert}
                transparent
                onRequestClose={() => setDelAlert(false)}
                animationType="fade"
                hardwareAccelerated>
                <View
                  style={{
                    backgroundColor: '#0D082B19',
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
                        console.log('Press successfully............!', index);
                        deletehandler(index, delImage);
                        // navigation.goBack();
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
            </>
          );
        }}
      />
    </View>
  );
}
