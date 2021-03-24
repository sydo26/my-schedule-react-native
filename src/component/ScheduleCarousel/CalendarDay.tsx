import React, { memo } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native'
import { CalendarCell } from 'schedule-carousel'
import { compareDays } from './util/time'

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

const CalendarDay: React.FC<CalendarCell> = ({
  keyDay,
  day: { day, options, time },
  data,
  setters,
}) => {
  const isSelected =
    compareDays(data.carouselAttributes.selectedDayTime, time) &&
    !options.isFromAnotherMonth

  const isToday =
    compareDays(data.carouselAttributes.todayTime, time) &&
    !options.isFromAnotherMonth

  const contentStyle: StyleProp<ViewStyle> = {
    opacity: options.isFromAnotherMonth
      ? 0.25
      : options.alreadyPassed
      ? 0.6
      : 1,
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
        if (!options.isFromAnotherMonth && !isSelected) {
          setters.setSelectedDay(time)
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
        <View style={styles.circles}>
          {options.hasExtraActivity && <Circle color="#56CCF2" />}
          {options.hasActivity && <Circle color="#EB5757" />}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
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
  circles: {
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
  },
})

export default memo(CalendarDay)
