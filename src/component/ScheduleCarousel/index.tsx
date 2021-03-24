import React, { useEffect, useState } from 'react'
import {
  Animated,
  Dimensions,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import Carousel, { CarouselProps } from 'react-native-snap-carousel'
import {
  CarouselProperties,
  ScheduleCarousel,
  ScheduleDate,
  StaticProps,
} from 'schedule-carousel'

import CalendarWrapper from './CalendarWrapper'
import { getDay, getMonth, getPeriodByTime, getTime } from './util/time'

const { width } = Dimensions.get('window')

const CarouselSchedule: React.FC<ScheduleCarousel> = (props) => {
  const [carouselAttr, setCarouselAttr] = useState<CarouselProperties>({
    currentIndex: props.firstRenderItem,
    lastIndex: props.dates.length - 1,
    todayTime: props.todayTime,
    selectedDayTime: props.todayTime,
  })

  const carouselRef = React.useRef<Carousel<ScheduleDate>>(null)

  const [staticAttr] = useState<StaticProps>({
    space: width < 400 ? 8 : 12,
    currentWidth: width < 400 ? 272 : 296,
    currentHeight: 288,
  })

  const setSelectedDay = (time: number) => {
    setCarouselAttr((value) => ({ ...value, selectedDayTime: time }))
  }

  const setCurrentIndex = (index: number) => {
    setCarouselAttr((value) => ({ ...carouselAttr, currentIndex: index }))
  }

  useEffect(
    () =>
      setCarouselAttr({
        currentIndex: props.firstRenderItem,
        lastIndex: props.dates.length - 1,
        todayTime: props.todayTime,
        selectedDayTime: props.todayTime,
      }),
    [],
  )

  useEffect(() => {
    console.log(carouselAttr.currentIndex)
  }, [carouselAttr.currentIndex])

  useEffect(() => {
    console.log(
      getMonth(carouselAttr.selectedDayTime),
      getDay(carouselAttr.selectedDayTime),
    )
  }, [carouselAttr.selectedDayTime])

  const handleRenderItem: ListRenderItem<ScheduleDate> = ({ item, index }) => {
    return (
      <CalendarWrapper
        carousel={carouselRef}
        index={index}
        setters={{ setSelectedDay, setCurrentIndex }}
        options={{
          calendarPeriod: getPeriodByTime(getTime(item.year, item.month, 1)),
          days: item.properties || [],
        }}
        carouselAttributes={carouselAttr}
        static={staticAttr}
      />
    )
  }

  const animatedStyle: (
    index: number,
    animatedValue: Animated.Value,
    carouselProps: CarouselProps<any>,
  ) => any = (index, animatedValue, carouselProps) => {
    const zIndex = carouselAttr.currentIndex === index ? 10 : 0
    return {
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
        extrapolate: 'clamp',
      }),
      ...(Platform.OS === 'ios' && { zIndex }),
    }
  }

  return (
    <View style={styles.content}>
      <Carousel
        ref={carouselRef}
        layout={'default'}
        keyExtractor={(item) => `calendar_${item.year}_${item.month}`}
        data={props.dates}
        onBeforeSnapToItem={(index) => setCurrentIndex(index)}
        slideInterpolatedStyle={animatedStyle}
        sliderWidth={width}
        sliderHeight={staticAttr.currentHeight}
        itemWidth={width - 48}
        itemHeight={staticAttr.currentHeight}
        swipeThreshold={60}
        firstItem={props.firstRenderItem}
        // enableMomentum={false}
        maxToRenderPerBatch={2}
        renderItem={handleRenderItem}
        activeSlideAlignment={'center'}
        lockScrollWhileSnapping={true}
        initialNumToRender={2}
        debug={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxHeight: 288,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default CarouselSchedule
