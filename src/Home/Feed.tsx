import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Banner from './Banner'
import ProductList from './ProductList'
import { useScrollHandler, withTransition } from 'react-native-redash'
import Animated, {
  interpolate,
  Value,
  greaterThan,
  useCode,
  block,
  cond,
  set,
  greaterOrEq,
  and,
  lessOrEq,
} from 'react-native-reanimated'

interface item {
  id: string
  label: string
  color: string
  items: any
  anchor: number
}

const TAB_ITEM_WIDTH = 170
const TAB_ITEM_HEIGHT = 60
const SCROLL_ITEM_HEIGHT = 120
const BANNER_HEIGHT = 400

const allItems: item[] = [
  {
    id: '01',
    label: 'Primeiro',
    color: 'red',
    anchor: BANNER_HEIGHT + SCROLL_ITEM_HEIGHT * 10,
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    id: '02',
    label: 'Segundo',
    color: 'blue',
    anchor: BANNER_HEIGHT + SCROLL_ITEM_HEIGHT * 10 * 2,
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    id: '03',
    label: 'Terceiro',
    color: 'yellow',
    anchor: BANNER_HEIGHT + SCROLL_ITEM_HEIGHT * 10,
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    id: '04',
    label: 'Quarto',
    color: 'cyan',
    anchor: BANNER_HEIGHT + SCROLL_ITEM_HEIGHT * 10,
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    id: '05',
    label: 'Quinto',
    color: 'purple',
    anchor: BANNER_HEIGHT + SCROLL_ITEM_HEIGHT * 10,
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    id: '06',
    label: 'Sexto',
    color: 'brown',
    anchor: BANNER_HEIGHT + SCROLL_ITEM_HEIGHT * 10,
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
]

export default function Feed() {
  const { scrollHandler, y } = useScrollHandler()
  const [items, setItems] = useState(allItems)
  const tabScrollViewRef = useRef(null)

  const onMeasurement = (index: number, anchor: number) => {
    items[index] = { ...items[index], anchor }
    setItems([...items])
  }

  const index = new Value<number>(0)
  const scrollPosition = new Value<number>(0)
  const indexTransition = withTransition(index)
  const translateX = interpolate(indexTransition, {
    inputRange: items.map((_tab, i) => i),
    outputRange: items.map((_, i) => {
      return i * TAB_ITEM_WIDTH
    }),
  })

  useCode(
    () =>
      block(
        items.map((tab, i) =>
          cond(
            i === items.length - 1
              ? greaterOrEq(y, tab.anchor)
              : and(
                  greaterOrEq(y, tab.anchor),
                  lessOrEq(y, items[i + 1].anchor),
                ),
            [
              set(index, i),
              set(scrollPosition, i + 1 * TAB_ITEM_WIDTH - TAB_ITEM_WIDTH / 2),
            ],
          ),
        ),
      ),
    [index, items, y],
  )

  return (
    <Animated.ScrollView ref={tabScrollViewRef} {...scrollHandler}>
      <Banner />
      <ScrollView
        style={[
          {
            backgroundColor: '#1d2d50',
          },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row' }}>
          {items.map(({ label }, index) => (
            <TouchableOpacity
              style={{
                width: TAB_ITEM_WIDTH,
                height: TAB_ITEM_HEIGHT,
                borderColor: 'white',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={label}
              onPress={() => {
                if (tabScrollViewRef.current) {
                  tabScrollViewRef.current
                    .getNode()
                    .scrollTo({ y: items[index].anchor + 1 })
                }
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 30,
                width: TAB_ITEM_WIDTH,
                height: 10,
                backgroundColor: 'pink',
              },
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        </View>
      </ScrollView>

      <Animated.ScrollView
        style={[
          {
            top: y,
            position: 'absolute',
            opacity: greaterThan(y, 400),
            zIndex: 10,
            backgroundColor: '#1d2d50',
          },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row' }}>
          {items.map(({ label }, index) => (
            <TouchableOpacity
              style={{
                width: TAB_ITEM_WIDTH,
                height: TAB_ITEM_HEIGHT,
                borderColor: 'white',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={label}
              onPress={() => {
                if (tabScrollViewRef.current) {
                  tabScrollViewRef.current
                    .getNode()
                    .scrollTo({ y: items[index].anchor + 1 })
                }
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 30,
                width: TAB_ITEM_WIDTH,
                height: 10,
                backgroundColor: 'pink',
              },
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        </View>
      </Animated.ScrollView>

      {items.map(({ items, color }, index) => (
        <View
          onLayout={({
            nativeEvent: {
              layout: { y: anchor },
            },
          }) => onMeasurement(index, anchor)}
        >
          {items.map(() => (
            <View
              style={{
                height: SCROLL_ITEM_HEIGHT,
                width: Dimensions.get('window').width,
                backgroundColor: color,
                borderBottomColor: '#000',
                borderBottomWidth: 2,
              }}
            />
          ))}
        </View>
      ))}
    </Animated.ScrollView>
  )
}
