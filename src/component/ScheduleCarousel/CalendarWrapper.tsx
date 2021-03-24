import React from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'

import Calendar from './Calendar'
import { MaterialIcons } from '@expo/vector-icons'
import { CalendarProps } from 'schedule-carousel'
import CalendarNavbar from './CalendarNavbar'

const { width } = Dimensions.get('window')

const Item: React.FC<CalendarProps> = (props) => {
  const translateX = React.useRef(new Animated.Value(0)).current
  const opacity = React.useRef(new Animated.Value(0)).current

  const animations = Animated.parallel([
    Animated.timing(translateX, {
      toValue: width - 48 - props.static.currentWidth - 29,
      useNativeDriver: true,
      duration: 250,
      delay: 0,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
      delay: 200,
    }),
  ])

  const backAnimations = Animated.parallel([
    Animated.timing(translateX, {
      toValue: 0,
      useNativeDriver: true,
      duration: 250,
      delay: 0,
    }),
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: 0,
    }),
  ])

  React.useEffect(() => {
    if (props.carouselAttributes.currentIndex === props.index) {
      backAnimations.stop()
      animations.start()
    } else {
      animations.stop()
      backAnimations.start()
    }
  }, [props.carouselAttributes.currentIndex])

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        height: 288,
      }}
    >
      <CalendarNavbar
        data={{
          carouselAttributes: props.carouselAttributes,
          static: props.static,
        }}
        index={props.index}
        setters={props.setters}
        time={props.options.calendarPeriod}
      />
      <Animated.View
        style={{
          ...styles.content,
          backgroundColor: 'red',
          maxWidth: props.static.currentWidth,
          minWidth: props.static.currentWidth,
          transform: [{ translateX }],
        }}
      >
        <Calendar {...props} />
      </Animated.View>

      {(props.carouselAttributes.currentIndex === props.index ||
        props.carouselAttributes.currentIndex === props.index - 1) &&
        props.index > 0 && (
          <TouchableHighlight
            underlayColor="transparent"
            style={{
              ...styles.contentArrowLeft,
              width: width - 48 - props.static.currentWidth,
              opacity:
                props.carouselAttributes.currentIndex === props.index ? 0.5 : 1,
            }}
            onPress={() => {
              if (props.carouselAttributes.currentIndex === props.index) {
                props.carousel?.current?.snapToPrev(true)
              } else {
                props.carousel?.current?.snapToNext(true)
              }
            }}
          >
            <Animated.View
              style={{
                ...styles.left,
                opacity,
              }}
            >
              {props.carouselAttributes.currentIndex === props.index && (
                <MaterialIcons
                  name="keyboard-arrow-left"
                  style={styles.arrow}
                />
              )}
            </Animated.View>
          </TouchableHighlight>
        )}
      {(props.carouselAttributes.currentIndex === props.index ||
        props.carouselAttributes.currentIndex === props.index + 1) &&
        props.index < props.carouselAttributes.lastIndex && (
          <TouchableHighlight
            underlayColor="transparent"
            style={{
              ...styles.contentArrowRight,
              width: width - 48 - props.static.currentWidth,
              opacity:
                props.carouselAttributes.currentIndex === props.index ? 0.5 : 1,
              right: -(width - 48 - props.static.currentWidth) + 28,
            }}
            onPress={() => {
              if (props.carouselAttributes.currentIndex === props.index) {
                props.carousel?.current?.snapToNext(true)
              } else {
                props.carousel?.current?.snapToPrev(true)
              }
            }}
          >
            <Animated.View
              style={{
                ...styles.right,
                opacity,
              }}
            >
              {props.carouselAttributes.currentIndex === props.index && (
                <MaterialIcons
                  name="keyboard-arrow-right"
                  style={styles.arrow}
                />
              )}
            </Animated.View>
          </TouchableHighlight>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentArrowLeft: {
    position: 'absolute',
    top: 66,
    left: -29,
    height: 288 * 0.8 - 66,
  },
  contentArrowRight: {
    position: 'absolute',
    top: 66,
    height: 288 * 0.8 - 66,
  },
  arrow: {
    fontSize: 32,
    color: '#E0E0E0',
  },
  left: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
  right: {
    position: 'absolute',
    top: '50%',
    left: 0,
  },
})

export default Item
