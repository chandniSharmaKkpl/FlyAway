import { View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React from "react";
import format from "date-fns/format";
import colorConst from '../constant/colorConstant';

const CalendarView = (props) => {
//  console.log("props.markedDates=====", props.markedDates);
  let date = new Date();
  let currentDate = format(date, "dd-MM-yyyy");

  const onClickDate = (day) => {
    props.onDayPress(day);
  };
  return (
    <View style={{ flex: 1, borderRadius: 20 }}>
      <Calendar
        markingType={"period"}
        markedDates={props.markedDates}
        current={currentDate.dateString}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2012-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => onClickDate(day)}
        // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {
        //   console.log("selected day", day);
        // }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MMM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
        }}
        // Hide month navigation arrows. Default = false
        //  hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        //renderArrow={(direction) => (<Arrow />)}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        // disableArrowLeft={false}
        // Disable right arrow. Default = false
        // disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter.
        // renderHeader={(date) => {/*Return JSX*/ }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        style={{
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 20,
          // height: 350
        }}
        theme={{
         // backgroundColor: "#ffffff",
         calendarBackground: colorConst.LIGH_BLUE,
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "red",
          todayTextColor: colorConst.NAVY_BLUE,
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "pink",
          arrowColor: colorConst.NAVY_BLUE,
          disabledArrowColor: "#d9e1e8",
          monthTextColor: colorConst.NAVY_BLUE,
          indicatorColor: colorConst.NAVY_BLUE,

          // textDayFontWeight: '300',
          // textMonthFontWeight: 'bold',
          // textDayHeaderFontWeight: '300',
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
};

export default CalendarView;
