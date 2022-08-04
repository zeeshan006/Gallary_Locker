import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const data = [1,1,1,1,1];
const cardHeight = 120;
const padding = 10;
const offset = cardHeight + padding;

export default function AnimatedScroll1() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const inputRange = [offset *1, offset*2 + offset];
    const outputRange1 = [1, 0];
    const outputRange2 = [0, offset / 2];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: outputRange1,
      extrapolate: 'clamp',
    });
    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: outputRange2,
      extrapolate: 'clamp',
    });
    const opacity = scale;
    return (
      <ScrollView>
        <Animated.View
          style={[styles.card, {opacity, transform: [{translateY}, {scale}]}]}
        />
        <View style={{backgroundColor: 'blue', height: 200}}></View>
        <View style={{backgroundColor: 'blue', height: 200}}></View>
        <View style={{backgroundColor: 'blue', height: 200}}></View>
        <View style={{backgroundColor: 'blue', height: 200}}></View>
        <View style={{backgroundColor: 'blue', height: 200}}></View>
        <View style={{backgroundColor: 'blue', height: 200}}></View>
        <View style={{backgroundColor: 'blue', height: 200}}></View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        paddingVertical: padding / 2,
    },
    card: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: padding / 2,
        height: cardHeight,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
})