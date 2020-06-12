import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';

class AthPostingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdOn: '',
      url: this.props.route.params.url,
      uuid: this.props.route.params.uuid,
      uid: this.props.route.params.uid,
      thumbnailurl: '',
      profileurl: '',
      progress: '',
      uploader: '',
      category: '',
      contentsInfo: '',
      contentsCaption: '',
      athuid: '',
    };
  }

  thumbnailChoiceAndUpload = async () => {
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
        const { uuid } = this.state;
        const { uid } = this.state;
        const filename = `users/${uid}/posts/${uuid}/thumbnail`;

        // firebase storeのrefを取得
        const storageRef = firebase.storage().ref().child(`images/, ${filename}`);

        // upload
        // const putTask = await storageRef.put(localBlob);
        // 進捗を取得したいのでawaitは使わず
        const user = await firebase.auth().currentUser;
        const db = await firebase.firestore();
        await this.getCategoryAndProfile(db, user);
        const putTask = storageRef.put(localBlob);
        putTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            progress: parseInt(progress) + '%',
          });
        }, (error) => {
          console.log(error);
          alert('Failed to upload...');
        }, () => {
          putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            this.setState({
              progress: '',
              thumbnailurl: downloadURL,
            });
          });
        });
      }
    } catch (e) {
      console.log(e.message);
      alert('Too much Size');
    }
  }

  getCategoryAndProfile = async (db, user) => {
    await db.collection(`users/${user.uid}/User`).doc('athlete').get().then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
        const { category } = doc.data();
        const profileurl = doc.data().profileImageURL;
        const { athuid } = doc.data();
        this.setState({ category, profileurl, athuid });
      } else {
        console.log('No such document!', user.uid);
      }
    });
  }

  handlePost = async () => {
    const user = await firebase.auth().currentUser;
    const { uuid } = this.state;
    const db = await firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/posts`).doc(uuid);
    const newDate = firebase.firestore.Timestamp.now();

    console.log('category:', this.state.category, 'athuid', this.state.athuid);
    docRef.set({
      postVideoURL: this.state.url,
      thumbnailURL: this.state.thumbnailurl,
      profileImageURL: this.state.profileurl,
      category: this.state.category,
      contentsInfo: this.state.contentsInfo,
      contentsCaption: this.state.contentsCaption,
      createdOn: newDate,
      uploader: user.uid,
      updatedOn: newDate,
      athuid: this.state.athuid,
    })
      .then(() => {
        this.props.navigation.navigate('AthPage');
      })
      .catch((error) => {
        console.log('Failed!!', error);
      });
  }

  render() {
    console.log(this.state.uid);
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.inner}>
            <View style={styles.undefined}>
              <Text>
                Thumbnail ?
              </Text>
              <Text style={{ alignSelf: 'center' }}>{this.state.progress}</Text>
            </View>
            <View style={styles.contentsInfo}>
              <TextInput
                style={styles.contentsCaption}
                value={this.state.contentsCaption}
                onChangeText={(text) => { this.setState({ contentsCaption: text }); }}
                placeholder="Write caption of your contents"
                placeholderTextColor="#bbb"
                multiline
              />
            </View>
            <View style={styles.contentsInfo}>
              <TextInput
                style={styles.contentsInfoTitle}
                value={this.state.contentsInfo}
                onChangeText={(text) => { this.setState({ contentsInfo: text }); }}
                placeholder="Write description of your contents"
                placeholderTextColor="#bbb"
                multiline
              />
            </View>
            <View style={styles.postButtons}>
              <TouchableHighlight
                style={styles.button}
                onPress={this.thumbnailChoiceAndUpload}
              >
                <Text style={styles.buttonTitle}>
                  Choose a Thumbnail
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={this.handlePost.bind(this)}
              >
                <Text style={styles.buttonTitle}>
                  Post
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  undefined: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtons: {
    alignItems: 'center',
    height: '70%',
  },
  button: {
    backgroundColor: '#265366',
    marginTop: 24,
    borderRadius: 4,
    height: 48,
    width: 216,
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
  contentsInfo: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  contentsCaption: {
    backgroundColor: '#eee',
    height: 48,
    width: 216,
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 8,
  },
  contentsInfoTitle: {
    backgroundColor: '#eee',
    height: 108,
    width: 216,
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 8,
  },
});

export default AthPostingScreen;
