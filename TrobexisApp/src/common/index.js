import React, { useState, useCallback, useEffect } from "react";
import format from "date-fns/format";
import { errorCodeConstant } from "../constant";
import localDb from "../database/localDb";
import moment from "moment";

const getTimeMessage = () => {
  var d = new Date();
  var hour = d.getHours();
  var amPm = "";
  let stringToRead = "";
  if (hour < 12) {
    amPm = "am";
    stringToRead = "Good morning!";
  } else {
    amPm = "pm";
    if (hour >= 12 && hour <= 17) {
      stringToRead = "Good Afternoon!";
    } else {
      if (hour > 17 && hour <= 24) {
        stringToRead = "Good Evening!";
      }
    }
  }
  return stringToRead;
};

export const checkStringContainsSpecialChar = (string) => {
  var format = /[^a-zA-Z-_\d\s]/; ///[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
};

export const msToTime = (ms) => {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days";
};

export const convertDateTime = (
  dateString,
  isDate,
  isTime,
  isDateTime,
  dateValueArray
) => {
  if (!dateValueArray) return null;
  for (let index = 0; index < dateValueArray.length; index++) {
    const element = dateValueArray[index];

    if (isDate && !isTime && !isDateTime) {
      if (element.key == "Format.Date") {
        let formattedDate = moment(dateString).format(element.value);
        return formattedDate;
      }
    }
    if (!isDate && isTime && !isDateTime) {
      if (element.key == "Format.Time") {
        let formattedDate = moment(dateString).format(element.value);
        return formattedDate;
      }
    }
  }
};

export const getDateTimeOfView = async (
  dateString,
  isDate,
  isTime,
  isDateTime
) => {
  let dateValueArray = await getDateInFormat(dateString, false, false);
  for (let index = 0; index < dateValueArray.length; index++) {
    const element = dateValueArray[index];

    if (isDate && !isTime && !isDateTime) {
      if (element.key == "Format.Date") {
        let formattedDate = moment(dateString).format(element.value);
        return formattedDate;
      }
    }
    if (!isDate && isTime && !isDateTime) {
      if (element.key == "Format.Time") {
        let formattedDate = moment(dateString).format(element.value);
        return formattedDate;
      }
    }
  }
};

export const approvalDateTimeFormate = (
  dateString,
  isDate,
  isTime,
  isDateTime,
  dateValueArray
) => {
  console.log("dateValueArray --", dateString,dateValueArray);
  if (!dateValueArray) return null;
  for (let index = 0; index < dateValueArray.length; index++) {
    const element = dateValueArray[index];
    if (!isDate && !isTime && isDateTime) {
      if (element.key == "Format.Datetime") {
        console.log(
          "approvalDateTimeFormate ==>",
          element.value,
          dateString,
          moment(dateString).format(element.value)
        );
        let result = element.value.slice(0, 10);
        let formattedDate = moment(dateString,["lll"]).format(result);
        console.log("formattedDate -1", formattedDate);
        return formattedDate;
      }
    }
  }
};

export const getDateInFormat = (
  dateString,
  isShortDayName,
  isCompleteDayName
) => {
  if (dateString) {
    return new Promise((resolve, reject) => {
      try {
        let userSetting = localDb.getUserSettings();
        resolve(userSetting);
      } catch (error) {
        reject(error);
      }
    });
  }
};

/*

        let arrayTemp = response;
        resolve(arrayTemp);

        // Need to show same date format in all app

        // let userSetting = localDb.getUserSettings();
        // var promiseResponse = '';
        // Promise.resolve(userSetting).then(response => {
        //   let arrayTemp = response;

        let formatter = arrayTemp.map(dataObj => {
          if (!isShortDayName && !isCompleteDayName) {
            if (dataObj.key == 'Format.Datetime') {
              let formattedDate = moment(dateString).format(dataObj.value);
              console.log(
                ' formattedDate date time --->',
                formattedDate,
                'dataObj.value',
                dataObj.value,
              );
              return formattedDate;
            }
          } else {
            if (isShortDayName) {
              if (dataObj.key == 'Format.Date') {
                let formattedDate = moment(dateString).format(dataObj.value);
                // console.log(" formattedDate --->", formattedDate, "dataObj.value", dataObj.value)
                //  return formattedDate;
              }
            } else {
              if (dataObj.key == 'Format.Datetime') {
                let formattedDate = moment(dateString).format(dataObj.value);
                // console.log(" formattedDate --->", formattedDate, "dataObj.value", dataObj.value)
                // return formattedDate;
              }
            }
          }
        });
*/
export const getDateInFormatNoTime = (dateString) => {
  if (dateString) {
    let dateTemp = Date.parse(dateString);
    // Need to show same date format in all app

    let formattedDate = format(dateTemp, "dd MMMM yyyy");
    return formattedDate;
    // if (isShortDayName) {
    //   let formattedDate = format(dateTemp, 'EE, MMMM dd yyyy');
    //   return formattedDate;
    // } else if (isCompleteDayName) {
    // let formattedDate = format(dateTemp, 'EEEE, MMMM dd yyyy');
    // return formattedDate;
    // } else {
    // let formattedDate = format(dateTemp, 'dd-MM-yyyy');
    // return formattedDate;
    // }
  }
  return "";
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
  msToTime,
  getDateTimeOfView,
  // useBackButton1
};
