import React, { memo, useCallback, useMemo } from 'react'
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native'
import { CalendarLine, CalendarProps } from 'schedule-carousel'
import CalendarWeek from './CalendarWeek'
import { createMonth } from './util/data'

const Header: React.FC<{ space: number }> = ({ space }) => {
  const textStyle: StyleProp<TextStyle> = {
    marginRight: space,
    ...styles.headerText,
  }

  return (
    <View style={styles.header}>
      <Text style={textStyle}>Dom</Text>
      <Text style={textStyle}>Seg</Text>
      <Text style={textStyle}>Ter</Text>
      <Text style={textStyle}>Qua</Text>
      <Text style={textStyle}>Qui</Text>
      <Text style={textStyle}>Sex</Text>
      <Text style={textStyle}>Sab</Text>
    </View>
  )
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const handleConstructorCalendarLine: () => readonly CalendarLine[] = useCallback(() => {
    console.log('gerado novamente')
    const monthData = createMonth(
      props.carouselAttributes.todayTime,
      props.options.calendarPeriod,
      props.options.days,
    )
    return Array.from(new Array(monthData.weeks.length).keys()).map((x) => {
      const week = monthData.weeks[x]

      return {
        data: {
          carouselAttributes: props.carouselAttributes,
          static: props.static,
        },
        setters: props.setters,
        keyWeek: `week_${week.week}_${week.month}`,
        week: week,
        nextDays:
          week.week === monthData.weeks.length - 1 && week.days.length < 7
            ? monthData.nextDays
            : undefined,
        oldDays:
          week.week === 0 && week.days.length < 7
            ? monthData.oldDays
            : undefined,
      }
    })
  }, [
    props.carouselAttributes.selectedDayTime,
    props.carouselAttributes.todayTime,
    props.options,
    props.static,
  ])

  // const [data] = useState(handleConstructorCalendarLine())

  const handleRenderItem: ListRenderItem<CalendarLine> = ({ item }) => {
    return <CalendarWeek {...item} />
  }

  // const data: readonly CalendarLine[] = handleConstructorCalendarLine()

  const HeaderMemo = useMemo(() => <Header space={props.static.space} />, [
    props.static.space,
  ])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={styles.calendar}>
        {(props.carouselAttributes.currentIndex === props.index ||
          props.carouselAttributes.currentIndex === props.index + 1 ||
          props.carouselAttributes.currentIndex === props.index - 1) && (
          <FlatList
            keyExtractor={(item) => item.keyWeek}
            data={handleConstructorCalendarLine()}
            ListHeaderComponent={() => HeaderMemo}
            ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
            renderItem={handleRenderItem}
            scrollEnabled={false}
            windowSize={296}
            centerContent={true}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  calendar: {
    width: 296,
    height: 224,
  },
  header: {
    flex: 1,
    height: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    width: 32,
    height: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#BDBDBD',
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
  },
})

export default memo(Calendar)
// export default Calendar
