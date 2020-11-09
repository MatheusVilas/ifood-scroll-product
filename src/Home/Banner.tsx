import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Banner() {
  return <View style={styles.square} />
}

const styles = StyleSheet.create({
  square: {
    height: 400,
    backgroundColor: '#fcdab7',
  },
})
