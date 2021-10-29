import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  BackHandler,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalDetail.style';
import {HeaderCustom, BookingCard} from '../../component';
import stylesCommon from '../../common/common.style';

import {appColor, appConstant, imageConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ApprovalDetail = props => {
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const returnRowView = (title, subTitle) => {
    return (
      <View style={styles.viewRow}>
        <Text style={styles.textBlue}>{title}</Text>
        <Text style={styles.textSubTitle}>{subTitle}</Text>
      </View>
    );
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const onClickApprove = () => {
    moveBack();
  };
  const onClickDecline = () => {
    props.navigation.navigate(appConstant.REASON);
  };

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Approval Detail'}
          viewName={appConstant.APPROVAL_DETAIL}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <ScrollView>
          <View style={styles.viewOutSide}>
            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>
                Site Access Request (SAR #1563)
              </Text>
              <View style={styles.viewInside}>
                <View style={styles.viewInsideTitle}>
                  <Text style={styles.textYellow}>John Lewis (BM123)</Text>
                  <Text style={styles.textRed}>Pending Approval</Text>
                </View>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Creation Date:', '19-10-2021')}
                  {returnRowView('Company Name:', 'Trobexis Pty Ltd')}
                  {returnRowView('Sub Contractor:', 'N/A')}
                  {returnRowView('Position:', 'Rigger Leading Head')}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Site Access Detail</Text>
              <View style={styles.viewInside}>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Title:', 'Master Rotation')}
                  {returnRowView('Site Location:', 'Barrow Island')}
                  {returnRowView('Access Dates:', '20-11-2021 to 25-12-2021')}
                  {returnRowView('Roaster Pattern:', '3 Weeks On - 3 Weeks Off')}
                  {returnRowView('Travel Requirements:', 'Adelaide > Perth > Barrow Island (Camp) + Return (76)')}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Comments / Messages</Text>
              <View style={styles.viewInside}>
                {/* <View style={styles.textAreaContainer}> */}
                <Text style={styles.textArea}>Site Shut down</Text>
              </View>
              {/* </View> */}
            </View>

            <View style={styles.viewButtonBottom}>
              <Pressable
                style={stylesCommon.greenButton}
                onPress={() => onClickApprove()}>
                <Text
                  style={[
                    styles.buttonSearchBusTitle,
                    stylesCommon.yellowButtonTitle,
                  ]}>
                  Approve
                </Text>
              </Pressable>

              <Pressable
                style={stylesCommon.redButton}
                onPress={() => onClickDecline()}>
                <Text
                  style={[
                    styles.buttonSearchBusTitle,
                    stylesCommon.yellowButtonTitle,
                  ]}>
                  Decline
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ApprovalDetail;
