import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
} from 'react-native';
import firebase from 'firebase';
import { Hoshi } from 'react-native-textinput-effects' ;

class LoginScreen extends React.Component {
  state = {
    email: 'user1@example.com',
    password: 'password',
  }

  handleSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('error!!!!!', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Login
        </Text>
        <Hoshi
          style={styles.input}
          label="Email"
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          borderColor= "#265366"
          borderHeight={4}
          inputPadding={12}
          autoCapitalize="none"
          autoCorrect={false}
          value="user1@example.com"
        />
        <Hoshi
          style={styles.input}
          label="Password"
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          borderColor="#000"
          borderHeight={4}
          inputPadding={12}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value="password"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#ccc"
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.signup}
          onPress={() => {this.props.navigation.navigate('Signup'); }}
        >
          <Text style={styles.signupTitle}>Create a new Account for EggApp</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  input: {
    fontWeight: '100',
    fontSize: 8,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#265366',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    alignItems: 'center',
    marginTop: 30,
  },
  signupTitle: {
    fontSize: 14,
    color: '#265366',
  },
});

export default LoginScreen;
