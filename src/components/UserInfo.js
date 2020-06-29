import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

import NeumoAvatar from '../elements/NeumoAvatar';
import NeumoCircleButton from '../elements/NeumoCircleButton';
import NeumoText from '../elements/NeumoText';

function returnInfo(info) {
  this.setState({ info });
}

function UserInfo(props) {
  const { info } = props;
  console.log(info);

  return (
    <View style={styles.userInfo}>
      <View style={styles.userFlex}>
        <View style={styles.userName}>
          <Avatar
            size={84}
            rounded
            title="U"
            source={info.url ? { uri: info.url } : null}
          />
          <Text style={styles.userNameTitle}>
            {info.username}
          </Text>
        </View>

        <View style={styles.userInfoBar}>
          <View style={styles.userInfoTab}>
            <NeumoCircleButton
              text={String(props.followingNum)}
              onPress={props.onPressFollowing}
            />
            <Text style={styles.userInfoTabTitle}>
              Following
            </Text>
          </View>
          <View style={styles.userInfoTab}>
            <View style={styles.userInfoTabItem}>
              <NeumoCircleButton
                text={String(props.commentsNum)}
                onPress={props.onPressCommentList}
              />
            </View>
            <Text style={styles.userInfoTabTitle}>
              Comments
            </Text>
          </View>

          <View style={styles.userInfoTab}>
            <View style={styles.userInfoTabItem}>
              <NeumoCircleButton
                text={String(props.giftsNum)}
              />
            </View>
            <Text style={styles.userInfoTabTitle}>
              Gifts
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.userProfile}>
        <NeumoText
          text={info.profile}
          fontSize={12}
        />
      </View>
      {props.button}
    </View>
  );
}


const styles = StyleSheet.create({
  userInfo: {
    paddingTop: 12,
    height: 240,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userFlex: {
    height: 150,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userProfile: {
    paddingBottom: 6,
    alignItems: 'center',
  },
  userProfileTitle: {
    fontSize: 16,
    color: '#000',
  },
  userName: {
    height: '100%',
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNamePic: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 42,
    height: 104,
    width: 104,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNamePicTitle: {
    height: 84,
    width: 84,
  },
  userNameTitle: {
    paddingTop: 12,
    fontSize: 18,
    fontWeight: '500',
  },
  userInfoBar: {
    width: '67%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f7f7f7',
  },
  userInfoTab: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoTabItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 32,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoTabNum: {
    fontSize: 20,
  },
  userInfoTabTitle: {
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 12,
  },
});

export default UserInfo;
