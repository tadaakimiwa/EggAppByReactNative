import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import firebase from 'firebase';

import CircleButton from '../../elements/CircleButton';

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
    };
  }

  handlePress() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection(`users/${user.uid}/User`).doc('athlete').set({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
      createdOn: new Date(),
    })
      .then(() => {
        this.props.navigation.navigate('MaterialTabNavi');
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
              label="First Name"
              value={this.state.firstname}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ firstname: text }); }}
            />
          </View>

          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Last Name"
              value={this.state.lastname}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ lastname: text }); }}
            />
          </View>

          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Age"
              value={this.state.age}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ age: text }); }}
            />
          </View>

          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Introduction"
              value={this.state.intro1}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ intro1: text }); }}
            />
          </View>

          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Introduction"
              value={this.state.intro2}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ intro2: text }); }}
            />
          </View>

          <View style={styles.userEditInfo}>
            <Hoshi
              style={styles.input}
              label="Introduction"
              value={this.state.intro3}
              borderColor="#265366"
              borderHeight={4}
              inputPadding={12}
              onChangeText={(text) => { this.setState({ intro3: text }); }}
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


export default AthCreateScreen;
