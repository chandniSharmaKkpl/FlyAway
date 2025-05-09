import React from 'react';
import {Text, View, Image, TextInput, StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, fontConstant} from '../constant';
import IconEntypo from 'react-native-vector-icons/Entypo';

// import {TextField}from '@material-ui/core'
const LoginTextView = props => {
  const {
    placeholder,
    textChange,
    onChangeText,
    secureTextEntry,
    keyboardType,
    maxLength,
    placeHolderColor,
    onSubmitEditing,
    icon,
    left,
    costomStyle,
    showEye,
    onPressRight,
    isClickEye,
    error,
    onFocus,
  } = props;

  return (
    <View>
      <View style={[styles.container, costomStyle]}>
        <TextInput
          {...props}
          style={styles.textInputStyle}
          ref={props.onRef ? input => props.onRef(input) : null}
          // underlineColor={underlineColor}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor={ Platform.OS === 'android' ?  placeHolderColor?placeHolderColor:'lightgray' : null}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          // editable={editable}
          //  autoCapitalize={false}
          // underlineColorAndroid={'rgba(0,0,0,0)'}

          maxLength={maxLength}
        />
        {showEye ? (
          <View style={styles.viewEye}>
            {isClickEye ? (
              <IconEntypo
                name="eye"
                onPress={onPressRight}
                style={styles.eye}
              />
            ) : (
              <IconEntypo
                name="eye-with-line"
                onPress={onPressRight}
                style={styles.eye}
              />
            )}
          </View>
        ) : null}
      </View>
      {error && error != '' ? (
        <Text style={styles.errorTxt}>{error}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  errorTxt: {
    color: appColor.RED,
    alignSelf: 'center',
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    paddingBottom: hp('1%'),
  },
  viewEye: {
    justifyContent: 'center',
    //   backgroundColor:'pink',
    flex: 0.1,
  },
  eye: {
    fontSize: 20,
    //padding:5,
    color: appColor.GRAY,
    //alignSelf:'flex-end'
  },
  container: {
    height: hp('6.3%'),
    alignSelf: 'center',
    width: '85%',
    borderColor: appColor.BORDER,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColor.WHITE, //'rgba(211,211,211,0.3)',
    borderRadius: 10,
    marginBottom: hp('2%'),
  },

  iconStyle: {
    height: hp('2%'),
    width: wp('2%'),
  },
  textInputStyle: {
    //backgroundColor: 'blue',//'transparent',
    // height: 50,
    // maxHeight: 80,
    //width:wp('85%'),
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp('3%'),

    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    color: appColor.GRAY,
  },
});
export default LoginTextView;
