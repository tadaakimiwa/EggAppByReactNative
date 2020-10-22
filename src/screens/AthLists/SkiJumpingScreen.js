import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import firebase from "firebase";
import LottieView from "lottie-react-native";

import AthListAirbnb from "../../components/AthListAirbnb";

export default function SkiJumpingScreen(props) {
  const [athList, setAthList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collectionGroup("posts")
      .where("category", "==", "SkiJumping")
      .get()
      .then((querysnapshot) => {
        const list = [];
        querysnapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
          console.log(list);
        });
        setAthList(list);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  let lottie;
  if (loading) {
    return (
      <LottieView
        source={require("../../../assets/lottie/sandWatch.json")}
        autoPlay
        loop
      />
    );
  }

  return (
    <View style={styles.container}>
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
    paddingTop: 12,
    backgroundColor: "#f7f7f7",
  },
});
