import React from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import ScheduleCarousel from './component/ScheduleCarousel'
import { now } from './component/ScheduleCarousel/util/time'
export default function App() {
  const [loaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if (!loaded) {
    console.log('Falha ao carregar as fontes')
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScheduleCarousel
        firstRenderItem={1}
        todayTime={now()}
        dates={[
          {
            year: 2021,
            month: 1,
            properties: [
              {
                day: 28,
                config: {
                  hasExtraActivity: true,
                },
              },
            ],
          },
          {
            year: 2021,
            month: 2,
            properties: [
              {
                day: 23,
                config: {
                  hasActivity: true,
                },
              },
              {
                day: 24,
                config: {
                  hasExtraActivity: true,
                  hasActivity: true,
                },
              },
            ],
          },
          {
            year: 2021,
            month: 3,
            properties: [
              {
                day: 1,
                config: {
                  hasActivity: true,
                },
              },
            ],
          },
        ]}
      />
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
