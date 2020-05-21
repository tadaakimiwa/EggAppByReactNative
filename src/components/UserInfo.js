import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

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
          <View style={styles.userNamePic}>
            <Avatar
              size={84}
              rounded
              title="U"
              source={{ uri: info.url }}
            />
          </View>
          <Text style={styles.userNameTitle}>{info.username}</Text>
        </View>

        <View style={styles.userInfoBar}>
          <View style={styles.userInfoTab}>
            <TouchableHighlight
              style={styles.userInfoTabItem}
              onPress={props.onPressFollowing}
            >
              <View>
                <Text style={styles.userInfoTabNum}>
                  {String(props.followingNum)}
                </Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.userInfoTabTitle}>Following</Text>
          </View>

          <View style={styles.userInfoTab}>
            <View style={styles.userInfoTabItem}>
              <Text style={styles.userInfoTabNum}>12</Text>
            </View>
            <Text style={styles.userInfoTabTitle}>Comments</Text>
          </View>

          <View style={styles.userInfoTab}>
            <View style={styles.userInfoTabItem}>
              <Text style={styles.userInfoTabNum}>16</Text>
            </View>
            <Text style={styles.userInfoTabTitle}>Gifts</Text>
          </View>
        </View>
      </View>
      <View style={styles.userProfile}>
        <Text style={styles.userProfileTitle}>{info.profile}</Text>
      </View>
      <View style={styles.userEdit}>
        <TouchableHighlight
          style={styles.userEditButton}
          onPress={props.onPressEdit}
        >
          <Text style={styles.userEditTitle}>
            Edit your account Infomation
          </Text>
        </TouchableHighlight>
      </View>
      {props.button}
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    height: 240,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userFlex: {
    height: 150,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userProfile: {
    paddingLeft: 36,
    paddingBottom: 6,
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
    height: 84,
    width: 84,
    overflow: 'hidden',
  },
  userNamePicTitle: {
    height: 84,
    width: 84,
  },
  userNameTitle: {
    paddingTop: 12,
    fontSize: 18,
  },
  userInfoBar: {
    width: '67%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
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
    paddingTop: 12,
  },
  userEdit: {
    alignItems: 'center',
    marginBottom: 5,
  },
  userEditButton: {
    borderWidth: 0.5,
    borderColor: '#2DCCD3',
    padding: 3,
  },
  userEditTitle: {
    color: '#2DCCD3',
  },
});

export default UserInfo;
