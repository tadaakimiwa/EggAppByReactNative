import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import FollowingList from '../../components/FollowingList';

class FollowingListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followList: [],
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const followListRef = db.collection(`users/${user.uid}/following`);
    followListRef.onSnapshot((snapshot) => {
      const followList = [];
      snapshot.forEach((doc) => {
        followList.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ followList });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FollowingList followList={this.state.followList} navigation={this.props.navigation} />
      </View>
    );
  }
}

FollowingListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default FollowingListScreen;
