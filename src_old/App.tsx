import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import CarouselSchedule, { CarouselItem } from './component/CarouselSchedule'
import { useFonts } from 'expo-font'

const items: readonly CarouselItem[] = [
  {
    title: 'Item 1',
    text: 'Text 1',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
  },
  {
    title: 'Item 3',
    text: 'Text 3',
  },
  {
    title: 'Item 4',
    text: 'Text 4',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
  },
  {
    title: 'Item 6',
    text: 'Text 6',
  },
  {
    title: 'Item 7',
    text: 'Text 7',
  },
  {
    title: 'Item 8',
    text: 'Text 8',
  },
  {
    title: 'Item 9',
    text: 'Text 9',
  },
  {
    title: 'Item 10',
    text: 'Text 10',
  },
  {
    title: 'Item 11',
    text: 'Text 11',
  },
  {
    title: 'Item 12',
    text: 'Text 12',
  },
  {
    title: 'Item 13',
    text: 'Text 13',
  },
  {
    title: 'Item 14',
    text: 'Text 14',
  },
  {
    title: 'Item 15',
    text: 'Text 15',
  },
  {
    title: 'Item 16',
    text: 'Text 16',
  },
]

// const days = [
//   {
//     day: 10,
//     month: 7,
//     year: 2021,
//     hasActivity: true,
//     hasExtraActivity: true,
//   },
// ]

export default function App() {
  const [loaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CarouselSchedule items={items} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
