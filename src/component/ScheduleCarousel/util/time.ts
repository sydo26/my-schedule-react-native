export const getDay = (time: number) => new Date(time).getDate()

export const getMonth = (time: number) => new Date(time).getMonth()

export const getYear = (time: number) => new Date(time).getFullYear()

export const getDayOfTheWeek = (time: number) => new Date(time).getDay()

export const subtractMonth = (time: number, value: number) =>
  new Date(time).setMonth(getMonth(time) - value)

export const incrementMonth = (time: number, value: number) =>
  new Date(time).setMonth(getMonth(time) + value)

export const getLastDayOfMonth = (time: number) => {
  const date = new Date(time)

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const getFirstDayOfWeekByPeriod = (time: number) => {
  const date = new Date(time)

  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export const getLastDayOfWeekByPeriod = (time: number) => {
  const date = new Date(time)

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
}

export const getPeriod = (year: number, month: number) =>
  new Date(year, month + 1, 0).getTime()

export const getPeriodByTime = (time: number) => new Date(time).getTime()

export const getTime = (year: number, month: number, day: number) =>
  new Date(year, month, day).getTime()

export const now = () => Date.now()

export const nextDayOfWeek = (currentDayOfWeek: number) => {
  const value = currentDayOfWeek - 1
  return value < 0 ? 6 : value
}

export const compareDays = (day1Time: number, day2Time: number) => {
  const date1 = new Date(day1Time)
  const date2 = new Date(day2Time)

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const compareMonths = (monht1Time: number, month2Time: number) => {
  const month1 = new Date(monht1Time)
  const month2 = new Date(month2Time)

  return (
    month1.getFullYear() === month2.getFullYear() &&
    month1.getMonth() === month2.getMonth()
  )
}
