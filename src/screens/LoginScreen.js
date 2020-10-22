import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import firebase from "firebase";
import { Hoshi } from "react-native-textinput-effects";

import { UserContext } from "@context/index";

import Layout from "@components/Layout";
import NeumophismButton from "../components/NeumophismButton";
import NeumoCircleButton from "../elements/NeumoCircleButton";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("user14@example.com");
  const [password, setPassword] = useState("password");

  const { login } = useContext(UserContext);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Hoshi
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          borderColor="#265366"
          borderHeight={4}
          inputPadding={12}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <Hoshi
          style={styles.input}
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          borderColor="#000"
          borderHeight={4}
          inputPadding={12}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          keyboardType="default"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            login(email, password);
          }}
          underlayColor="#ccc"
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.signup}
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text style={styles.signupTitle}>
            Create a new Account for EggApp
          </Text>
        </TouchableHighlight>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  input: {
    fontWeight: "100",
    fontSize: 8,
    backgroundColor: "#fff",
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
    marginTop: 20,
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
  },
  signup: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  signupTitle: {
    fontSize: 14,
    color: "#265366",
  },
});
