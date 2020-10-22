import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Hoshi } from "react-native-textinput-effects";
import firebase from "firebase";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Layout from "@components/Layout";

import CircleButton from "../elements/CircleButton";
import ProgressBar from "../elements/ProgressBar";
import NeumoNextButton from "../elements/NeumoNextButton";

export default function PostEditScreen(props) {
  const [contentsCaption, setCaption] = useState("");
  const [contentsInfo, setInfo] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [postid, setPostid] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const { info } = props.route.params;
    setPostid(info.postid);
    setCaption(info.contentsCaption);
    setInfo(info.contentsInfo);
    setThumbnailURL(info.thumbnailURL);
    if (thumbnailURL !== undefined) {
      setProgress(1);
    }
    console.log(info);
  }, []);

  const ThumbnailChoiceAndUpload = async () => {
    try {
      // まず、CAMERA_ROLLのパーミッション確認
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("利用には許可が必要です。");
          return;
        }
      }

      // 次に、画像を選ぶ
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        // 撮影された（ローカルの）写真を取得
        const localUri = await fetch(result.uri);
        // blobを取得
        const localBlob = await localUri.blob();

        // filename 実際はUIDとかユーザー固有のIDをファイル名にする感じかと
        const user = firebase.auth().currentUser;
        const filename = `users/${user.uid}/posts/${postid}/thumbnail`;

        // firebase storeのrefを取得
        const storageRef = firebase
          .storage()
          .ref()
          .child(`images/, ${filename}`);

        // upload
        // const putTask = await storageRef.put(localBlob);
        // 進捗を取得したいのでawaitは使わず
        const putTask = storageRef.put(localBlob);
        putTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(parseInt(progress) + "%");
          },
          (error) => {
            console.log(error);
            alert("Failed to upload...");
          },
          () => {
            putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL);
              setThumbnailURL(downloadURL);
            });
          }
        );
      }
    } catch (e) {
      console.log(e.message);
      alert("Too much Size");
    }
  };

  let thumbnail;
  if (progress === 1) {
    thumbnail = (
      <View style={styles.thumbnail}>
        <Image
          source={{ uri: thumbnailURL }}
          style={{ height: 144, width: 240 }}
        />
      </View>
    );
  }

  let handleEditButton;
  if (progress === 1) {
    handleEditButton = <NeumoNextButton text={"Edit"} onPress={handleEdit} />;
  }

  const handleEdit = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${user.uid}/posts`)
      .doc(postid)
      .update({
        contentsCaption,
        contentsInfo,
        thumbnailURL,
        updatedOn: newDate,
      })
      .then(() => {
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log("Failed!!", error);
      });
  };

  return (
    <Layout>
      <View style={styles.inner}>
        <View style={styles.thumbnailTab}>
          <Text
            style={{
              paddingTop: 12,
              fontSize: 18,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Thumbnail
          </Text>
          {thumbnail}
          <ProgressBar progress={progress} style={{ alignSelf: "center" }} />
        </View>
        <View style={styles.contentsInfo}>
          <Text
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              fontSize: 18,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Caption
          </Text>
          <TextInput
            style={styles.contentsCaption}
            value={contentsCaption}
            onChangeText={(text) => {
              setCaption(text);
            }}
            placeholder="Write caption of your contents"
            placeholderTextColor="#bbb"
            multiline
          />
        </View>
        <View style={styles.contentsInfo}>
          <Text
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              fontSize: 18,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Info
          </Text>
          <TextInput
            style={styles.contentsInfoTitle}
            value={contentsInfo}
            onChangeText={(text) => {
              setInfo(text);
            }}
            placeholder="Write description of your contents"
            placeholderTextColor="#bbb"
            multiline
          />
        </View>
        <View style={styles.postButtons}>
          <NeumoNextButton
            text={"Choose a Thumbnail"}
            onPress={ThumbnailChoiceAndUpload}
          />

          {handleEditButton}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  ThumbnailTab: { alignItems: "center", justifyContent: "center" },
  thumbnail: { paddingTop: 12, paddingBottom: 12, alignItems: "center" },
  postButtons: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#265366",
    marginTop: 24,
    borderRadius: 4,
    height: 48,
    width: 216,
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
  contentsInfo: {
    alignItems: "center",
  },
  contentsCaption: {
    backgroundColor: "#eee",
    height: 48,
    width: 216,
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 8,
  },
  contentsInfoTitle: {
    backgroundColor: "#eee",
    height: 108,
    width: 216,
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 8,
  },
});
