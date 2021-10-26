import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Button,
  TextInput,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './Login.style';
import {LoginTextView, Loader} from '../../component';
import imageConstant from '../../constant/imageConstant';
import {useSelector, useDispatch} from 'react-redux';
import {connect} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ImageBackground} from 'react-native';
import commonStyle from '../../common/common.style';
import {appColor, appConstant} from '../../constant';
import {requestToGetAccessToken} from './Login.action';
import {isEmailValid, isMobileNumberValid} from '../../helper/validations';
import alertMsgConstant from '../../constant/alertMsgConstant';
import AuthContext from '../../context/AuthContext';
import PushController from '../../component/PushControllerTemp';

const LoginScreen = props => {
  const [isClickEye, setIsClickEye] = useState(false);
  //const newAccesstoken = get; // Getting api response
  const {setUserData} = React.useContext(AuthContext);

  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.
  const [userTemp, setUserTemp] = React.useState({
    email: '',
    password: '',
  });

  const [token, setToken] = React.useState({});

  const [error, setError] = React.useState({
    emailErr: '',
    passwordErr: '',
  });

  const [formErr, setFormError] = React.useState('');

  const [checked, setChecked] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch(); // Calling api

  React.useEffect(() => {
    let isUserAvailable = false;
    const unsubscribe = props.navigation.addListener('focus', () => {
      setError({emailErr: '', passwordErr: ''});
      if (!isUserAvailable) {
        setUserTemp({email: '', password: ''});
      }
      setFormError('');
    });

    return unsubscribe;
  }, [error]);

  function Validate({email, password}) {
    let emailErr = '';
    let passwordErr = '';

    if (email.trim() === '') {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }

    if (password.trim() === '') {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }

    if (emailErr === '' && passwordErr === '') {
      return 'ok';
    } else {
      return {
        emailErr,
        passwordErr,
      };
    }
  }

  const submitForm = () => {
    const validate = Validate(userTemp);

    setError(
      validate !== 'ok'
        ? validate
        : {
            emailErr: '',
            passwordErr: '',
          },
    );

    console.log(' validate is ===', validate);
    // Temporary commit this condition
    if (validate === 'ok') {
      dispatch(requestToGetAccessToken());
    }
  };
  // Getting device info from push controller
  const getDeviceInfo = value => {
    console.log(' device info ----->', value);
    setDeviceInfo(value);
  };

  const checkRememberMe = async () => {
    setChecked(!checked);
  };

  const setLoggedInUserInLocalDB = data => {
    if (checked) {
      if (data) {
        if (setCurrentUser(data)) {
        }
      }
    }
  };
  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const movetToScreen = useCallback(
    token => {
      //  console.log(" token are ===", token);

      if (token && token.token) {
        //setUserData(token)
        props.navigation.navigate(appConstant.DRAWER_NAVIGATOR);
      }
    },
    [props.accessToken],
  );

  return (
    <>
      <View style={stylesHome.container}>
        {movetToScreen(props.accessToken)}
        <ImageBackground
          source={imageConstant.IMAGE_LOGIN_BACKGROUND}
          style={commonStyle.image}
          resizeMode={'cover'}>
          <View style={styles.logoImage}>
            <Image
              source={imageConstant.IMAGE_LOGO}
              resizeMode={'contain'}
              style={commonStyle.image}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>Login</Text>
          </View>
          <ScrollView
            style={styles.scrollViewStyle}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <View style={styles.inputView}>
              <LoginTextView
                keyboardType="email-address"
                placeholder="Enter Email Address"
                value={userTemp.email}
                error={error.emailErr}
                onChangeText={e => setUserTemp({...userTemp, email: e})}
                showEye={false}
              />
              {/* { emailErr ? (
                <Text style={[styles.error, {color:appColor.RED}]}>
                  {emailErr}
                </Text>
              ) : null} */}

              {isClickEye ? (
                <LoginTextView
                  secureTextEntry={false}
                  placeholder="Enter Password"
                  value={userTemp.password}
                  error={error.passwordErr}
                  onChangeText={e => setUserTemp({...userTemp, password: e})}
                  isClickEye={isClickEye}
                  onPressRight={onPressRight}
                  showEye={true}
                />
              ) : (
                <LoginTextView
                  secureTextEntry={true}
                  placeholder="Enter Password"
                  value={userTemp.password}
                  error={error.passwordErr}
                  onChangeText={e => setUserTemp({...userTemp, password: e})}
                  isClickEye={isClickEye}
                  onPressRight={onPressRight}
                  showEye={true}
                />
              )}

              {/* { passwordErr ? (
                <Text style={[styles.error, {color:appColor.RED}]}>
                  {passwordErr}
                </Text>
              ) : null} */}

              <View
                style={{
                  marginBottom: hp('5%'),
                  alignSelf: 'flex-end',
                  paddingRight: wp('10%'),
                  paddingTop: hp('5%'),

                  // justifyContent: 'space-between',
                }}>
                <Pressable
                //onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotPwd}>Forgot Password?</Text>
                </Pressable>
              </View>

              <Pressable style={styles.btnLogin} onPress={() => submitForm()}>
                <Text style={styles.loginBtnText}>Login to Continue</Text>
              </Pressable>
              <Text style={[styles.textHello, {margin: '3%'}]}>
                Device Token
              </Text>
              <TextInput
                value={deviceInfo && deviceInfo.device_token? deviceInfo.device_token: ''}
                style={styles.textDeviceToken}
                multiline={true}
              />
            </View>
          </ScrollView>
        </ImageBackground>
        {props.isRequesting ? <Loader loading={props.isRequesting} /> : null}
      </View>
      <PushController getDeviceInfo={getDeviceInfo} />
    </>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    accessToken: state.LoginReducer.accessToken,
    isRequesting: state.LoginReducer.isRequesting,
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)

export default connect(mapStateToProps, null)(LoginScreen);
