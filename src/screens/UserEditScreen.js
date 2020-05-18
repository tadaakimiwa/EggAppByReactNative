import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { Avatar, Button } from 'react-native-elements';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';

class UserEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profile: '',
      createdOn: '',
      url: '',
      progress: '',
    };
  }

  UNSAFE_componentWillMount() {
    const { info } = this.props.route.params;
    this.setState({
      username: info.username,
      profile: info.profile,
      url: info.url,
    });
  }

  ImageChoiceAndUpload = async () => {
    try {
      //まず、CAMERA_ROLLのパーミッション確認
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('利用には許可が必要です。');
          return;
        }
      }

      //次に、画像を選ぶ
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
    const docRef = db.collection(`users/${user.uid}/User`).doc('info');
    const newDate = firebase.firestore.Timestamp.now();

    docRef.update({
      username: this.state.username,
      profile: this.state.profile,
      profileImageURL: this.state.url,
      createdOn: newDate,
    })
      .then(() => {
        this.setState({
          username: this.state.username,
          profile: this.state.profile,
          url: this.state.url,
        });
        const { navigation } = this.props;
        this.props.route.params.returnInfo({
          username: this.state.username,
          profile: this.state.profile,
          url: this.state.url,
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Failed!!', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userEdit}>
          <View style={styles.userEditImage}>
            <Avatar
              size="large"
              rounded
              title="NI"
              onPress={this.ImageChoiceAndUpload}
              source={{ uri: this.state.url }}
            />
          </View>
          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Name"
              value={this.state.username}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ username: text }); }}
            />
          </View>

          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Profile"
              value={this.state.profile}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ profile: text }); }}
            />
          </View>
        </View>
        <CircleButton name="check" onPress={this.handlePress.bind(this)}/>
      </View>
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
  },
  userImageTitle: {
    fontSize: 16,
  },
  userEditInfo: {
    paddingBottom: 10,
  },
});

export default UserEditScreen;
