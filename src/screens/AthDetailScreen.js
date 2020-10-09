import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import firebase from "firebase";

import AthIntroCommentList from "../components/AthIntroCommentList";
import FollowingButton from "../components/FollowingButton";
import UnFollowingButton from "../components/UnFollowingButton";
import AthPostList from "../components/AthPostList";
import PostListInAthDetail from "../components/PostListInAthDetail";

class AthDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      firstname: "",
      lastname: "",
      age: "",
      intro1: "",
      intro2: "",
      intro3: "",
      athuid: "",
      introVideoURL: "",
      followeeuid: "",
      isFollowing: false,
      postList: [],
    };
  }

  componentDidMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const { uid } = this.props.route.params;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${uid}/User`).doc("athlete");

    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const url = doc.data().profileImageURL;
        const { athuid } = doc.data();
        const { introVideoURL } = doc.data();
        const { firstname } = doc.data();
        const { lastname } = doc.data();
        const { age } = doc.data();
        const { intro1 } = doc.data();
        const { intro2 } = doc.data();
        const { intro3 } = doc.data();
        this.setState({
          followeeuid: uid,
          athuid,
          introVideoURL,
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
        console.log("No such document!", uid);
      }
    });

    const postListRef = db.collection(`users/${uid}/posts`);

    postListRef.onSnapshot((snapshot) => {
      const postList = [];
      snapshot.forEach((doc) => {
        postList.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ postList });
    });

    const user = firebase.auth().currentUser;
    const followRef = db.collection(`users/${user.uid}/following`).doc(uid);
    followRef.get().then((doc) => {
      if (doc.exists) {
        const { isFollowing } = doc.data();
        this.setState({ isFollowing });
      }
    });
  }

  async handleFollow() {
    const { athuid } = await this.state;
    const { followeeuid } = await this.state;
    const { uid } = await firebase.auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection(`users/${uid}/User`).doc("info");
    const followerRef = db
      .collection(`users/${uid}/following`)
      .doc(followeeuid);
    const followeeRef = db.collection(`users/${followeeuid}/follower`).doc(uid);
    const newDate = firebase.firestore.Timestamp.now();
    const batch = db.batch();
    await batch.set(followerRef, {
      createdOn: newDate,
      updatedOn: newDate,
      uid: followeeuid,
      athuid,
      profileImageURL: this.state.url,
      isFollowing: true,
    });
    await batch.set(followeeRef, {
      uid,
      createdOn: newDate,
      updatedOn: newDate,
    });
    await batch.update(userRef, {
      followingNum: firebase.firestore.FieldValue.increment(1),
    });
    batch.commit().then(() => {
      this.setState({ isFollowing: true });
    });
  }

  async handleUnFollow() {
    const { followeeuid } = await this.state;
    const { uid } = await firebase.auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection(`users/${uid}/User`).doc("info");
    const followerRef = db
      .collection(`users/${uid}/following`)
      .doc(followeeuid);
    const followeeRef = db.collection(`users/${followeeuid}/follower`).doc(uid);
    const batch = db.batch();
    await batch.delete(followerRef);
    await batch.delete(followeeRef);
    await batch.update(userRef, {
      followingNum: firebase.firestore.FieldValue.increment(-1),
    });
    batch.commit().then(() => {
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
      introVideoURL: this.state.introVideoURL,
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
        <PostListInAthDetail
          info={info}
          button={button}
          postList={this.state.postList}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#88a5b7",
  },
});
export default AthDetailScreen;
