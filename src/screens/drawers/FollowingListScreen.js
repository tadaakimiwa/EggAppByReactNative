import React from 'react';
import {
  StyleSheet,
  Text, View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          automaticallyAdjustContentInsets={false}
        >
          <FollowingList followList={this.state.followList} navigation={this.props.navigation} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#DDD',
    backgroundColor: '#eee',
  },
});

export default FollowingListScreen;
