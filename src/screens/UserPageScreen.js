import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import GoAthletePageButton from '../components/GoAthletePageButton';
import AthListInUser from '../components/AthListInUser';

class UserPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profile: '',
      url: '',
      isAthlete: false,
      athList: [],
      followingNum: 0,
      commentsNum: 0,
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
        const { commentsNum } = doc.data();
        this.setState({
          username,
          profile,
          url,
          isAthlete,
          followingNum,
          commentsNum,
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
    const { commentsNum } = this.state;
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
          commentsNum={commentsNum}
          button={button}
          onPressFollowing={this.handlePressFollow.bind(this)}
          onPressEdit={this.handlePressEdit.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

UserPageScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default UserPageScreen;
