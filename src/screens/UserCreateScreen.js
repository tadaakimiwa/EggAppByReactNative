import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';
import InputWithHoshi from '../elements/InputWithHoshi';

class UserCreateScreen extends React.Component {

  state={
    username: '',
    createdOn: '',
    profile: '',
    url: '',
    progress: '',
  }

  ImageChoiceAndUpload = async () => {
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        const filename = `users/${user.uid}/info/profileImage`;

        // firebase storeのrefを取得
        const storageRef = firebase.storage().ref().child(`images/, ${filename}`);

        // upload
        // const putTask = await storageRef.put(localBlob);
        // 進捗を取得したいのでawaitは使わず
        const putTask = storageRef.put(localBlob);
        putTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            progress: parseInt(progress) + "%",
          });
        }, (error) => {
          console.log(error);
          alert('Failed to upload...');
        }, () => {
          putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            this.setState({
              progress: '',
              url: downloadURL,
            });
          })
        });
      }
    } catch (e) {
      console.log(e.message);
      alert('Too much Size');
    }
  }


  handlePress() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${user.uid}/User`).doc('info').set({
      uid: user.uid,
      username: this.state.username,
      profile: this.state.profile,
      profileImageURL: this.state.url,
      createdOn: newDate,
      isAthlete: false,
      followingNum: 0,
      commentsNum: 0,
      giftsNum: 0,
    })
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('Failed!!', error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.userEdit}>
              <View style={styles.userEditImage}>
                <View
                  style={styles.userImage}
                >
                  <Image
                    style={styles.userImageTitle}
                    source={{ uri: this.state.url }}
                  />
                </View>
              </View>
              <View style={styles.userIconChoose}>
                <TouchableHighlight
                  style={styles.userIconChooseButton}
                  onPress={this.ImageChoiceAndUpload}
                >
                  <Text style={styles.userIconChooseTitle}>
                    Choose your profile Icon
                  </Text>
                </TouchableHighlight>
              </View>
              <InputWithHoshi
                label="Username"
                value={this.state.username}
                onChangeText={(text) => { this.setState({ username: text }); }}
              />
              <InputWithHoshi
                label="Profile"
                value={this.state.profile}
                onChangeText={(text) => { this.setState({ profile: text }); }}
              />
            </View>
            <CircleButton name="check" onPress={this.handlePress.bind(this)}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  userEdit: {
    backgroundColor: '#fff',
  },
  userEditImage: {
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  userImage: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  userImageTitle: {
    height: 120,
    width: 120,
  },
  userEditInfo: {
    paddingBottom: 10,
  },
  userIconChoose: {
    alignItems: 'center',
    marginBottom: 5,
  },
  userIconChooseButton: {
    borderWidth: 0.5,
    borderColor: '#2DCCD3',
    padding: 3,
  },
  userIconChooseTitle: {
    color: '#2DCCD3',
  },
});


export default UserCreateScreen;
