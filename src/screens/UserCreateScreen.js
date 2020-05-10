import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import firebase from 'firebase';

import UserEdit from '../components/UserEdit';
import CircleButton from '../elements/CircleButton';

class UserCreateScreen extends React.Component {

  state={
    username: '',
    createdOn: '',
    profile: '',
  }

  handlePress() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection(`users/${user.uid}/User`).doc('info').set({
      username: this.state.username,
      profile: this.state.profile,
      createdOn: new Date(),
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
      <View style={styles.container}>
        <View style={styles.userEdit}>
          <View style={styles.userEditImage}>
            <TouchableHighlight style={styles.userImage}>
              <Text style={styles.userImageTitle}>
                Change
              </Text>
            </TouchableHighlight>
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


export default UserCreateScreen;
