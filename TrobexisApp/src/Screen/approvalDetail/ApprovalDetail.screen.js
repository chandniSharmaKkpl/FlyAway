import React, {useState, useCallback} from 'react';
import {View, Text, Image, FlatList, ScrollView,TextInput} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalDetail.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';

import {appColor, appConstant, imageConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ApprovalDetail = props => {
  const returnRowView = (title, subTitle) => {
    return (
      <View style={styles.viewRow}>
        <Text style={styles.textBlue}>{title}</Text>
        <Text style={styles.textBlack}>{subTitle}</Text>
      </View>
    );
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
                  <Text style={styles.textYellow}>John</Text>
                  <Text style={styles.textRed}>Pending Approval</Text>
                </View>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Creation Date:', '')}
                  {returnRowView('Company Name:', '')}
                  {returnRowView('Sub Contractor:', '')}
                  {returnRowView('Position:', '')}

                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>
              Site Access Detail
              </Text>
              <View style={styles.viewInside}>
               
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Title:', '')}
                  {returnRowView('Site Location:', '')}
                  {returnRowView('Access Dates:', '')}
                  {returnRowView('Roaster Pattern:', '')}
                  {returnRowView('Travel Requirements:', '')}

                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>
Comments / Messages
              </Text>
              <View style={styles.viewInside}>
               
              {/* <View style={styles.textAreaContainer}> */}
                  <Text style={styles.textArea}>
Site Shut down
                  </Text>
            {/* <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Add additional comment"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={comments}
              onChangeText={(value)=>{
                if (value.length<=appConstant.COMMENT_MAX_LIMIT) {
                  setComments(value);
                 setTextLimit(value.length)
                }
                
              }}
            >
              </TextInput> */}

          </View>
              {/* </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ApprovalDetail;
