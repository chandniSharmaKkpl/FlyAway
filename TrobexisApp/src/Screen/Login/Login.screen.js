import React, {useState, useCallback} from 'react';
import {View, Text, Image, FlatList,ScrollView, Pressable, Button} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './Login.style';
import {HeaderCustom, BookingCard, LoginTextView} from '../../component';
import {Avatar} from 'react-native-elements';
import imageConstant from '../../constant/imageConstant';
import {useSelector, useDispatch} from 'react-redux';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {ImageBackground} from 'react-native';
import commonStyle from '../../common/common.style';
import { appColor } from '../../constant';
import { requestToGetAccessToken} from './Login.action';
import { isEmailValid, isMobileNumberValid } from "../../helper/validations";
import alertMsgConstant from '../../constant/alertMsgConstant';

const LoginScreen = props => {
  const [isClickEye, setIsClickEye] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.

  const [userTemp, setUserTemp] = React.useState({
    // email: __DEV__?"hardik98@mailinator.com":'',
    // password: __DEV__?"Hardik@123":''

    email: '',
    password: '',
    // // email: "ch_win78@mailinator.com",
    // password: "Test@1234",
    //  email: "ch_win66@mailinator.com",
    //  password: "Test@1234",

    // email: "hardik98@mailinator.com",
    // password: "Hardik@123",
    // email: "",
    // password: "",
  });

  const [error, setError] = React.useState({
    emailErr: '',
    passwordErr: '',
  });

  const [formErr, setFormError] = React.useState('');

  const [checked, setChecked] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch(); // Calling api

  //   React.useEffect(() => {

  //     let isUserAvailable = false;
  //     // Check if user is available in local db then redirect him to the drawer view
  //     const userPromise = getCurrentUser();
  //     if (userPromise) {
  //       Promise.resolve(userPromise).then((currentUser) => {
  //         if (currentUser) {
  //           isUserAvailable = true;
  //           setUserData(currentUser);
  //           navigation.navigate("DrawerStack");
  //         }
  //       });
  //     }
  //      // Whenever coming on this view need to clean complete data of this view.
  //      const unsubscribe = props.navigation.addListener("focus", () => {
  //       setError({ emailErr: "", passwordErr: "" });
  //       if (!isUserAvailable) {
  //         setUserTemp({ email: "", password: "" });
  //       }
  //       setFormError("");
  //     });

  //     return unsubscribe;
  //   }, []);

  function Validate({ email, password }) {
    let emailErr = "";
    let passwordErr = "";
  
    if (email.trim() === "") {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }
  
    if (password.trim() === "") {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }
  
    if (emailErr === "" && passwordErr === "") {
      return "ok";
    } else {
      return {
        emailErr,
        passwordErr,
      };
    }
  }
  const submitForm = () => {
    
    const validate = Validate(userTemp);
    console.log(" user temp -----", validate); 

    setError(
      validate !== 'ok'
        ? validate
        : {
            emailErr: '',
            passwordErr: '',
          },
    );

    if (validate === 'ok') {
      dispatch(requestToGetAccessToken());
    }
  };
  // Getting device info from push controller
  const getDeviceInfo = value => {
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
    console.log(' onr pes right ');
    setIsClickEye(!isClickEye);
  };

  return (
    <>
      <View style={stylesHome.container}>
         <ImageBackground
          source={imageConstant.IMAGE_LOGIN_BACKGROUND}
          style={commonStyle.image}
          resizeMode={'cover'}>
              <View style={styles.logoImage}>
                  <Image source={imageConstant.IMAGE_LOGO} resizeMode={'contain'} 
                  style={commonStyle.image}/>
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
                  right={true}
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
                  right={true}
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
                  alignSelf:'flex-end',
                  paddingRight:wp('10%'),
                  paddingTop:hp('5%')

                 // justifyContent: 'space-between',
                }}>
            
                 <Pressable
                  //onPress={() => navigation.navigate('ForgotPassword')}
                  >
                  <Text style={styles.forgotPwd}>Forgot Password?</Text>
                </Pressable>
              </View>

               <Pressable style={styles.btnLogin}
                  onPress={submitForm}>
                  <Text style={styles.loginBtnText}>Login to Continue</Text>
                </Pressable>
            
             
            </View>
         
          </ScrollView>
        </ImageBackground>
    
      </View>
    </>
  );
};

export default LoginScreen;
