import React from 'react'
import { Text, View, Image, TextInput, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { appColor } from '../constant';
import IconEntypo from 'react-native-vector-icons/Entypo'; 

// import {TextField}from '@material-ui/core'
const LoginTextView = (props) => {
    const {
        placeholder,
        textChange,
        secureTextEntry,
        keyboardType,
        maxLength,
        placeHolderColor,
        onSubmitEditing,
        icon,
        left,
        costomStyle,
        right,
        onPressRight,
        isClickEye,
        error
    } = props

    return (
        <View>
        <View style={[styles.container,costomStyle]}>
{console.log(" error is ", props)}
            <TextInput
                {...props}
                style={styles.textInputStyle}
                ref={props.onRef ? (input) => props.onRef(input) : null}
                // underlineColor={underlineColor}
                onChangeText={textChange}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                // placeholderTextColor={placeHolderColor?placeHolderColor:'white'}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                // editable={editable}
                //  autoCapitalize={false}
                // underlineColorAndroid={'rgba(0,0,0,0)'}

                maxLength={maxLength}
            />
               {right?
					 <View style={styles.viewEye}>

				   {isClickEye?  
              <IconEntypo name="eye"
			  onPress={onPressRight} 
               style={styles.eye}
                /> 
                  : 
                <IconEntypo name="eye-with-line" 
				onPress={onPressRight} 
				style={styles.eye} 
                />
				 }
             </View>: null
                }
        </View>
        {error && error!= "" ?<Text style={{ color: appColor.RED, alignSelf:'center' }}>{error}</Text>: null}

   </View>
    )

}
const styles = StyleSheet.create({
    viewEye:{
		justifyContent:'center',
     //   backgroundColor:'pink',
     flex:0.1
	  },
	  eye:{
	   fontSize:20, 
	   //padding:5,
	   color:appColor.GRAY
	   //alignSelf:'flex-end'
	  },
    container:{
        height: hp('7%'), 
        alignSelf: 'center', 
        width: '85%', 
        borderColor: appColor.BORDER, 
        borderWidth: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: appColor.WHITE, //'rgba(211,211,211,0.3)', 
        borderRadius: 10 ,
     marginBottom:hp('2%') 
    },
   
    iconStyle:{
        height: hp('2%'), 
        width: wp('2%')
    },
    textInputStyle:{
       //backgroundColor: 'blue',//'transparent', 
       // height: 50, 
       // maxHeight: 80,
        //width:wp('85%'), 
        flex:0.9,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:wp('3%')
        // fontFamily:AppConstant.constant.MuseoSlab
        
      }
});
export default LoginTextView