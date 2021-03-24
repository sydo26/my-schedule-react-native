import React, { memo } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CalendarTitle } from 'schedule-carousel'
import { compareMonths, getDay, getMonth } from './util/time'

const monthsPrev = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

const Navbar: React.FC<CalendarTitle> = ({ data, setters, time, index }) => {
  const isEqualMonth = compareMonths(
    data.carouselAttributes.selectedDayTime,
    time,
  )

  // const isTomorrow = compareDays()
  const value = 24

  const opacity = React.useRef(new Animated.Value(0)).current
  const translateX = React.useRef(new Animated.Value(-value)).current

  const animation = Animated.parallel([
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: 1,
      duration: 250,
      delay: 500,
    }),
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: value,
      duration: 500,
      delay: 0,
    }),
  ])

  const backAnimation = Animated.parallel([
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: 0,
      duration: 125,
      delay: 125,
    }),
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: -value,
      duration: 250,
      delay: 0,
    }),
  ])

  React.useEffect(() => {
    if (data.carouselAttributes.currentIndex === index) {
      backAnimation.stop()
      animation.start()
    } else {
      animation.stop()
      backAnimation.start()
    }
  }, [data.carouselAttributes.currentIndex])

  return (
    <View style={styles.navbar}>
      <Animated.View
        style={{
          opacity: opacity,
          transform: [
            {
              translateX: 12,
            },
          ],
        }}
      >
        <MaterialIcons name="touch-app" style={styles.icon} />
      </Animated.View>
      <Animated.Text
        style={{
          ...styles.title,
          opacity: translateX.interpolate({
            inputRange: [-value, value],
            outputRange: [0.8, 1],
          }),
          transform: [
            {
              translateX: translateX,
            },
          ],
        }}
      >
        {`${monthsPrev[getMonth(time)]} ${
          isEqualMonth
            ? ('0' + getDay(data.carouselAttributes.selectedDayTime)).slice(-2)
            : ''
        }`}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    position: 'relative',
    width: '100%',
    flex: 1,
    maxHeight: 24,
    minHeight: 24,
    marginTop: 15,
    marginBottom: 27,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  title: {
    position: 'relative',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#4F4F4F',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginTop: 2,
  },
  icon: {
    fontSize: 24,
    color: '#EE7C13',
  },
})

export default memo(Navbar)
