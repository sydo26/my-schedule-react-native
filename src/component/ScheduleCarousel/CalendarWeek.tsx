import React, { memo } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { CalendarCell, CalendarLine, DayProps } from 'schedule-carousel'
import CalendarDay from './CalendarDay'

const CalendarWeek: React.FC<CalendarLine> = ({
  keyWeek,
  week: { days, week },
  nextDays,
  oldDays,
  data,
  setters,
}) => {
  const handleRenderItem: ListRenderItem<CalendarCell> = ({ item }) => (
    <CalendarDay {...item} />
  )

  const handleConstructorCalendarCell: (
    listDays: DayProps[],
  ) => readonly CalendarCell[] = (listDays) => {
    return Array.from(new Array(7).keys()).map((x) => {
      const day = listDays[x]
      return {
        data,
        setters,
        keyDay: `day_${day.day}_${day.time}`,
        day,
      }
    })
  }

  const dataFlatList: readonly CalendarCell[] = handleConstructorCalendarCell([
    ...(oldDays || []),
    ...days,
    ...(nextDays || []),
  ])

  return (
    <View style={styles.line}>
      <FlatList
        keyExtractor={(item) => item.keyDay}
        data={dataFlatList}
        horizontal
        removeClippedSubviews={true}
        renderItem={handleRenderItem}
        ItemSeparatorComponent={() => (
          <View style={{ width: data.static.space }} />
        )}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 32,
    maxHeight: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

export default memo(CalendarWeek)
