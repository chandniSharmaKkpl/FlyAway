import React from 'react';
import { View, TextInput, Image, Text, Pressable, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { appConstant, imageConstant, appColor, fontConstant } from '../constant';

const HeaderCustom = (props) => {
  const { title, leftIcon, rightIcon, viewName, centerTitle, onClickRightIcon, rightIconImage, onClickLeftIcon } = props

  return (
    <View style={Platform.OS === 'android'? styles.topHeaderStyleAndroid: styles.topHeaderStyleIos}>

      <Pressable style={styles.iconHeader} onPress={onClickLeftIcon}>
        {leftIcon && viewName === appConstant.PICK_A_BUS ||  leftIcon && viewName === appConstant.BOOKING_SUMMARY || leftIcon && viewName === appConstant.ADD_LUGGAGE?
         <Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={imageConstant.IMAGE_ARROW_BACK} />
        : <Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={imageConstant.IMAGE_MENU} />
          }
      </Pressable>

      <Text style={styles.textTitle}>{title}</Text>

     {rightIcon? <Pressable style={rightIconImage? styles.styleArrow: styles.styleBell}
        onPress={onClickRightIcon}
      >
        <Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'}
          source={rightIconImage ? rightIconImage : imageConstant.IMAGE_GROUP_418} />
      </Pressable>: <View style={styles.styleArrow} /> }
    </View>

  );
}

export default HeaderCustom;

const styles = {
  topHeaderStyleIos:{
    flexDirection: 'row', 
    justifyContent: 'space-between', height: hp('10%'),
    backgroundColor: appColor.NAVY_BLUE
  },
  topHeaderStyleAndroid:{
    flexDirection: 'row', 
    justifyContent: 'space-between', height: hp('7%'),
    backgroundColor: appColor.NAVY_BLUE,
  },
  iconHeader:{
    
      height: hp('2.5%'), 
      width: wp('8%'),
      marginTop:Platform.OS === 'android'? hp('2%'): hp('6%'),
      marginLeft: wp('4%')
    
  },
  
  styleBell:{
    height: hp('3%'), width: wp('8%'),
    marginTop:Platform.OS === 'android'? hp('2%'): hp('6%'),
    marginRight: wp('4%')
  },
  styleArrow:{
    height: hp('3%'), width: wp('6%'),
    marginTop:Platform.OS === 'android'? hp('2%'): hp('6%'),
    marginRight: wp('4%')
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.WHITE,
    flexWrap: 'wrap',
    alignSelf: 'center',

    marginTop:Platform.OS==='android'? hp('-1%'): hp('4%'),
  },
}