import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  ImageBackground,
  Pressable,
  TextInput,
  BackHandler,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';
// import {is24HourFormat} from 'react-native-device-time-format';
import moment from 'moment';
// import {SafeAreaView} from 'react-navigation/native';

import stylesHome from '../home/Home.style';
import commonStyle from '../../common/common.style';
import styles from './ClientCode.style';
import {LoginTextView, Loader, AlertView} from '../../component';
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
  actionConstant,
} from '../../constant';

import localDB from '../../database/localDb';
import {checkStringContainsSpecialChar} from '../../common';
import firebase from '@react-native-firebase/app';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from '../../responsiveScreen';
import {useDispatch, useSelector} from 'react-redux';
import {requestToGetApiBase, setLoader} from './ClientCode.action';
import {Platform} from 'react-native';
import PushController from '../../component/PushControllerTemp';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  checkBioMetricAvailable,
  authenticateUsingBioMetric,
} from '../../component/BioMetricAuth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';

// import moment from 'moment';

const ClientCodeScreen = props => {
  const [orientation, setOrientation] = React.useState('portrait');
  const navigation = useNavigation();
  const {setUserData} = React.useContext(AuthContext);
  const [clientCode, setClientCode] = useState(''); //TONEAPPUAT
  const [arrayClientCode, setArrayClientCode] = useState([]); // All saved client codes are stored in this array so show on the list when user start type to client code
  const [isClientCodeListShow, setIsClientCodeListShow] = useState(false); // Android back handling show alert

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const responseData = useSelector(state => state.ClientCodeReducer); // For api response of account url, access token
  const errorData = useSelector(state => state.GlobalReducer); // For error handling global reducer return false

  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.
  const [isAlertShow, setIsAlertShow] = useState(false); // Android back handling show alert
  const [notificationStatus, setnotificationStatus] = useState();
  //const [countBack, setCountBack] = React.useState(0)
  var countBack = 0;

  // console.log("isAlertShow =====>", isAlertShow);

  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  useEffect(() => {
    // console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  useEffect(() => {
    async () => {
      const authStatus = await messaging().requestPermission();
      setnotificationStatus(authStatus);
      console.log(' auth status in client code  ----------->', authStatus);
    };
  }, [notificationStatus]);

  //   const getCurrentHourFormat = async () => {
  //     const is24Hour = await is24HourFormat()
  //     var locale = window.navigator.userLanguage || window.navigator.language;
  // let offset = moment().zone()
  // let promise = moment(offset);

  // Promise.resolve(promise).then((res)=>{
  //   console.log(" Date  ", Date(), "is24Hour", is24Hour);

  // })
  //     //return moment(date).format(is24Hour ? 'HH:mm' : 'h:mm A')
  //   }

  useFocusEffect(
    React.useCallback(() => {
      //** Whenever user will comeback to this view we will fetch all client codes and show them in the list  */

      getClientCodes();
    }, []),
  );

  const handleBackAction = () => {
    Alert.alert('Exit app', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDB.getUser();
      Promise.resolve(tempUser).then(response => {
        if (response) {
          if (response.userId && response.clientToken) {
            checkBioMetricAvailable(props, response);
          }
        } else {
        }
      });
    });

    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      // BackHandler.removeEventListener(
      //   'hardwareBackPress',
      //   handleBackButtonClick,
      // );
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackAction);
  }, []);

  //** Getting client codes from the async storage  */
  const getClientCodes = () => {
    const temp = localDB.getClientCode();
    Promise.resolve(temp).then(response => {
      if (response) {
        setArrayClientCode(response);
        setClientCode(response[response.length - 1]);
      } else {
      }
    });
  };

  //** Save new client code in the array and async storage */
  const saveClientCodeLocally = () => {
    if (arrayClientCode.indexOf(clientCode) < 0) {
      let arrayTemp = arrayClientCode;
      arrayTemp.push(clientCode);
      localDB.saveClientCode(arrayTemp);
    }
  };

  //**Getting device info from push controller */
  const getDeviceInfo = value => {
    setDeviceInfo(value);
  };

  //**Getting notifcation status from push controller */

  const getNotificationStatus = value => {
    setnotificationStatus(value);
  };

  const handleBackButtonClick = () => {
    // countBack = countBack + 1;
    // if (countBack > 1)
    {
      setIsAlertShow(true);
    }
    return true;
  };

  const submitForm = async () => {
    // checking notification permissions is not allow then return user back
    console.log(" notification status submit in client code  ----------->",notificationStatus);

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      
      setIsClientCodeListShow(false);

      if (clientCode === '') {
        setError(alertMsgConstant.CLIENT_CODE_NOT_EMPTY);
     
      } else {
       
        //** Special character and space not allowed  */
        if (checkStringContainsSpecialChar(clientCode)) {
          setError(alertMsgConstant.SPECIAL_CHAR_NOT_ALLOW);
          return;
        }

        //** Remove all spaces from the client code */
        let trimClientCode = clientCode.replace(/ /g, '');


        const messaging1 = firebase.messaging();
        messaging1.getToken().then(deviceToken => {
          if (deviceToken) {
            // Call api here
            let param = {
              client: trimClientCode,
              DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
              DeviceId: deviceToken,
              navigation: navigation,
            };
            dispatch(setLoader(true));


            dispatch(requestToGetApiBase(param));
          }
        });
      }
    } else {
      
      toast.show(alertMsgConstant.PLEASE_TURN_ON_YOUR_NOTIFCATION, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      return;
    }
  };

  const renderClientCode = item => {
    return (
      <Pressable
        style={styles.clientCodeRow}
        onPress={() => {
          setClientCode(item.item), setIsClientCodeListShow(false); // Close list when click on any
        }}>
        <Text>{item.item}</Text>
      </Pressable>
    );
  };

  const onClickOutside = () => {
    Keyboard.dismiss();
    setIsClientCodeListShow(false);
  };
  return (
    <>
      {/* {checkResponseCode()} */}
      <ImageBackground
        source={imageConstant.IMAGE_LOGIN_BACKGROUND}
        style={commonStyle.image}
        resizeMode={'cover'}>
        <KeyboardAwareScrollView>
          <View style={styles.logoImage}>
            <Image
              source={imageConstant.IMAGE_LOGO}
              resizeMode={'contain'}
              style={commonStyle.image}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>Client Code</Text>
            <Text style={[styles.appVersion, {textAlign: 'center'}]}>
              App Version 6.0 (1.0)
            </Text>
          </View>

          <View style={styles.inputView}>
            <LoginTextView
              onFocus={() => setIsClientCodeListShow(true)}
              placeholder="Enter Client Code"
              value={clientCode}
              error={error}
              onChangeText={value => {
                //** for showing dropdown of prefilled client code  */
                if (clientCode && clientCode.length > 0) {
                  setIsClientCodeListShow(false);
                } else {
                  //setIsClientCodeListShow(true);
                }
                setClientCode(value);
                if (value.trim().length > 0) {
                  setError('');
                }
              }}
            />

            <Pressable
              style={[commonStyle.yellowButton, styles.btnSubmit]}
              onPress={() => submitForm()}>
              <Text style={[commonStyle.yellowButtonTitle]}>Submit</Text>
            </Pressable>

            {isClientCodeListShow &&
            arrayClientCode &&
            arrayClientCode.length > 0 ? (
              <View style={styles.viewFlatList}>
                <>
                  <FlatList
                    horizontal={false}
                    style={styles.flatList}
                    data={arrayClientCode}
                    renderItem={renderClientCode}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                  />
                </>
              </View>
            ) : null}

            {/* {localDB.getUser()? <Pressable style={styles.btnLogin} onPress={() => checkBioMetricAvailable()}>
                <Text style={styles.loginBtnText}>Login with TouchID/FaceID</Text>
              </Pressable> :null} */}
          </View>
          {/* <TextInput 
              value={deviceInfo.device_token? deviceInfo.device_token: ''}
              style={styles.tokenStyle}
              multiline={true}
            /> */}
        </KeyboardAwareScrollView>
      </ImageBackground>

      {responseData.isRequesting ? (
        <Loader loading={responseData.isRequesting} />
      ) : null}

      {isAlertShow ? (
        // console.log("AlertView  ===>  res", isAlertShow)
        // alert()
        <AlertView
          title={alertMsgConstant.PLEASE_CONFIRM}
          subtitle={alertMsgConstant.EXIT_CONFIRM}
          confirmBtnTxt={alertMsgConstant.YES}
          cancelBtnTxt={alertMsgConstant.NO}
          buttonCount={2}
          bigBtnText={''}
          onPressConfirmBtn={() => {
            setIsAlertShow(false);
            alert('exit');
            BackHandler.exitApp();
          }}
          onPressCancel={() => {
            setIsAlertShow(false);
            countBack = 0;
          }}
          onPressBigBtn={() => {}}
        />
      ) : null}
      <PushController
        getDeviceInfo={getDeviceInfo}
        navigation={navigation}
        getNotificationStatus={getNotificationStatus}
      />
    </>
  );
};

export default ClientCodeScreen;
