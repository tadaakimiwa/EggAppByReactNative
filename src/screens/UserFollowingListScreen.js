import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import FollowingList from '../components/FollowingList';

export default function UserFollowingListScreen({ navigation }) {
  const [followList, setFollowList] = useState([]);


  useEffect(() => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const followListRef = db.collection(`users/${user.uid}/following`);
    function subscribeFollow() {
      followListRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setFollowList(list);
      });
    }
    subscribeFollow();
  }, []);

  return (
    <View style={styles.container}>
      <FollowingList followList={followList} navigation={navigation} />
    </View>
  );
}

UserFollowingListScreen.propTypes = {
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
