import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Pressable,
  BackHandler,
} from "react-native";
import stylesHome from "../home/Home.style";
import styles from "./BusBooking.style";
import stylesCommon from "../../common/common.style";
import format from "date-fns/format";
import PushController from "../../component/PushControllerTemp";
import { WebView } from "react-native-webview";
import localDb from "../../database/localDb";

import {
  HeaderCustom,
  BookingCard,
  CustomTextInput,
  Calendar,
  Loader,
} from "../../component";
import { useSelector, useDispatch } from "react-redux";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, appConstant, imageConstant } from "../../constant";
import { requestToGetItinaryList } from "../home/Home.action";
import {
  requestToGetBusStop,
  requestToGetAccessTokenBusBooking,
} from "./BusBooking.action";
import { StatusBar } from "react-native";

const BusBookingScreen = (props) => {
  const [arrayBooking, setArrayBooking] = useState([1]); // All bookings data will get in this array
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const [selectedDate, setSelectedDate] = useState(""); // Assign calendar selected date
  const [fromLoc, setFromLoc] = useState("034"); // From location
  const [toLoc, setToLoc] = useState("bwb"); // To location

  const dispatch = useDispatch(); // Calling api
  const responseBusBooking = useSelector((state) => state.BusBookingReducer); // Getting api response
  const responseItinaryList = useSelector((state) => state.HomeReducer); // Getting api response
  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.
  const [busBookingUrl, setBusBookingUrl] = useState(null);
  const [loading, setLoading] = React.useState(true);
  const [headersWeb, setHeadersWeb] = useState({});
  const [responseUser, setResponseUser] = useState({});

  const onClickBookingCard = useCallback((itinaryDetail) => {
    props.navigation.navigate(appConstant.SITE_ITINARY, {
      viewName: appConstant.BUS_BOOKING,
      itinaryDetail: itinaryDetail,
    });
  }, []);

  const handleBackButtonClick = () => {
     console.log(" handleBackButtonClick--------");
     props.navigation.goBack();
    return true;
  };
  // Getting device info from push controller
  const getDeviceInfo = (value) => {
    setDeviceInfo(value);
  };
  const hideSpinner = () => {
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

      (async () => {
        // Getting access token for bus booking then pass it in webview url
        const tempUser = localDb.getUser();
        Promise.resolve(tempUser).then((response) => {
          if (response) {
            let param = {
              user: response,
              navigation: props.navigation,
            };
            console.log(" response ====> ", response);
            setResponseUser(response);
            dispatch(requestToGetAccessTokenBusBooking(param));
          }
        });
      })();
    });
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, []);

  //  calling token api for busbooking
  useEffect(() => {
    const response = responseUser;
    var functionUrl = "";
    if (response) {
      
      console.log(" tempuser bus booking- $$$$$$$$$$$$-", response);

      if (
        response.functionUrl &&
        responseBusBooking.accessTokenBusBooking.token
      ) {
        functionUrl = response.functionUrl;
        functionUrl = functionUrl.replace(
          ":accessKey",
          responseBusBooking.accessTokenBusBooking.token
        );
        functionUrl = functionUrl.replace(":actionKey", "BUSBOOKING");
        
        // console.log(" ++++++ ", responseBusBooking);
        console.log("functionUrl -------> ", JSON.stringify(responseBusBooking.accessTokenBusBooking.token));

        setBusBookingUrl(functionUrl);
        setHeadersWeb({
           Authorization : `Bearer ${response.clientToken}`,
          DeviceId: response.deviceId ? response.deviceId : "",
          DeviceType: Platform.OS === "android" ? "ANDROID" : "IOS",
        });
      }
    }
  }, [responseBusBooking.accessTokenBusBooking.token, responseUser]);

  // "functionUrl": "https://app-aue.trobexisuat.com/TONEAPPUAT/MobileApp/MobileFunctions.aspx?key=:accessKey&action=:actionKey",

  const onClickCalendarDate = async (selectedDay) => {
    let dateString1 = selectedDay.dateString;
    let dateTemp = Date.parse(dateString1);
    let currentDate = format(dateTemp, "EEEE, MMMM dd yyyy");
    await setSelectedDate(currentDate);
  };

  const onClickCalendarIcon = () => {
    if (isCalendarShow) {
      let dictTemp = { travelDate: convertDate(selectedDate) };
      dispatch(requestToGetBusStop(dictTemp));
    }
    setIsCalendarShow(!isCalendarShow);
  };

  const onClickRightIcon = useCallback(() => {
    props.navigation.navigate(appConstant.NOTIFICATIONS);
  }, []);

  const convertDate = (date) => {
    let convertedDate = "";
    let dateTemp = Date.parse(selectedDate);
    convertedDate = format(dateTemp, "yyyy'-'MM'-'dd'T'HH':'mm':'ss");
    console.log(" converted date is ", convertedDate);
    return convertedDate;
  };

  return (
    <>
    <View style={styles.viewBusBckgnd}>
      <WebView
        onLoad={() => hideSpinner()}
             startInLoadingState={false}
        style={styles.webview}
        source={{
          uri: busBookingUrl,
          // headers: headersWeb,
        }}
      ></WebView>
      </View>
      {/* <TextInput 
            value={route && route.params && route.params.loginUrl? route.params.loginUrl: loginUrl}
            style={styles.tokenStyle}
            multiline={true}
          /> */}
      {/* <Pressable
        style={styles.iconHeader}
        onPress={() => props.navigation.goBack()}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode={"contain"}
          source={imageConstant.IMAGE_ARROW_BACK}
        />
      </Pressable> */}

      {loading && (
        <Loader viewName={appConstant.BUS_BOOKING} loading={loading} />
      )}
      <PushController
        getDeviceInfo={getDeviceInfo}
        navigation={props.navigation}
      />
    </>
  );
};

export default BusBookingScreen;
