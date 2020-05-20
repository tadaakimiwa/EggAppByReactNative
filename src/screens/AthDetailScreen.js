import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import firebase from 'firebase';

import AthIntroCommentList from '../components/AthIntroCommentList';
import FollowingButton from '../components/FollowingButton';
import UnFollowingButton from '../components/UnFollowingButton';
import AthPostList from '../components/AthPostList';

class AthDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      firstname: '',
      lastname: '',
      age: '',
      intro1: '',
      intro2: '',
      intro3: '',
      athuid: '',
      followeeuid: '',
      isFollowing: false,
    };
  }

  componentDidMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const uid = this.props.route.params.uploader
    const db = firebase.firestore();
    const docRef = db.collection(`users/${uid}/User`).doc('athlete');

    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const url = doc.data().profileImageURL;
        const { athuid } = doc.data();
        const { firstname } = doc.data();
        const { lastname } = doc.data();
        const { age } = doc.data();
        const { intro1 } = doc.data();
        const { intro2 } = doc.data();
        const { intro3 } = doc.data();
        this.setState({
          followeeuid: uid,
          athuid,
          url,
          firstname,
          lastname,
          age,
          intro1,
          intro2,
          intro3,
        });
        console.log(this.state.athuid);
      } else {
        console.log('No such document!', uid);
      }
    });
  }

  async handleFollow() {
    const { athuid } = await this.state;
    const { followeeuid } = await this.state;
    const { uid } = await firebase.auth().currentUser;
    const db = firebase.firestore();
    const followerRef = db.collection(`users/${uid}/following`).doc(followeeuid);
    const followeeRef = db.collection(`users/${followeeuid}/follower`).doc(uid);
    const newDate = firebase.firestore.Timestamp.now();
    const batch = db.batch();
    await batch.set(followerRef, {
      createdOn: newDate,
      updatedAt: newDate,
      uid: followeeuid,
      athuid,
      profileImageURL: this.state.url,
      isFollowing: true,
    });
    await batch.set(followeeRef, {
      uid,
      createdOn: newDate,
      updatedAt: newDate,
    });
    batch.commit()
      .then(() => {
        this.setState({ isFollowing: true });
      });
  }

  async handleUnFollow() {
    const { followeeuid } = await this.state;
    const { uid } = await firebase.auth().currentUser;
    const db = firebase.firestore();
    const followerRef = db.collection(`users/${uid}/following`).doc(followeeuid);
    const followeeRef = db.collection(`users/${followeeuid}/follower`).doc(uid);
    const batch = db.batch();
    await batch.delete(followerRef);
    await batch.delete(followeeRef);
    batch.commit()
      .then(() => {
        this.setState({ isFollowing: false });
      });
  }

  render() {
    const info = {
      url: this.state.url,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
      athuid: this.state.athuid,
    };
    const { isFollowing } = this.state;
    let button;
    if (isFollowing) {
      button = <UnFollowingButton onPress={this.handleUnFollow.bind(this)} />;
    } else {
      button = <FollowingButton onPress={this.handleFollow.bind(this)} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.athInfo}>
          <View style={styles.athProfileImage}>
            <Image
              style={styles.athProfileImageTitle}
              source={{ uri: info.url }}
            />
          </View>
          <View style={styles.athInfoContent}>
            <Text style={styles.athInfoContentTitle}>
              {info.athuid}
            </Text>
          </View>
          <View style={styles.athInfoContent}>
            <Text style={styles.athInfoContentTitle}>
              {info.lastname}
            </Text>
          </View>
          <View style={styles.athAge}>
            <Text style={styles.athAgeTitle}>
              age:
              {info.age}
            </Text>
          </View>
        </View>
        {button}
        <View style={styles.athIntroVideo}>
          <Text style={styles.athIntroVideoTitle}>
            紹介ビデオ、オンプレスで流れる
          </Text>
        </View>
        <View style={styles.athIntroCommentList}>
          <View style={styles.athIntroComment}>
            <Text style={styles.athIntroCommentTitle}>
              {info.intro1}
            </Text>
          </View>
          <View style={styles.athIntroComment}>
            <Text style={styles.athIntroCommentTitle}>
              {info.intro2}
            </Text>
          </View>
          <View style={styles.athIntroComment}>
            <Text style={styles.athIntroCommentTitle}>
              {info.intro3}
            </Text>
          </View>
        </View>
        <AthPostList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#88a5b7',
    paddingTop: 24,
  },
  userEdit: {
    alignItems: 'center',
    marginBottom: 5,
  },
  userEditButton: {
    borderWidth: 0.5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    padding: 3,
  },
  userEditTitle: {
    color: '#88a5b7',
  },
  athInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  athInfoContent: {
    marginTop: 32,
    paddingLeft: 12,
  },
  athInfoContentTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  athProfileImage: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 42,
    height: 84,
    width: 84,
    overflow: 'hidden',
  },
  athProfileImageTitle: {
    height: 84,
    width: 84,
  },
  athAge: {
    marginTop: 38,
    paddingLeft: 12,
  },
  athAgeTitle: {
    fontSize: 14,
    color: '#fff',
  },
  athIntroVideo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 12,
  },
  athIntroCommentList: {
    marginBottom: 24,
  },
  athIntroComment: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  athIntroCommentTitle: {
    fontSize: 14,
    color: '#fff',
  },
});
export default AthDetailScreen;
