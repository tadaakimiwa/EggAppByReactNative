import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';

export default function PostVideoModal(props) {
  const { post } = props;
  console.log('uid:', post.uid, 'postid:', post.postid);
  const handleDelete = () => {
    const db = firebase.firestore();
    const videoFile = `users/${post.uid}/posts/${post.postid}`;
    const thumbnailFile = `users/${post.uid}/posts/${post.postid}/thumbnail`;
    const postVideoRef = firebase.storage().ref().child(`videos/, ${videoFile}`);
    const postThumbnailRef = firebase.storage().ref().child(`images/, ${thumbnailFile}`);
    const postRef = db.collection(`users/${post.uid}/posts`).doc(`${post.postid}`);
    const batch = db.batch();
    batch.delete(postRef);
    batch.commit()
      .then(() => {
        props.navigation.navigate('AthPageScreen');
      });
  };

  const user = firebase.auth().currentUser;
  let modal;
  if (post.uploader === user.uid) {
    modal = (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={props.onBackdropPress}
      >
        <View style={styles.postModalContent}>
          <TouchableHighlight
            onPress={handleDelete}
          >
            <View style={styles.postItemTop}>
              <Text style={styles.postItemTitle}>Delete</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={props.onPress}
          >
            <View style={styles.postItem}>
              <Text style={styles.postItemTitle}>Edit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  } else {
    modal = (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={props.onBackdropPress}
      >
        <View style={styles.postModalContent}>
          <TouchableHighlight>
            <View style={styles.postItemTop}>
              <Text style={styles.postItemTitle}>report</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.postItem}>
              <Text style={styles.postItemTitle}>report</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }

  console.log(props.post);

  return (
    <View style={styles.postModal}>
      {modal}
    </View>
  );
}


const styles = StyleSheet.create({
  postModal: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  postModalContent: {
    height: 160,
    width: 320,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 24,
  },
  postItemTop: {
    height: 80,
    width: 320,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postItem: {
    height: 80,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postItemTitle: {
    fontSize: 24,
    fontWeight: '300',
  },
});
