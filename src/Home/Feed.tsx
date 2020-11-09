import React from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import Banner from './Banner'
import ProductList from './ProductList'
import { useScrollHandler } from 'react-native-redash'
import Animated, {
  Extrapolate,
  interpolate,
  Value,
  greaterThan,
  lessThan,
} from 'react-native-reanimated'

interface item {
  id: string
  label: string
}

export default function Feed() {
  const { scrollHandler, y } = useScrollHandler()

  // const teste = new Value(1)
  // const height = interpolate(y, {
  //   inputRange: [0, 400],
  //   outputRange: [0, 1],
  //   extrapolate: Extrapolate.CLAMP,
  // })

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
    <Animated.ScrollView {...scrollHandler}>
      <Banner />
      <ScrollView
        style={[
          {
            backgroundColor: 'cyan',
            zIndex: 10,
          },
        ]}
        horizontal={true}
      >
        {items.map(({ label }) => (
          <View
            style={{
              padding: 20,
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

      <Animated.ScrollView
        style={[
          {
            top: y,
            position: 'absolute',
            opacity: greaterThan(y, 400),
            zIndex: 10,
            backgroundColor: 'cyan',
          },
        ]}
        horizontal={true}
      >
        {items.map(({ label }) => (
          <View
            style={{
              padding: 20,
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
      </Animated.ScrollView>
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
    </Animated.ScrollView>
  )
}
