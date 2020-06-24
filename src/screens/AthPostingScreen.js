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

import NeumoNextButton from '../elements/NeumoNextButton';
import ProgressBar from '../elements/ProgressBar';

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
      progress: 0,
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
    const postRef = db.collection(`users/${user.uid}/posts`).doc(uuid);
    const itemDiamondRef = postRef.collection('items').doc('diamond');
    const itemDrinkRef = postRef.collection('items').doc('drink');
    const itemTrophyRef = postRef.collection('items').doc('trophy');
    const batch = db.batch();
    const newDate = firebase.firestore.Timestamp.now();

    console.log('category:', this.state.category, 'athuid', this.state.athuid);
    batch.set(postRef, {
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
    });
    batch.set(itemDiamondRef, {
      itemName: 'diamond',
      quantity: 0,
      price: 10000,
    });
    batch.set(itemDrinkRef, {
      itemName: 'drink',
      quantity: 0,
      price: 500,
    });
    batch.set(itemTrophyRef, {
      itemName: 'trophy',
      quantity: 0,
      price: 5000,
    });
    batch.commit()
      .then(() => {
        this.props.navigation.navigate('AthPage');
      })
      .catch((error) => {
        console.log('Failed!!', error);
      });
  }

  render() {
    let button;
    if (this.state.progress === 1) {
      button = (
        <NeumoNextButton
          text="Post"
          onPress={this.handlePost.bind(this)}
        />
      );
    }
    console.log(this.state.uid);
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Create Your Post
              </Text>
            </View>
            <View style={styles.progressBar}>
              <ProgressBar
                progress={this.state.progress}
                style={{ alignSelf: 'center' }}
              />
            </View>
            <View style={styles.thumbnailButton}>
              <NeumoNextButton
                text="Choose a Thubmnail"
                onPress={this.thumbnailChoiceAndUpload}
              />
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
              {button}
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
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 96,
    paddingBottom: 64,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
  },
  progressBar: {
    alignItems: 'center',
  },
  thumbnailButton: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
  },
  postButtons: {
    alignItems: 'center',
  },
  contentsInfo: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  contentsCaption: {
    backgroundColor: '#fff',
    height: 48,
    width: 240,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 3,
    padding: 8,
  },
  contentsInfoTitle: {
    backgroundColor: '#fff',
    height: 108,
    width: 240,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 3,
    padding: 8,
  },
});

export default AthPostingScreen;
