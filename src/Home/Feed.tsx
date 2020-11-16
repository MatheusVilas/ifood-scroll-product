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
  call,
} from 'react-native-reanimated'

interface item {
  id: string
  label: string
  color: string
  items: any
  anchor: number
  width: number
}

const TAB_ITEM_WIDTH = 170
const TAB_ITEM_HEIGHT = 60
const SCROLL_ITEM_HEIGHT = 120

const allItems: item[] = [
  {
    id: '01',
    label: 'Primeiro',
    color: 'red',
    anchor: 0,
    width: 0,
    items: [
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
    ],
  },
  {
    id: '02',
    label: 'Segundo',
    color: 'blue',
    anchor: 0,
    width: 0,
    items: [
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
    ],
  },
  {
    id: '03',
    label: 'Terceiro',
    color: 'yellow',
    anchor: 0,
    width: 0,
    items: [
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
    ],
  },
  {
    id: '04',
    label: 'Quarto',
    color: 'cyan',
    anchor: 0,
    width: 0,
    items: [
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
    ],
  },
  {
    id: '05',
    label: 'Quinto',
    color: 'purple',
    anchor: 0,
    width: 0,
    items: [
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
    ],
  },
  {
    id: '06',
    label: 'Sexto',
    color: 'brown',
    anchor: 0,
    width: 0,
    items: [
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
      {
        id: '01',
        title: 'title',
      },
    ],
  },
]

export default function Feed() {
  const scrollViewMenuRef = useRef<Animated.ScrollView>(null)
  const { scrollHandler, y } = useScrollHandler()
  const [items, setItems] = useState(allItems)
  const tabScrollViewRef = useRef(null)

  const onMeasurementListSize = (index: number, anchor: number) => {
    items[index] = { ...items[index], anchor }
    setItems([...items])
  }

  const onMeasurementTab = (index: number, width: number) => {
    items[index] = { ...items[index], width }
    setItems([...items])
  }

  const index = new Value<number>(0)
  const widthBar = new Value<number>(0)

  const indexTransition = withTransition(index)
  const translateX = interpolate(indexTransition, {
    inputRange: items.map((_tab, i) => i),
    outputRange: items.map((_, i) => {
      return items
        .filter((_measurement, j) => j < i)
        .reduce((accumulator, item) => item.width + accumulator, 0)
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
              set(widthBar, tab.width),
              call([], () => {
                scrollViewMenuRef.current.getNode().scrollTo({
                  x: items
                    .filter((_measurement, j) => j < i)
                    .reduce((accumulator, item) => item.width + accumulator, 0),
                })
              }),
            ],
          ),
        ),
      ),
    [index, items, y],
  )

  return (
    <Animated.ScrollView
      ref={tabScrollViewRef}
      {...scrollHandler}
      scrollEventThrottle={16}
    >
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
                paddingHorizontal: 20,
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
                width: widthBar,
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
        ref={scrollViewMenuRef}
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
        scrollEventThrottle={16}
      >
        <View style={{ flexDirection: 'row' }}>
          {items.map(({ label }, index) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
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
              onLayout={
                onMeasurementTab
                  ? ({
                      nativeEvent: {
                        layout: { width },
                      },
                    }) => onMeasurementTab(index, width)
                  : undefined
              }
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
                width: widthBar,
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
          }) => onMeasurementListSize(index, anchor)}
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
