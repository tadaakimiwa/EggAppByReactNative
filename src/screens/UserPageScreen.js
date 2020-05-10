import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import UserInfo from '../components/UserInfo';
import AthList from '../components/AthList';

class UserPageScreen extends React.Component {
  state = {
    info: [],
  }

  UNSAFE_componentWillMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/User`).doc('info');

    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const info = [];
          info.push({ ...doc.data(), key: doc.id });
          this.setState({ info });
        } else {
          console.log('No such document!', user.uid);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <UserInfo
          style={styles.userInfo}
          navigation={this.props.navigation}
          info={this.state.info}
        />

        <AthList style={styles.athList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  userInfo: {
    width: '100%',
  },
  athList: {
    height: '100%',
  },
});

export default UserPageScreen;
