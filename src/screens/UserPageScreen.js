import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

import UserInfo from '../components/UserInfo';
import AthList from '../components/AthList';

class UserPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profile: '',
    };
  }

  UNSAFE_componentWillMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/User`).doc('info');

    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const username = doc.data().username;
          const profile = doc.data().profile;
          this.setState({ username, profile });
        } else {
          console.log('No such document!', user.uid);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  returnInfo(info) {
    this.setState({ info });
  }

  render() {
    const info = { username: this.state.username, profile: this.state.profile };
    return (
      <View style={styles.container}>

        <View style={styles.userInfo}>
          <View style={styles.userFlex}>
            <View style={styles.userName}>
              <View style={styles.userNamePic}>
                <Text style={styles.userNamePicTitle}>Pic</Text>
              </View>
              <Text style={styles.userNameTitle}>{info.username}</Text>
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
          <View style={styles.userProfile}>
            <Text style={styles.userProfileTitle}>{info.profile}</Text>
          </View>
          <View style={styles.userEdit}>
            <TouchableHighlight
              style={styles.userEditButton}
              onPress={() => { this.props.navigation.navigate('UserEdit', { info, returnInfo: this.returnInfo.bind(this) }); }}
            >
              <Text style={styles.userEditTitle}>
                Edit your account Infomation
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.userEdit}>
            <TouchableHighlight
              style={styles.userEditButton}
              onPress={() => { this.props.navigation.navigate('AthPage'); }}
            >
              <Text style={styles.userEditTitle}>
                Go to Athlete Page
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <AthList style={styles.athList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  userInfo: {
    height: '33%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userFlex: {
    height: '67%',
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
  athList: {
    height: '100%',
  },
});

export default UserPageScreen;
