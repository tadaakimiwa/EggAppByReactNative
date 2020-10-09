import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AthIntroCommentList from "../components/AthIntroCommentList";
import PostListInAthPage from "../components/PostListInAthPage";
import AthPostList from "../components/AthPostList";
import AthPageModal from "../components/AthPageModal";

class AthPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      introVideoURL: "",
      firstname: "",
      lastname: "",
      age: "",
      intro1: "",
      intro2: "",
      intro3: "",
      postList: [],
      isModalVisible: false,
    };
  }

  componentDidMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const { navigation } = this.props;
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/User`).doc("athlete");

    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const url = doc.data().profileImageURL;
        const { introVideoURL } = doc.data();
        const { firstname } = doc.data();
        const { lastname } = doc.data();
        const { age } = doc.data();
        const { intro1 } = doc.data();
        const { intro2 } = doc.data();
        const { intro3 } = doc.data();
        this.setState({
          url,
          introVideoURL,
          firstname,
          lastname,
          age,
          intro1,
          intro2,
          intro3,
        });
      } else {
        console.log("No such document!", user.uid);
      }
    });

    const postListRef = db.collection(`users/${user.uid}/posts`);

    postListRef.onSnapshot((snapshot) => {
      const postList = [];
      snapshot.forEach((doc) => {
        postList.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ postList });
    });

    const { athuid } = this.state;
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon={<MaterialCommunityIcons name="menu" size={24} color="#000" />}
          onPress={this.toggleModal.bind(this)}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
      ),
      title: athuid,
      headerTintColor: "#000",
      headerTitleStyle: {
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "center",
      },
    });
  }

  onBackdropPress() {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }

  toggleModal() {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }

  returnInfo(info) {
    this.setState({ info });
  }

  athEditOnPress() {
    this.setState({ isModalVisible: false });
    const info = {
      url: this.state.url,
      introVideoURL: this.state.introVideoURL,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
    };
    this.props.navigation.navigate("AthEdit", {
      info,
      returnInfo: this.returnInfo.bind(this),
    });
  }

  athIntroVideoOnPress() {
    this.setState({ isModalVisible: false });
    this.props.navigation.navigate("AthEditIntroVideo", {
      url: this.state.introVideoURL,
    });
  }

  athPostOnPress() {
    this.setState({ isModalVisible: false });
    this.props.navigation.navigate("AthUploading");
  }

  render() {
    const info = {
      url: this.state.url,
      introVideoURL: this.state.introVideoURL,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
    };
    return (
      <SafeAreaView style={styles.container}>
        <PostListInAthPage
          info={info}
          postList={this.state.postList}
          navigation={this.props.navigation}
        />
        <AthPageModal
          athEditOnPress={this.athEditOnPress.bind(this)}
          athPostOnPress={this.athPostOnPress.bind(this)}
          athIntroVideoOnPress={this.athIntroVideoOnPress.bind(this)}
          onBackdropPress={this.onBackdropPress.bind(this)}
          isModalVisible={this.state.isModalVisible}
        />
      </SafeAreaView>
    );
  }
}

AthPageScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#88a5b7",
  },
});

export default AthPageScreen;
