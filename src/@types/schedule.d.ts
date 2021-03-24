declare module 'schedule-carousel' {
  import React from 'react'
  import Carousel from 'react-native-snap-carousel'

  export interface ScheduleCarousel {
    todayTime: number
    dates: ScheduleDate[]
    firstRenderItem: number
  }

  export interface ScheduleDate {
    year: number
    month: number
    properties?: DayPropsConfig[]
  }

  export interface CalendarProps {
    static: StaticProps
    carouselAttributes: CarouselProperties
    options: {
      calendarPeriod: number
      days: DayPropsConfig[] /** Se o dia existir no período, então é aplicado as regras definidas */
    }
    carousel: React.useRef<Carousel<ScheduleDate>>
    setters: Setters
    index: number
  }

  export interface CarouselProperties {
    currentIndex: number
    lastIndex: number
    todayTime: number
    selectedDayTime: number
  }

  export interface StaticProps {
    space: number
    currentWidth: number
    currentHeight: number
  }

  export interface DayPropsConfig {
    day: number
    config: DayConfig
  }

  export interface DayConfig {
    isFromAnotherMonth?: boolean
    hasActivity?: boolean
    hasExtraActivity?: boolean
  }

  export interface DayOptions extends DayConfig {
    alreadyPassed?: boolean
  }

  export interface DayProps {
    time: number
    day: number
    options: DayOptions
  }

  // Week Interfaces

  export interface WeekProps {
    days: DayProps[]
    week: number
    month: number
    year: number
  }

  // Month Interfaces

  export interface MonthProps {
    calendarPeriod: number
    lastDay: number
    weeks: WeekProps[]
    month: number
    year: number
    oldDays: DayProps[]
    nextDays: DayProps[]
  }

  // Calendar interfaces

  export interface CalendarLine {
    data: Data
    setters: Setters
    keyWeek: string
    week: WeekProps
    oldDays?: DayProps[]
    nextDays?: DayProps[]
  }

  export interface CalendarCell {
    data: Data
    setters: Setters
    keyDay: string
    day: DayProps
  }

  export interface CalendarTitle {
    data: Data
    setters: Setters
    index: number
    time: number
  }

  //

  export interface Data {
    static: StaticProps
    carouselAttributes: CarouselProperties
  }

  export interface Setters {
    setSelectedDay: (time: number) => void
    setCurrentIndex: (index: number) => void
  }
}
