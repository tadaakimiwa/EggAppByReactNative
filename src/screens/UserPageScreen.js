import React from 'react';
import {
  StyleSheet,
  Text, View,
  TouchableHighlight,
  Image, SafeAreaView,
} from 'react-native';
import firebase from 'firebase';

import GoAthletePageButton from '../components/GoAthletePageButton';
import AthListInUser from '../components/AthListInUser';

class UserPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profile: '',
      url: '../../assets/placeHolderUser',
      isAthlete: false,
      athList: [],
      followingNum: 0,
    };
  }

  componentDidMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/User`).doc('info');

    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const { username } = doc.data();
        const { profile } = doc.data();
        const url = doc.data().profileImageURL;
        const { isAthlete } = doc.data();
        const { followingNum } = doc.data();
        this.setState({
          username,
          profile,
          url,
          isAthlete,
          followingNum,
        });
      } else {
        console.log('No such document!', user.uid);
      }
    });

    const athListRef = db.collection(`users/${user.uid}/following`);

    athListRef.onSnapshot((snapshot) => {
      const athList = [];
      snapshot.forEach((doc) => {
        athList.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ athList })
    });
  }

  returnInfo(info) {
    this.setState({ info });
  }

  handlePressFollow() {
    this.props.navigation.navigate('FollowingList');
  }

  handlePressAthlete() {
    this.props.navigation.navigate('AthPage');
  }

  handlePressEdit() {
    const info = {
      username: this.state.username,
      profile: this.state.profile,
      url: this.state.url,
    };
    this.props.navigation.navigate('UserEdit', { info, returnInfo: this.returnInfo.bind(this) });
  }

  render() {
    const info = {
      username: this.state.username,
      profile: this.state.profile,
      url: this.state.url,
    };
    const { followingNum } = this.state;
    const { isAthlete } = this.state;
    let button;
    if (isAthlete) {
      button = <GoAthletePageButton onPress={this.handlePressAthlete.bind(this)} />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <AthListInUser
          athList={this.state.athList}
          navigation={this.props.navigation}
          info={info}
          followingNum={followingNum}
          button={button}
          onPressFollowing={this.handlePressFollow.bind(this)}
          onPressEdit={this.handlePressEdit.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
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
  athList: {
    height: '100%',
  },
});

export default UserPageScreen;
