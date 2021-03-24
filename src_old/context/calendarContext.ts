import React, { createContext } from 'react'

export type CalendarContextType = {
  setSelected: React.Dispatch<React.SetStateAction<number>>
  selected: number
  today: number
}

export default createContext<CalendarContextType>({
  setSelected: () => null,
  selected: 1,
  today: 1,
})
