import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalList.style';
import {HeaderCustom, BookingCard} from '../../component';
import {useSelector, useDispatch} from 'react-redux'; 
import {Avatar} from 'react-native-elements';
import {appColor, appConstant, imageConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getDateInFormat} from '../../common';

const ApprovalList = props => {
  const responseData = useSelector(state=> state.HomeReducer);

  const [approvalList, setApprovalList] = useState(responseData.approvalList); // For getting data of approval 

useEffect(() => {

 //console.log(" approval list ==", responseData )
}, [])

  const onClickAccept = () => {};

  const onClickDecline = () => {};

  const renderItem = item => {
    let itemDetail = item.item; 
    let date = itemDetail.requestdate;
    let requestdate = date? getDateInFormat(date, false, false): "";
    
    return (
      <View style={styles.viewOutSide}>
        <View style={styles.viewInside1}>
          <View style={styles.viewInside2}>
            <View>
              <Text style={styles.textTitle}>{itemDetail.requestor}</Text>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_PATH}
                  />
                </View>
                <Text style={styles.textDetail}>{itemDetail.description}</Text>
              </View>
                <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_BUS_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>#{itemDetail.id}</Text>
              </View>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_CALENDAR_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>{requestdate}</Text>
              </View>
            </View>
            <View style={styles.viewButtons}>
              <View style={styles.buttonGreen}>
                <Pressable onPress={() => onClickAccept}>
                <Text style={styles.textButtonTitle}>Accept</Text>
                </Pressable>
              </View>

              <View style={styles.buttonRed}>
                <Pressable onPress={() => onClickDecline}>
                <Text style={styles.textButtonTitle}>Decline</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const moveBack = ()=>{
    props.navigation.goBack(); 
  }

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Approvals'}
          viewName={appConstant.APPROVALS}
          leftIcon={true}
          onClickLeftIcon={()=> moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <View style={styles.viewFlatList}>
          <FlatList
            data={approvalList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default ApprovalList;
