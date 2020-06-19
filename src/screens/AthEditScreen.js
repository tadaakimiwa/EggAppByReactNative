import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';
import InputWithHoshi from '../elements/InputWithHoshi';

class AthCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      intro1: '',
      intro2: '',
      intro3: '',
      url: '',
      progress: '',
    };
  }

  UNSAFE_componentWillMount() {
    const { info } = this.props.route.params;
    this.setState({
      firstname: info.firstname,
      lastname: info.lastname,
      age: info.age,
      intro1: info.intro1,
      intro2: info.intro2,
      intro3: info.intro3,
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

  handlePress() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${user.uid}/User`).doc('athlete').update({
      profileImageURL: this.state.url,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
      createdOn: newDate,
    })
      .then(() => {
        this.setState({
          url: this.state.url,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          age: this.state.age,
          intro1: this.state.intro1,
          intro2: this.state.intro2,
          intro3: this.state.intro3,
        });
        const { navigation } = this.props;
        this.props.route.params.returnInfo({
          url: this.state.url,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          age: this.state.age,
          intro1: this.state.intro1,
          intro2: this.state.intro2,
          intro3: this.state.intro3,
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
            <TouchableHighlight
              style={styles.userImage}
              onPress={this.ImageChoiceAndUpload}
            >
              <View
                style={styles.userImage}
              >
                <Image
                  style={styles.userImageTitle}
                  source={{ uri: this.state.url }}
                />
              </View>
            </TouchableHighlight>
          </View>
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


export default AthCreateScreen;
