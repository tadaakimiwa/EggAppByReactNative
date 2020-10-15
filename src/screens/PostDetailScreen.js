import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  YellowBox,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

import firebase from "firebase";

import VideoContents from "../elements/VideoContents";
import ExpoVideoContents from "../elements/ExpoVideoContents";
import PostVideoModal from "./PostVideoModal";
import PostCommentList from "../components/PostCommentList";
import PostDetailItemList from "../components/PostDetailItemList";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split("T")[0];
};

const videoWidth = Dimensions.get("window").width;

export default function PostDetailScreen(props) {
  const { navigation } = props;
  navigation.setOptions({
    headerRight: () => (
      <Button
        icon={<MaterialCommunityIcons name="menu" size={24} color="#000" />}
        onPress={toggleModal}
        buttonStyle={{
          backgroundColor: "#fff",
        }}
      />
    ),
    title: "EggApp",
    headerTintColor: "#000",
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "center",
    },
  });

  const [postVideoURL, setPostVideoURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [contentsCaption, setContentsCaption] = useState("");
  const [updatedOn, setUpdatedOn] = useState("");
  const [uploader, setUploader] = useState("");
  const [athuid, setAthuid] = useState("");
  const [contentsInfo, setContentsInfo] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [username, setUsername] = useState("");
  const [userProfileURL, setUserProfileURL] = useState("");
  const { uid } = props.route.params;
  const { postid } = props.route.params;

  const getUsernameAndProfile = async (db, user) => {
    await db
      .collection(`users/${user.uid}/User`)
      .doc("info")
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setUsername(doc.data().username);
          setUserProfileURL(doc.data().profileImageURL);
        } else {
          console.log("No such document!", user.uid);
        }
      });
  };

  useEffect(() => {
    console.log(props.route.params.postid);
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const docRef = db.collection(`users/${uid}/posts`).doc(`${postid}`);
    const commentRef = db.collection(`users/${uid}/posts/${postid}/comments`);
    const itemRef = db.collection(`users/${user.uid}/items`);

    function subscribeInfo() {
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setAthuid(doc.data().athuid);
          setProfileImageURL(doc.data().profileImageURL);
          setPostVideoURL(doc.data().postVideoURL);
          setThumbnailURL(doc.data().thumbnailURL);
          setContentsCaption(doc.data().contentsCaption);
          setContentsInfo(doc.data().contentsInfo);
          setUpdatedOn(dateString(doc.data().updatedOn));
          setUploader(doc.data().uploader);
          console.log(updatedOn);
        } else {
          console.log("No such document!");
        }
      });
    }

    function subscribeComment() {
      commentRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setCommentList(list);
      });
    }

    function subscribeItems() {
      itemRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setItemList(list);
      });
    }

    subscribeInfo();
    subscribeComment();
    subscribeItems();
    getUsernameAndProfile(db, user);
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onBackdropPress = () => {
    setModalVisible(!isModalVisible);
  };

  const videoModalOnPress = () => {
    setModalVisible(false);
    props.navigation.navigate("PostEdit", { info });
  };

  const post = {
    athuid,
    postVideoURL,
    thumbnailURL,
    contentsCaption,
    contentsInfo,
    updatedOn,
    profileImageURL,
    uid,
    postid,
    uploader,
  };
  const info = {
    contentsCaption: post.contentsCaption,
    contentsInfo: post.contentsInfo,
    thumbnailURL: post.thumbnailURL,
    postid: post.postid,
  };

  return (
    <View style={styles.container}>
      <View style={styles.video}>
        <ExpoVideoContents uri={post.postVideoURL} width={videoWidth} />
      </View>
      <PostDetailItemList
        itemList={itemList}
        navigation={props.navigation}
        uploader={post.uploader}
        postid={post.postid}
        athuid={post.athuid}
      />
      <View style={styles.videoInfo}>
        <View style={styles.videoBar}>
          <View style={styles.videoCaption}>
            <Text style={styles.videoCaptionTitle}>{post.contentsCaption}</Text>
          </View>
          <View style={styles.videoDate}>
            <Text style={styles.videoDateTitle}>{post.updatedOn}</Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => {
            props.navigation.navigate("AthDetail", { uid: post.uid });
          }}
        >
          <View style={styles.videoUserBar}>
            <View style={styles.videoUploader}>
              <Image
                style={styles.videoUploaderImage}
                source={
                  post.profileImageURL ? { uri: post.profileImageURL } : null
                }
              />
            </View>
            <View style={styles.videoUploaderName}>
              <Text style={styles.videoUploaderNameTitle}>{post.athuid}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <PostCommentList
        post={post}
        commentList={commentList}
        username={username}
        userProfileURL={userProfileURL}
      />
      <PostVideoModal
        post={post}
        navigation={props.navigation}
        onPress={videoModalOnPress}
        isModalVisible={isModalVisible}
        onBackdropPress={onBackdropPress}
      />
    </View>
  );
}

PostDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  video: {
    width: videoWidth,
    height: videoWidth * 0.6,
  },
  videoUploader: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 36,
    height: 72,
    width: 72,
    overflow: "hidden",
  },
  videoUploaderImage: {
    height: 72,
    width: 72,
  },
  videoInfo: {
    backgroundColor: "#fff",
  },
  videoBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
  },
  videoCaptionTitle: {
    fontSize: 18,
    fontWeight: "400",
  },
  videoDateTitle: {
    fontSize: 12,
  },
  videoUserBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
  },
  videoUploaderName: {
    justifyContent: "center",
    paddingLeft: 24,
  },
  videoUploaderNameTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
});
