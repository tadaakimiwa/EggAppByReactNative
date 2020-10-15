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

import CircleButton from "../elements/CircleButton";

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
    console.log(info);
  }, []);

  const VideoChoiceAndUpload = async () => {
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
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.undefined}>
            <Text>Thumbnail ?</Text>
            <Text style={{ alignSelf: "center" }}>{progress}</Text>
          </View>
          <View style={styles.contentsInfo}>
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
            <TouchableHighlight
              style={styles.button}
              onPress={VideoChoiceAndUpload}
            >
              <Text style={styles.buttonTitle}>Choose a Thumbnail</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonTitle}>Post</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  undefined: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  postButtons: {
    alignItems: "center",
    height: "70%",
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
    paddingBottom: 10,
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
