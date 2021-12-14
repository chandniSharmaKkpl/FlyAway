import React, {useState, useCallback, useEffect} from 'react';
import format from 'date-fns/format';
import {errorCodeConstant} from '../constant';

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

export const checkStringContainsSpecialChar =(string)=>{
  var format =   /[^a-zA-Z-_\d\s]/   ///[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  
  if (format.test(string)) {
      return true;
  } else {
      return false;
  }

}

export const getDateInFormat = (
  dateString,
  isShortDayName,
  isCompleteDayName,
) => {
  if (dateString) {
    let dateTemp = Date.parse(dateString);
    if (isShortDayName) {
      let formattedDate = format(dateTemp, 'EE, MMMM dd yyyy');
      return formattedDate;
    } else if (isCompleteDayName) {
      let formattedDate = format(dateTemp, 'EEEE, MMMM dd yyyy');
      return formattedDate;
    } else {
      let formattedDate = format(dateTemp, 'dd-MM-yyyy');
      return formattedDate;
    }
  }
  return '';
};

export function isError(params) {
  if (params.code && Number.isInteger(params.code)) {
    switch (params.code) {
      case errorCodeConstant.BAD_REQUEST:
        return true;

      case errorCodeConstant.UNAUTHORIZED:
        return true;

      case errorCodeConstant.FORBIDDEN:
        return true;

      case errorCodeConstant.NOT_FOUND:
        return true;

      case errorCodeConstant.INTERNAL_SERVER_ERROR:
        return true;

      default:
        return false;
    }
  } else {
    return false;
  }
}

// const useBackButton1 = (handler) => {
  
//   // Frustration isolated! Yay! 🎉
//   useEffect(() => {
//     BackHandler.addEventListener("hardwareBackPress", handler);

//     return () => {
//       BackHandler.removeEventListener(
//         "hardwareBackPress",
//         handler
//       );
//     };
//   }, [handler]);
// }

export default {
  getTimeMessage,
  isError,
 // useBackButton1
};
