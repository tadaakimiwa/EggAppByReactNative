import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';

import UserCommentList from '../components/UserCommentList';

export default function UserCommentListScreen(props) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const commentRef = db.collection(`users/${user.uid}/comments`);

    function subscribeComments() {
      commentRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setCommentList(list);
      });
    }
    subscribeComments();
  }, []);
  return (
    <View style={styles.container}>
      <UserCommentList
        commentList={commentList}
        navigation={props.navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
});
