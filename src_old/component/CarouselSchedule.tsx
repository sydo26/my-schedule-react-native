import * as React from 'react'
import {
  View,
  SafeAreaView,
  ListRenderItem,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native'
import ScheduleContext from '../context/scheduleContext'
import Carousel, {
  CarouselProps,
  getInputRangeFromIndexes,
} from 'react-native-snap-carousel'
import Item from './Item'

const { width } = Dimensions.get('window')

export type CarouselItem = {
  title: string
  text: string
}

const currentWidth = width < 400 ? 272 : 296
const currentSpaceWidth = width < 400 ? 8 : 12

const CarouselSchedule: React.FC<{ items: readonly CarouselItem[] }> = ({
  items,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0)
  const [enabledScroll, setEnabledScroll] = React.useState<boolean>(true)
  const carouselRef = React.useRef<Carousel<CarouselItem>>(null)

  React.useEffect(() => {
    return () => {
      setEnabledScroll(true)
    }
  }, [])

  const handleRenderItem: ListRenderItem<any> = ({ ...rest }) => {
    return (
      <Item
        {...rest}
        currentWidth={currentWidth}
        currentIndex={currentIndex}
        carousel={carouselRef}
        currentSpaceWidth={currentSpaceWidth}
        lastIndex={items.length - 1}
      />
    )
  }

  const scrollInterpolator: (
    index: number,
    carouselProps: CarouselProps<any>,
  ) => {
    inputRange: number[]
    outputRange: number[]
  } = (index, carouselProps) => {
    const range = [3, 2, 1, 0, -1] // <- Remember that this has to be declared in a reverse order
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps)
    const outputRange = range

    return { inputRange, outputRange }
  }

  const animatedStyle: (
    index: number,
    animatedValue: Animated.Value,
    carouselProps: CarouselProps<any>,
  ) => any = (index, animatedValue, carouselProps) => {
    const zIndex = currentIndex === index ? 10 : 0
    return {
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
      }),
      ...(Platform.OS === 'ios' && { zIndex }),
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        maxHeight: 288,
        backgroundColor: 'transparent',
      }}
    >
      <ScheduleContext.Provider
        value={{
          currentIndex,
          currentWidth,
          currentSpaceWidth,
          lastIndex: items.length - 1,
          carousel: carouselRef,
        }}
      >
        <View style={styles.content}>
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={items}
            onBeforeSnapToItem={(index) => setCurrentIndex(index)}
            slideInterpolatedStyle={animatedStyle}
            scrollInterpolator={scrollInterpolator}
            sliderWidth={width}
            scrollEnabled={enabledScroll}
            sliderHeight={288}
            itemWidth={width - 48}
            itemHeight={288}
            swipeThreshold={60}
            firstItem={0}
            enableMomentum={false}
            maxToRenderPerBatch={2}
            renderItem={handleRenderItem}
            activeSlideAlignment={'center'}
            lockScrollWhileSnapping
            initialNumToRender={2}
          />
        </View>
      </ScheduleContext.Provider>
    </SafeAreaView>
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
