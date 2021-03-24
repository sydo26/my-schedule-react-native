import React, { memo } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import { CarouselItem } from './CarouselSchedule'
import Navbar from './Navbar'
import Calendar from './Calendar'
import { MaterialIcons } from '@expo/vector-icons'
import Carousel from 'react-native-snap-carousel'

const { width } = Dimensions.get('window')

export type ItemType = {
  item: CarouselItem
  index: number
}

interface ItemTypeExtra extends ItemType {
  currentIndex: number
  currentWidth: number
  currentSpaceWidth: number
  carousel?: React.RefObject<Carousel<CarouselItem>>
  lastIndex: number
}

const CalendarMemo = memo(Calendar)

const Item: React.FC<ItemTypeExtra> = ({
  item,
  index,
  currentIndex,
  currentWidth,
  currentSpaceWidth,
  carousel,
  lastIndex,
}) => {
  const translateX = React.useRef(new Animated.Value(0)).current
  const opacity = React.useRef(new Animated.Value(0)).current

  const animations = Animated.parallel([
    Animated.timing(translateX, {
      toValue: width - 48 - currentWidth - 29,
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
    if (currentIndex === index) {
      backAnimations.stop()
      animations.start()
    } else {
      animations.stop()
      backAnimations.start()
    }
  }, [currentIndex])

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        height: 288,
      }}
    >
      <Navbar index={index} title={item.title} />
      <Animated.View
        style={{
          ...styles.content,
          maxWidth: currentWidth,
          minWidth: currentWidth,
          transform: [{ translateX }],
        }}
      >
        <CalendarMemo
          space={currentSpaceWidth}
          oldDays={{ initial: 28, end: 28 }}
          countDays={31}
          initialDaySelected={17}
          today={16}
          options={[
            {
              day: 16,
              hasActivity: true,
            },
            {
              day: 17,
              hasActivity: true,
              hasExtraActivity: true,
            },
          ]}
        />
      </Animated.View>

      {(currentIndex === index || currentIndex === index - 1) && index > 0 && (
        <TouchableHighlight
          underlayColor="transparent"
          style={{
            ...styles.contentArrowLeft,
            width: width - 48 - currentWidth,
            opacity: currentIndex === index ? 0.5 : 1,
          }}
          onPress={() => {
            if (currentIndex === index) {
              carousel?.current?.snapToPrev(true)
            } else {
              carousel?.current?.snapToNext(true)
            }
          }}
        >
          <Animated.View
            style={{
              ...styles.left,
              opacity,
            }}
          >
            {currentIndex === index && (
              <MaterialIcons name="keyboard-arrow-left" style={styles.arrow} />
            )}
          </Animated.View>
        </TouchableHighlight>
      )}
      {(currentIndex === index || currentIndex === index + 1) &&
        index < lastIndex && (
          <TouchableHighlight
            underlayColor="transparent"
            style={{
              ...styles.contentArrowRight,
              width: width - 48 - currentWidth,
              opacity: currentIndex === index ? 0.5 : 1,
              right: -(width - 48 - currentWidth) + 28,
            }}
            onPress={() => {
              if (currentIndex === index) {
                carousel?.current?.snapToNext(true)
              } else {
                carousel?.current?.snapToPrev(true)
              }
            }}
          >
            <Animated.View
              style={{
                ...styles.right,
                opacity,
              }}
            >
              {currentIndex === index && (
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

export default memo(Item)
