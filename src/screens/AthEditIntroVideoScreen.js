import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import firebase from "firebase";

import ProgressBar from "../elements/ProgressBar";
import NeumoNextButton from "../elements/NeumoNextButton";
import VideoPicker from "../elements/VideoPicker";
import ExpoVideoContents from "../elements/ExpoVideoContents";

const videoWidth = Dimensions.get("window").width;

export default function AthEditIntroVideoScreen(props) {
  const [url, setUrl] = useState(props.route.params.url);
  const [progress, setProgress] = useState(0);
  const { uid } = firebase.auth().currentUser;
  const formerUrl = props.route.params.url;

  const filename = `users/${uid}/User/athlete/introVideo`;
  const posts = {
    url,
    uid,
  };
  let button;
  if (progress === 1) {
    button = <NeumoNextButton text="Submit" onPress={handleSubmit} />;
  }

  let video;
  if (url === undefined) {
    video = (
      <Text style={{ alignSelf: "center" }}>No video has been uploaded</Text>
    );
  } else {
    video = <ExpoVideoContents uri={formerUrl} width={videoWidth} />;
  }

  const handleSubmit = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const athRef = db.collection(`users/${user.uid}/User`).doc("athlete");
    athRef
      .update({
        introVideoURL: url,
      })
      .then(() => {
        props.navigation.navigate("AthPage");
      })
      .catch((error) => {
        console.log("Failed!!", error);
      });
  };

  console.log("this is posts from uploading:", posts);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Your Video</Text>
      </View>
      <View style={styles.video}>{video}</View>
      <View style={styles.progressBar}>
        <ProgressBar progress={progress} style={{ alignSelf: "center" }} />
      </View>
      <View style={styles.postButtons}>
        <NeumoNextButton
          text="Change a Video"
          onPress={() => {
            VideoPicker(filename, setUrl, setProgress);
          }}
        />
        {button}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 96,
    paddingBottom: 96,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "300",
  },
  progressBar: {
    alignItems: "center",
  },
  postButtons: {
    alignItems: "center",
    paddingTop: 64,
  },
  button: {
    backgroundColor: "#265366",
    marginTop: 24,
    borderRadius: 4,
    height: 48,
    width: 192,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
