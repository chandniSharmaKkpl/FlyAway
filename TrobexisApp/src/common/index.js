import format from "date-fns/format";

const getTimeMessage = () => {
  var d = new Date();
  var hour = d.getHours();
  var amPm = '';
  let stringToRead = '';
  if (hour < 12) {
    amPm = 'am';
    stringToRead = 'Good morning!';
  } else {
    amPm = 'pm';
    if (hour >= 12 && hour <= 17) {
      stringToRead = 'Good Afternoon!';
    } else {
      if (hour > 17 && hour <= 24) {
        stringToRead = 'Good Evening!';
      }
    }
  }
  return stringToRead;
};

export const getDateInFormat = (dateString, isShortDayName, isCompleteDayName) => {
  if (dateString) {
  let dateTemp = Date.parse(dateString);
  if (isShortDayName) {
    let formattedDate = format(dateTemp, 'EE, MMMM dd yyyy');
    return formattedDate;
  } else if(isCompleteDayName){
    let formattedDate = format(dateTemp, 'EEEE, MMMM dd yyyy');
    return formattedDate;
  }else {
    let formattedDate = format(dateTemp, 'yyyy-MM-dd');
    return formattedDate;
  }
}
return ""
};

export default {
  getTimeMessage,
};
