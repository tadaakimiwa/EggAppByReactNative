import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';

export default function PostCommentInput(props) {
  const [comment, setComment] = useState('');
  const { uploader } = props;
  const { postid } = props;
  console.log('uploader:', uploader, 'postid:', postid);

  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [profileurl, setProfileurl] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getUsernameAndProfile = async (db, user) => {
    await db.collection(`users/${user.uid}/User`).doc('info').get().then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
        setUsername(doc.data().username);
        setProfileurl(doc.data().profileImageURL);
      } else {
        console.log('No such document!', user.uid);
      }
    });
  };

  const handleComment = async () => {
    const user = await firebase.auth().currentUser;
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    const userRef = db.collection(`users/${user.uid}/User`).doc('info');
    const commentRef = db.collection(`users/${uploader}/posts/${postid}/comments`).doc(`${user.uid}`);
    const userCommentRef = db.collection(`users/${user.uid}/comments/`).doc(`${postid}`);
    await getUsernameAndProfile(db, user);
    const batch = db.batch();
    batch.set(commentRef, {
      commenter: user.uid,
      commentContents: comment,
      createdOn: newDate,
      updatedOn: newDate,
      postid,
      uploader,
      username,
      profileImageURL: profileurl,
    });
    batch.set(userCommentRef, {
      commenter: user.uid,
      commentContents: comment,
      createdOn: newDate,
      updatedOn: newDate,
      postid,
      uploader,
    });
    batch.update(userRef, {
      commentsNum: firebase.firestore.FieldValue.increment(1),
    });
    batch.commit()
      .then(() => {
        setModalVisible(false);
      });
  };

  return (
    <View style={styles.commentInput}>
      <Button title="Comment" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        backdropColor="#ddd"
        backdropOpacity={0.5}
        style={styles.commentModal}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard
      >
        <View style={styles.onKeyboard}>
          <View style={styles.inBorder}>
            <TextInput
              style={styles.input}
              placeholder="Comment..."
              value={comment}
              onChangeText={(text) => { setComment(text); }}
              multiline
            />
            <View style={styles.submitButton}>
              <TouchableHighlight
                onPress={handleComment}
              >
                <Text style={styles.submitButtonTitle}>
                  Post
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  commnetInput: {
    width: '100%',
    flex: 1,
  },
  commentModal: {
    margin: 0,
  },
  onKeyboard: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
  },
  inBorder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 32,
  },
  input: {
    paddingTop: 12,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    position: 'absolute',
    right: 12,
    padding: 10,
  },
  submitButtonTitle: {
    fontSize: 18,
    color: 'blue',
  },
});
