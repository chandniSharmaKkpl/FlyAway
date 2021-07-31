import React from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import appColor from '../constant/colorConstant';
import imageConstant from '../constant/imageConstant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fontConstant from '../constant/fontConstant';

 const HeaderCustom =(props)=>{
 
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('10%'), 
    backgroundColor:appColor.NAVY_BLUE }}>

      <View style={{ 
        height: hp('2.5%'), width: wp('8%'), 
         marginTop:hp('6%'), 
      marginLeft:wp('4%') }}>
        <Image style={{ width: '100%', height: '100%' }}resizeMode={'contain'}  source={imageConstant.IMAGE_MENU} />
      </View>

      <Text style={styles.textTitle}>{props.title}</Text>

      <View style={{ 
        height: hp('3%'), width: wp('8%'), 
       marginTop:hp('6%'), 
      marginRight:wp('4%')  }}>
        <Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={imageConstant.IMAGE_GROUP_418} />
      </View>
    </View>

  );
}

export default HeaderCustom;

const styles = {
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.WHITE,
    flexWrap: 'wrap',
    alignSelf:'center',
   
    marginTop:hp('4%'), 
},
}