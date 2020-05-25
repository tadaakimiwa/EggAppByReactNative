import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Button,
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

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(props.post);


  return (
    <View style={styles.container}>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        backdropColor="#fff"
        backdropOpacity={1.0}
      >
        <TouchableHighlight
          onPress={handleDelete}
        >
          <View>
            <Text style={{ fontSize: 30 }}>Delete</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={props.onPress}
        >
          <View>
            <Text style={{ fontSize: 30 }}>Edit your Post</Text>
          </View>
        </TouchableHighlight>

        <Button title="Hide modal" onPress={toggleModal} />
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
