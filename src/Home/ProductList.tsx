import React from 'react'
import { View, Text, Dimensions, ScrollView } from 'react-native'

interface item {
  id: string
  label: string
}

export default function ProductList() {
  const items: item[] = [
    {
      id: '01',
      label: 'Primeiro',
    },
    {
      id: '02',
      label: 'Segundo',
    },
    {
      id: '03',
      label: 'Terceiro',
    },
    {
      id: '04',
      label: 'Quarto',
    },
    {
      id: '05',
      label: 'Quinto',
    },
    {
      id: '06',
      label: 'Sexto',
    },
  ]

  return (
    <View>
      <ScrollView horizontal={true}>
        {items.map(({ label }) => (
          <View
            style={{
              padding: 20,
              backgroundColor: '#1e5f74',
            }}
            key={label}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 30,
              }}
            >
              {label}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View>
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'blue',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'yellow',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'blue',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'yellow',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'blue',
          }}
        />
        <View
          style={{
            height: 120,
            width: Dimensions.get('window').width,
            backgroundColor: 'yellow',
          }}
        />
      </View>
    </View>
  )
}
