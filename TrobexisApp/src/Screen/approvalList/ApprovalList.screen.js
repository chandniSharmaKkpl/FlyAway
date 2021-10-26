import React, {useState, useCallback} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalList.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {appColor, appConstant, imageConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ApprovalList = props => {
  const [approvalList, setApprovalList] = useState([1, 2, 3]);

  const onClickAccept = () => {};

  const onClickDecline = () => {};

  const renderItem = item => {
    return (
      <View style={styles.viewOutSide}>
        <View style={styles.viewInside1}>
          <View style={styles.viewInside2}>
            <View>
              <Text style={styles.textTitle}>John Lewis</Text>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_BUS_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>WTR £1234</Text>
              </View>

              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_BUS_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>WTR £1234</Text>
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

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Approvals'}
          viewName={appConstant.APPROVALS}
          leftIcon={true}
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
