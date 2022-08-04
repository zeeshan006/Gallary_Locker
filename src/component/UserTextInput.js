import {View, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Colors from '../assets/colors/Colors';
import Image_Path from '../assets/image_path/Image_Path';
export default function UserTextInput({
  image,
  placeholder,
  height,
  onpress,
  show,
  maxLength,
  showEye,
  value,
  keyboardType,
  onChangeText,
  multiline,
  lines
}) {
  return (
    <View
      style={{
        width: '80%',
        alignSelf: 'center',
        backgroundColor: Colors.PURPAL,
        borderRadius: 15,
        height: height ? 250 : null,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          backgroundColor: Colors.PURPAL,
          borderRadius: 15,
        }}>
        <TextInput
          keyboardType={keyboardType}
          secureTextEntry={show}
          placeholder={placeholder}
          placeholderTextColor={Colors.WHITE}
          maxLength={maxLength}
          numberOfLines={lines}
          multiline={multiline}
          onChangeText={text => onChangeText(text)}
          selectionColor={Colors.X_LIGHT_PURPAL}
          value={value}
          style={{
            textAlignVertical: 'top',
            color: Colors.WHITE,
            fontFamily: 'Sora-Regular',
            fontWeight: '300',
            fontSize: 18,
            marginVertical: 4,
            marginLeft: '2%',
            alignSelf: 'center',
            width: showEye ? '80%' : '96%',
          }}
        />
        {showEye ? (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '18%',
              paddingVertical: '3%',
            }}
            onPress={onpress}>
            <Image
              source={show ? Image_Path.EYE_INVISIBLE : Image_Path.EYE}
              style={{
                width: 18,
                height: 18,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {height ? (
        <View style={{position: 'absolute', bottom: 5, right: 10}}>
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: 'Sora-Regular',
              fontWeight: '300',
              fontSize: 13,
            }}>
            300 Words
          </Text>
        </View>
      ) : null}
    </View>
  );
}
