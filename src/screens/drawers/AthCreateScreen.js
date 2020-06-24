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
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase';

import CircleButton from '../../elements/CircleButton';
import InputWithHoshi from '../../elements/InputWithHoshi';
import NeumoNextButton from '../../elements/NeumoNextButton';
import ProgressBar from '../../elements/ProgressBar';

class AthCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      introVideoUrl: '',
      firstname: '',
      lastname: '',
      age: '',
      intro1: '',
      intro2: '',
      intro3: '',
      category: '',
      athuid: '',
      videoProgress: 0,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/User`).doc('info');
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const url = doc.data().profileImageURL;
        this.setState({
          url,
        });
      }
    });
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
        const filename = `users/${user.uid}/athlete/profileImage`;

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
        const { uid } = user;
        const filename = `users/${uid}/User/athlete/introVideo`;

        // firebase storeのrefを取得
        const storageRef = firebase.storage().ref().child(`videos/, ${filename}`);

        // upload
        // const putTask = await storageRef.put(localBlob);
        // 進捗を取得したいのでawaitは使わず
        const putTask = storageRef.put(localBlob);
        putTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          this.setState({
            videoProgress: parseInt(progress, 10),
          });
        }, (error) => {
          console.log(error);
          alert('Failed to upload...');
        }, () => {
          putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            this.setState({
              introVideoUrl: downloadURL,
            });
          });
        });
      }
    } catch (e) {
      console.log(e.message);
      alert('Too much Size');
    }
  }


  async handlePress() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const athRef = db.collection(`users/${user.uid}/User`).doc('athlete')
    const userRef = db.collection(`users/${user.uid}/User`).doc('info')
    const batch = db.batch();
    batch.set(athRef, {
      profileImageURL: this.state.url,
      introVideoURL: this.state.introVideoUrl,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
      category: this.state.category,
      createdOn: new Date(),
      uid: user.uid,
      athuid: this.state.athuid,
    });
    batch.update(userRef, {
      isAthlete: true,
    });
    batch.commit()
      .then(() => {
        this.props.navigation.navigate('MaterialTabNavi');
      })
      .catch((error) => {
        console.log('Failed!!', error);
      });
  }

  handleCancel() {
    this.props.navigation.navigate('MaterialTabNavi');
  }

  render() {
    const placeholder = {
      label: 'Select a Category',
      value: null,
      color: '#9EA0A4',
    };
    return (
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <View style={styles.cancelButton}>
                  <TouchableHighlight
                    onPress={this.handleCancel.bind(this)}
                    underlayColor="transparent"
                  >
                    <Text style={styles.cancelButtonTitle}>
                      Cancel
                    </Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>
                    Create Athlete Account
                  </Text>
                </View>
                <View style={styles.userEditImage}>
                  <TouchableHighlight
                    style={styles.userImage}
                    onPress={this.ImageChoiceAndUpload}
                  >
                    <View
                      style={styles.userImage}
                    >
                      <Image
                        style={styles.userImageTitle}
                        source={this.state.url ? { uri: this.state.url } : null}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={styles.progressBar}>
                  <ProgressBar
                    progress={this.state.videoProgress}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
                <View style={styles.introVideoButton}>
                  <NeumoNextButton
                    text="Choose Your Intro Video"
                    onPress={this.VideoChoiceAndUpload}
                  />
                </View>
                <RNPickerSelect
                  value={this.state.category}
                  items={[
                    { label: 'Alpine', value: 'Alpine' },
                    { label: 'Cross Country', value: 'Cross Country' },
                    { label: 'Free Style', value: 'Free Style' },
                    { label: 'Noridic Combined', value: 'Noridic Combined' },
                    { label: 'Ski Jumping', value: 'Ski Jumping' },
                    { label: 'Snow Boarding', value: 'Snow Boarding' },
                  ]}
                  placeholder={placeholder}
                  onValueChange={(value) => {
                    this.setState({
                      category: value,
                    });
                  }}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                />
                <InputWithHoshi
                  label="Username"
                  value={this.state.athuid}
                  onChangeText={(text) => { this.setState({ athuid: text }); }}
                />
                <InputWithHoshi
                  label="First Name"
                  value={this.state.firstname}
                  onChangeText={(text) => { this.setState({ firstname: text }); }}
                />
                <InputWithHoshi
                  label="Last Name"
                  value={this.state.lastname}
                  onChangeText={(text) => { this.setState({ lastname: text }); }}
                />
                <InputWithHoshi
                  label="Age"
                  value={this.state.age}
                  onChangeText={(text) => { this.setState({ age: text }); }}
                />
                <InputWithHoshi
                  label="Introduction"
                  value={this.state.intro1}
                  onChangeText={(text) => { this.setState({ intro1: text }); }}
                />
                <InputWithHoshi
                  label="Introduction"
                  value={this.state.intro2}
                  onChangeText={(text) => { this.setState({ intro2: text }); }}
                />
                <InputWithHoshi
                  label="Introduction"
                  value={this.state.intro3}
                  onChangeText={(text) => { this.setState({ intro3: text }); }}
                />
                <CircleButton name="check" onPress={this.handlePress.bind(this)}/>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  inner: {
    backgroundColor: '#fff',
  },
  cancelButton: {
    alignItems: 'flex-end',
    paddingTop: 18,
    paddingRight: 18,
  },
  cancelButtonTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#007AFF',
  },
  header: {
    paddingTop: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  progressBar: {
    paddingTop: 12,
    alignItems: 'center',
  },
  introVideoButton: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    margin: 10,
  },
});


export default AthCreateScreen;
