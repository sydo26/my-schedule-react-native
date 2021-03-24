import React, { memo, useEffect, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native'

export type CalendarDayType = {
  day: number
  key: string
  type?: 'other_month' | 'already_passed'
  selected: number
  today: number
  setSelected: (value: number) => any
  hasActivity: boolean
  hasExtraActivity: boolean
}

export type CalendarType = {
  key: string
  items: CalendarDayType[]
}

const Circle: React.FC<{ color: string }> = ({ color }) => (
  <View
    style={{
      backgroundColor: color,
      width: 4,
      height: 4,
      borderRadius: 100,
      marginLeft: 1,
      marginRight: 1,
    }}
  ></View>
)

const Day: React.FC<CalendarDayType> = ({
  type,
  day,
  hasActivity,
  hasExtraActivity,
  today,
  selected,
  setSelected = () => null,
}) => {
  const isSelected = selected === day && type !== 'other_month'
  const isToday =
    today === day && type !== 'other_month' && type !== 'already_passed'

  const contentStyle: StyleProp<ViewStyle> = {
    opacity:
      type === 'other_month' ? 0.25 : type === 'already_passed' ? 0.6 : 1,
    borderColor: isToday ? '#EB5757' : 'transparent',
    backgroundColor: isSelected ? '#EE7C13' : 'transparent',
  }

  const textStyle: StyleProp<TextStyle> = {
    color: isSelected ? 'white' : '#4F4F4F',
  }

  return (
    <TouchableHighlight
      style={{
        borderRadius: 10,
      }}
      underlayColor="#F2F2F2"
      onPress={() => {
        if (type !== 'other_month') {
          setSelected(day)
        }
      }}
    >
      <View style={{ borderRadius: 5, overflow: 'hidden' }}>
        <View style={{ ...styles.day, ...contentStyle }}>
          <Text
            style={{ ...textStyle, fontFamily: 'Roboto-Regular', fontSize: 14 }}
          >
            {day}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            maxHeight: 4,
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            bottom: 4,
            left: 0,
          }}
        >
          {hasExtraActivity && <Circle color="#56CCF2" />}
          {hasActivity && <Circle color="#EB5757" />}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const DayMemo = memo(Day)

const Line: React.FC<{ item: CalendarType; space: number }> = ({
  item: { items },
  space,
}) => {
  const handleRenderItem: ListRenderItem<CalendarDayType> = ({ item }) => (
    <DayMemo {...item} />
  )

  return (
    <View style={styles.line}>
      <FlatList
        keyExtractor={(item) => item.key}
        data={items}
        horizontal
        removeClippedSubviews={true}
        renderItem={handleRenderItem}
        ItemSeparatorComponent={() => <View style={{ width: space }} />}
        scrollEnabled={false}
      />
    </View>
  )
}

export type OptionType = {
  day?: number
  oldDay?: number
  type?: 'other_month' | 'already_passed'
  hasActivity?: boolean
  hasExtraActivity?: boolean
}

const LineMemo: React.NamedExoticComponent<{
  item: CalendarType
  space: number
}> = memo(Line)

type TreatDataType = {
  countDays: number
  oldDays: {
    initial: number
    end: number
  }
  options?: OptionType[]
  today: number
}

const Header: React.FC<{ space: number }> = ({ space }) => {
  const textStyle: StyleProp<TextStyle> = {
    marginRight: space,
    width: 32,
    height: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#BDBDBD',
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
  }
  return (
    <View
      style={{
        flex: 1,
        height: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
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

const createDay: (
  values: {
    j?: number
    i?: number
    countDays: number
    today: number
    selected: number
    setSelected: (value: number) => any
  },
  options?: OptionType[],
) => CalendarDayType = (
  { j = undefined, i = undefined, countDays, today, selected, setSelected },
  options,
) => {
  if (j !== undefined) {
    const optJ = options?.filter((x) => x.oldDay === j)[0]
    return {
      key: `day_${j}`,
      day: j,
      type: optJ?.type || 'other_month',
      today,
      selected,
      setSelected,
      hasActivity: optJ?.hasActivity || false,
      hasExtraActivity: optJ?.hasExtraActivity || false,
    }
  }
  const optI = options?.filter((x) => x.day === i! + 1)[0]
  return {
    key: `day_${i! + 1}`,
    day: i! + 1 > countDays ? -1 : i! + 1,
    type: optI?.type || (i! + 1 < today ? 'already_passed' : undefined),
    today,
    selected,
    setSelected,
    hasActivity: optI?.hasActivity || false,
    hasExtraActivity: optI?.hasExtraActivity || false,
  }
}

interface TreatDataTypeExtra extends TreatDataType {
  selected: number
  setSelected: (value: number) => any
}

const treatData: (values: TreatDataTypeExtra) => CalendarType[] = ({
  countDays,
  oldDays,
  options,
  today,
  selected,
  setSelected,
}) => {
  let i = 0
  let j = oldDays.initial
  return new Array(6).fill(0).map((_, index1) => {
    return {
      key: `line_${index1 + 1}`,
      items: new Array(7)
        .fill(0)
        .map(() => {
          if (j <= oldDays.end) {
            return createDay(
              { j: j++, countDays, today, selected, setSelected },
              options,
            )
          }
          return createDay(
            { i: i++, countDays, today, selected, setSelected },
            options,
          )
        })
        .filter((x) => x.day > 0),
    }
  })
}

interface CalendarDataType extends TreatDataType {
  space?: number
  initialDaySelected: number
}

const Calendar: React.FC<CalendarDataType> = ({
  oldDays,
  countDays,
  space = 8,
  options,
  initialDaySelected,
  today,
}) => {
  const [selected, setSelected] = useState<number>(initialDaySelected)

  const [data, setData] = useState<CalendarType[]>(
    treatData({
      countDays,
      oldDays,
      options,
      today,
      selected: selected || 1,
      setSelected: (value: number) => setSelected(value),
    }),
  )

  useEffect(() => {
    return () => {
      setData(
        treatData({
          countDays,
          oldDays,
          options,
          today,
          selected: selected || 1,
          setSelected: (value: number) => setSelected(value),
        }),
      )
      setSelected(initialDaySelected)
    }
  }, [])

  const handleRenderItem: ListRenderItem<CalendarType> = ({ item }) => (
    <LineMemo space={space} item={item} />
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={styles.calendar}>
        <FlatList
          keyExtractor={(item) => item.key}
          data={data}
          ListHeaderComponent={<Header space={space} />}
          renderItem={handleRenderItem}
          scrollEnabled={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  calendar: {
    width: 296,
    height: 222,
  },
  day: {
    maxWidth: 32,
    maxHeight: 32,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  line: {
    flex: 1,
    height: 32,
    maxHeight: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

export default memo(Calendar)
