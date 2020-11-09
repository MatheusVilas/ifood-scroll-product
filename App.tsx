import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import Feed from './src/Home'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Feed />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2d50',
  },
})
