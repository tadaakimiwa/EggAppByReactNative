import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

import AthIntroCommentList from '../components/AthIntroCommentList';
import AthPostList from '../components/AthPostList';

class AthPageScreen extends React.Component {
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

  UNSAFE_componentWillMount() {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
      }
    }); */
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db.collection(`users/${user.uid}/User`).doc('athlete');

    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const firstname = doc.data().firstname;
          const lastname = doc.data().lastname;
          const age = doc.data().age;
          const intro1 = doc.data().intro1;
          const intro2 = doc.data().intro2;
          const intro3 = doc.data().intro3;
          this.setState({ firstname, lastname, age, intro1, intro2, intro3 });
        } else {
          console.log('No such document!', user.uid);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  returnInfo(info) {
    this.setState({ info });
  }

  render() {
    const info = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      intro1: this.state.intro1,
      intro2: this.state.intro2,
      intro3: this.state.intro3,
    };
    return (
      <View style={styles.container}>
        <View style={styles.athInfo}>
          <View style={styles.athInfoContent}>
            <Text style={styles.athInfoContentTitle}>
              {info.firstname}
            </Text>
          </View>
          <View style={styles.athInfoContent}>
            <Text style={styles.athInfoContentTitle}>
              {info.lastname}
            </Text>
          </View>
          <View style={styles.athAge}>
            <Text style={styles.athAgeTitle}>
              age:
              {info.age}
            </Text>
          </View>
        </View>
        <View style={styles.userEdit}>
          <TouchableHighlight
            style={styles.userEditButton}
            onPress={() => { this.props.navigation.navigate('AthEdit', { info, returnInfo: this.returnInfo.bind(this) }); }}
          >
            <Text style={styles.userEditTitle}>
              Edit your athlete Infomation
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.athIntroVideo}>
          <Text style={styles.athIntroVideoTitle}>
            紹介ビデオ、オンプレスで流れる
          </Text>
        </View>
        <View style={styles.athIntroCommentList}>
          <View style={styles.athIntroComment}>
            <Text style={styles.athIntroCommentTitle}>
              {info.intro1}
            </Text>
          </View>
          <View style={styles.athIntroComment}>
            <Text style={styles.athIntroCommentTitle}>
              {info.intro2}
            </Text>
          </View>
          <View style={styles.athIntroComment}>
            <Text style={styles.athIntroCommentTitle}>
              {info.intro3}
            </Text>
          </View>
        </View>
        <AthPostList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
  },
  userEdit: {
    alignItems: 'center',
    marginBottom: 5,
  },
  userEditButton: {
    borderWidth: 0.5,
    borderColor: '#2DCCD3',
    padding: 3,
  },
  userEditTitle: {
    color: '#2DCCD3',
  },
  athInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  athInfoContent: {
    marginTop: 12,
    paddingLeft: 12,
  },
  athInfoContentTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  athAge: {
    marginTop: 16,
    paddingLeft: 12,
  },
  athAgeTitle: {
    fontSize: 16,
  },
  athIntroVideo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 12,
  },
  athIntroCommentList: {
    marginBottom: 24,
  },
  athIntroComment: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  athIntroCommentTitle: {
    fontSize: 14,
  },
});

export default AthPageScreen;
