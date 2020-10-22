import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import PropTypes from "prop-types";
import firebase from "firebase";
import { Button } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { UserContext } from "@context/index";

import GoAthletePageButton from "@components/GoAthletePageButton";
import UserPageModal from "@components/UserPageModal";
import AthListInUser from "../components/AthListInUser";
import Layout from "../components/Layout";
import UserPageHeaderText from "../elements/UserPageHeaderText";

export default function UserPageScreen(props) {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [url, setUrl] = useState("");
  const [isAthlete, setIsAthlete] = useState(false);
  const [athList, setAthList] = useState([]);
  const [followingNum, setFollowingNum] = useState(0);
  const [commentsNum, setCommentsNum] = useState(0);
  const [giftsNum, setGiftsNum] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const docRef = db.collection(`users/${user.uid}/User`).doc("info");

  const athListRef = db.collection(`users/${user.uid}/following`);
  const { navigation } = props;
  const { checkAthlete } = useContext(UserContext);
  const { AthleteContext } = useContext(UserContext);

  const subscribeUserInfo = async () => {
    await docRef.onSnapshot((doc) => {
      if (doc.exists) {
        console.log("isAthlete", doc.data().isAthlete);
        setUsername(doc.data().username);
        setProfile(doc.data().profile);
        setUrl(doc.data().profileImageURL);
        setIsAthlete(doc.data().isAthlete);
        setFollowingNum(doc.data().followingNum);
        setCommentsNum(doc.data().commentsNum);
        setGiftsNum(doc.data().giftsNum);
        checkAthlete(isAthlete);
        console.log("AthleteContext", AthleteContext);
      } else {
        navigation.navigate("UserCreate");
      }
    });
  };

  const subscribeAthList = async () => {
    await athListRef.onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ ...doc.data(), key: doc.id });
      });
      setAthList(list);
      console.log("list-----", list);
    });
  };

  useEffect(() => {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */

    subscribeUserInfo();

    subscribeAthList();

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
      title: "My Page",
      headerTintColor: "#000",
      headerTitleStyle: {
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "center",
      },
    });
  }, []);

  const onBackdropPress = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePressFollow = () => {
    navigation.navigate("UserFollowingList");
  };

  const handlePressAthlete = () => {
    navigation.navigate("AthPage");
  };

  const handlePressCommentList = () => {
    navigation.navigate("UserCommentList");
  };

  const handlePressPurchaseList = () => {
    navigation.navigate("UserPurchaseList");
  };

  const userEditOnPress = () => {
    setModalVisible(!isModalVisible);
    const info = {
      username,
      profile,
      url,
    };
    navigation.navigate("UserEdit", {
      info,
    });
  };

  const info = {
    username,
    profile,
    url,
  };
  let button;
  if (isAthlete) {
    button = <GoAthletePageButton onPress={handlePressAthlete} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <AthListInUser
        athList={athList}
        navigation={navigation}
        info={info}
        followingNum={followingNum}
        commentsNum={commentsNum}
        giftsNum={giftsNum}
        button={button}
        onPressFollowing={handlePressFollow}
        onPressCommentList={handlePressCommentList}
        onPressPurchaseList={handlePressPurchaseList}
        style={{ height: "100%" }}
      />
      <UserPageModal
        onPress={userEditOnPress}
        onBackdropPress={onBackdropPress}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
  );
}

UserPageScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f7f7f7",
  },
});
