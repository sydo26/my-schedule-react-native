import {
  DayOptions,
  DayProps,
  DayPropsConfig,
  MonthProps,
  WeekProps,
} from 'schedule-carousel'
import {
  getLastDayOfMonth,
  getMonth,
  getTime,
  getYear,
  subtractMonth,
  getLastDayOfWeekByPeriod,
  getFirstDayOfWeekByPeriod,
  compareDays,
} from './time'

export const createDay: (
  day: { year: number; month: number; day: number },
  options: DayOptions,
) => DayProps = (day, options) => {
  return {
    time: getTime(day.year, day.month, day.day),
    day: day.day,
    options: {
      alreadyPassed: options.alreadyPassed || false,
      isFromAnotherMonth: options.isFromAnotherMonth || false,
      hasActivity: options.hasActivity || false,
      hasExtraActivity: options.hasExtraActivity || false,
    },
  }
}

export const createWeek: (
  options: {
    week: number
    position: number
    max: number
  },
  allDays: DayProps[],
  calendarPeriod: number,
) => WeekProps = ({ week, position, max }, allDays, calendarPeriod) => {
  const days: DayProps[] = []

  for (let i = position; i < allDays.length; i++) {
    if (i === max + position) break
    days.push(allDays[i])
  }

  return {
    days,
    week,
    month: getMonth(calendarPeriod),
    year: getYear(calendarPeriod),
  }
}

export const createMonth: (
  today: number,
  calendarPeriod: number,
  daysConfig: DayPropsConfig[],
) => MonthProps = (today, calendarPeriod, daysConfig) => {
  const lastDay = getLastDayOfMonth(calendarPeriod)
  const lastMonth = subtractMonth(calendarPeriod, 1)
  const lastDayOfTheWeek = getLastDayOfWeekByPeriod(calendarPeriod)
  const firstDayOfTheWeek = getFirstDayOfWeekByPeriod(calendarPeriod)
  const lastMonthLastDay = getLastDayOfMonth(lastMonth)

  const beginOldDays = lastMonthLastDay - firstDayOfTheWeek + 1

  const year = getYear(calendarPeriod)
  const month = getMonth(calendarPeriod)

  const days: DayProps[] = Array.from(new Array(lastDay).keys()).map((x) => {
    const day = x + 1
    const option = daysConfig.filter(
      (config) =>
        config.day === day && config.config.isFromAnotherMonth !== true,
    )[0]

    return createDay(
      { year, month, day },
      {
        ...(option?.config || {}),

        alreadyPassed:
          getTime(year, month, day) < today &&
          !compareDays(getTime(year, month, day), today),
      },
    )
  })

  const nextDaysConfig = {
    begin: lastDayOfTheWeek === 6 ? 0 : 1,
    end: lastDayOfTheWeek === 6 ? 0 : 7 - (lastDayOfTheWeek + 1),
  }

  const oldDaysConfig = {
    begin: beginOldDays > lastMonthLastDay ? 0 : beginOldDays,
    end: beginOldDays > lastMonthLastDay ? 0 : lastMonthLastDay,
  }

  const nextDays =
    nextDaysConfig.begin !== 0
      ? Array.from(new Array(nextDaysConfig.end).keys()).map((x) => {
          const day = x + 1
          const option = daysConfig.filter(
            (config) =>
              config.day === day && config.config.isFromAnotherMonth === true,
          )[0]

          // console.log('Dia', day, 'criado')
          return createDay(
            { year, month, day },
            {
              ...(option?.config || {}),
              isFromAnotherMonth: true,
              alreadyPassed: false,
            },
          )
        })
      : []

  const oldDays =
    oldDaysConfig.end !== 0
      ? Array.from(
          new Array(oldDaysConfig.end - oldDaysConfig.begin + 1).keys(),
        ).map((x) => {
          const day = oldDaysConfig.begin + x
          const option = daysConfig.filter(
            (config) =>
              config.day === day && config.config.isFromAnotherMonth === true,
          )[0]
          return createDay(
            { year, month, day },
            {
              ...(option?.config || {}),
              isFromAnotherMonth: true,
              alreadyPassed: true,
            },
          )
        })
      : []

  const weeks: WeekProps[] = []
  for (let i = 0, currentDay = 0; true; i++) {
    const max =
      i === 0
        ? 7 - oldDays.length
        : currentDay === days.length - nextDays.length
        ? 7 - nextDays.length
        : 7

    if (currentDay >= days.length) break

    const week = createWeek(
      {
        position: currentDay,
        max,
        week: i,
      },
      days,
      calendarPeriod,
    )

    weeks.push(week)

    currentDay += max
  }

  return {
    calendarPeriod,
    lastDay,
    month,
    year,
    weeks,
    nextDays,
    oldDays,
  }
}
