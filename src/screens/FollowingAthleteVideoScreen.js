import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import firebase from "firebase";
import LottieView from "lottie-react-native";

import AthListAirbnb from "@components/AthListAirbnb";

export default function FollowingAthleteVideoScreen(props) {
  const [athList, setAthList] = useState([]);
  const [followeeList, setFolloweeList] = useState([]);
  const [isFollow, setIsFollow] = useState(true);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const followeeRef = db.collection(`users/${user.uid}/following`);
    await followeeRef.get().then((querySnapshot) => {
      if (querySnapshot.exists) {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data().uid);
        });
        setFolloweeList(list);
        console.log("followeeList!!!", followeeList);
      } else {
        setIsFollow(false);
      }
    });
    await followeeList.forEach((followee) => {
      const athListRef = db.collection(`users/${followee}/posts`);
      athListRef.get().then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setAthList(list);
        console.log("AthList!!!", athList);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  let lottie;
  if (loading) {
    lottie = (
      <LottieView
        source={require("../../assets/lottie/sandWatch.json")}
        autoPlay
        loop
      />
    );
  }
  if (isFollow !== false) {
    return (
      <View>
        <Text>Go Follow Athletes!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {lottie}
      <AthListAirbnb
        athList={athList}
        navigation={props.navigation}
        getData={getData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 24,
    backgroundColor: "#f7f7f7",
  },
});
