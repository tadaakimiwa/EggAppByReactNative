import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class UserInfo extends React.Component {
  render() {
    return (
      <View style={styles.userInfo}>

        <View style={styles.userName}>
          <View style={styles.userNamePic}>
            <Text style={styles.userNamePicTitle}>Pic</Text>
          </View>
          <Text style={styles.userNameTitle}>User1</Text>
        </View>

        <View style={styles.userInfoBar}>
          <View style={styles.userInfoTab}>
            <View style={styles.userInfoTabItem}>
              <Text style={styles.userInfoTabNum}>8</Text>
            </View>
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
    );
  }
}

const styles = StyleSheet.create({
  userInfo: {
    height: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNamePicTitle: {
    fontSize: 24,
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
});

export default UserInfo;
