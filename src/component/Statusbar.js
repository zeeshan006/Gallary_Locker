import { StatusBar } from 'react-native'
import React from 'react'
export default function Statusbar({color, hide}) {
  return (
    <StatusBar
      backgroundColor={color}
      barStyle="light-content"
      hidden={hide}
      animated={false}
    />
  );
}