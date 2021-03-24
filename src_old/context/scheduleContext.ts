import React, { createContext } from 'react'
import Carousel from 'react-native-snap-carousel'
import { CarouselItem } from '../component/CarouselSchedule'

export type ScheduleContextType = {
  currentIndex: number
  currentWidth: number
  currentSpaceWidth: number
  lastIndex: number
  carousel?: React.RefObject<Carousel<CarouselItem>>
}

export default createContext<ScheduleContextType>({
  currentIndex: 0,
  currentSpaceWidth: 12,
  currentWidth: 296,
  lastIndex: 0,
  carousel: undefined,
})
