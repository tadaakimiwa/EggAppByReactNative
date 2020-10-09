import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";

export default async function VideoPicker(filename, setUrl, setProgress) {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
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
      const { uid } = user;

      // firebase storeのrefを取得
      const storageRef = firebase.storage().ref().child(`videos/, ${filename}`);

      // upload
      // const putTask = await storageRef.put(localBlob);
      // 進捗を取得したいのでawaitは使わず
      const putTask = storageRef.put(localBlob);
      putTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setProgress(parseInt(progress, 10));
        },
        (error) => {
          console.log(error);
          alert("Failed to upload...");
        },
        () => {
          putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  } catch (e) {
    console.log(e.message);
    alert("Too much Size");
  }
}
