import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import UserPageHeaderText from '../elements/UserPageHeaderText';
import GoAthletePageButton from '../components/GoAthletePageButton';
import UserPageModal from '../components/UserPageModal';
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
      giftsNum: 0,
      isModalVisible: false,
    };
  }

  componentDidMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const { navigation } = this.props;

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
        const { giftsNum } = doc.data();
        this.setState({
          username,
          profile,
          url,
          isAthlete,
          followingNum,
          commentsNum,
          giftsNum,
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

    const { username } = this.state;
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon={(
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color="#000"
            />
          )}
          onPress={this.toggleModal.bind(this)}
          buttonStyle={{
            backgroundColor: '#fff',
          }}
        />
      ),
      title: username,
      headerTintColor: '#000',
      headerTitleStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
    });
  }

  onBackdropPress() {
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
  }

  toggleModal() {
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
  }

  handlePressFollow() {
    this.props.navigation.navigate('FollowingList');
  }

  handlePressAthlete() {
    this.props.navigation.navigate('AthPage');
  }

  returnInfo(info) {
    this.setState({ info });
  }

  videoModalOnPress() {
    this.setState({ isModalVisible: false });
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
    const { giftsNum } = this.state;
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
          giftsNum={giftsNum}
          button={button}
          onPressFollowing={this.handlePressFollow.bind(this)}
        />
        <UserPageModal
          onPress={this.videoModalOnPress.bind(this)}
          onBackdropPress={this.onBackdropPress.bind(this)}
          isModalVisible={this.state.isModalVisible}
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
    backgroundColor: '#f7f7f7',
  },
});

export default UserPageScreen;
