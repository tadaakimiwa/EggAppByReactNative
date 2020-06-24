import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';

import ProgressBar from '../elements/ProgressBar';
import NeumoNextButton from '../elements/NeumoNextButton';

class AthUploadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      progress: 0,
    };
  }

  VideoChoiceAndUpload = async () => {
    try {
      // まず、CAMERA_ROLLのパーミッション確認
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('利用には許可が必要です。');
          return;
        }
      }

      // 次に、画像を選ぶ
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        // 撮影された（ローカルの）写真を取得
        const localUri = await fetch(result.uri);
        // blobを取得
        const localBlob = await localUri.blob();

        // filename 実際はUIDとかユーザー固有のIDをファイル名にする感じかと
        const user = firebase.auth().currentUser;
        const postRef = firebase.firestore().collection(`users/${user.uid}/posts`).doc();
        const uuid = postRef.id;
        const { uid } = user
        const filename = `users/${uid}/posts/${uuid}`;

        // firebase storeのrefを取得
        const storageRef = firebase.storage().ref().child(`videos/, ${filename}`);

        // upload
        // const putTask = await storageRef.put(localBlob);
        // 進捗を取得したいのでawaitは使わず
        const putTask = storageRef.put(localBlob);
        putTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          this.setState({
            progress: parseInt(progress, 10),
          });
        }, (error) => {
          console.log(error);
          alert('Failed to upload...');
        }, () => {
          putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            this.setState({
              url: downloadURL,
              uuid,
              uid,
            });
          });
        });
      }
    } catch (e) {
      console.log(e.message);
      alert('Too much Size');
    }
  }

  render() {
    console.log(this.state.uuid);
    const { url } = this.state;
    const { uuid } = this.state;
    const { uid } = this.state;
    const posts = {
      url,
      uuid,
      uid,
    };
    let button;
    if (this.state.progress === 1) {
      button = (
        <NeumoNextButton
          text="Next"
          onPress={() => { this.props.navigation.navigate('AthPosting', posts); }}
        />
      );
    }
    console.log('this is posts from uploading:', posts);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Upload Your Video
          </Text>
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={this.state.progress}
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View style={styles.postButtons}>
          <NeumoNextButton
            text="Choose a Video"
            onPress={this.VideoChoiceAndUpload}
          />
          {button}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 96,
    paddingBottom: 96,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
  },
  progressBar: {
    alignItems: 'center',
  },
  postButtons: {
    alignItems: 'center',
    paddingTop: 64,
  },
  button: {
    backgroundColor: '#265366',
    marginTop: 24,
    borderRadius: 4,
    height: 48,
    width: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default AthUploadingScreen;
