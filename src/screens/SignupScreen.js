import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
} from "react-native";
import firebase from "firebase";

import { UserContext } from "@context/index";

export default function SignupScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useContext(UserContext);

  const handleSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate("UserCreate");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email Address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          signup(email, password);
        }}
        underlayColor="#ccc"
      >
        <Text style={styles.buttonTitle}>Submit</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#eee",
    height: 40,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#265366",
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
  },
});
