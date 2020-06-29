import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import FollowingList from '../../components/FollowingList';
import NeumoBuyButton from '../../elements/NeumoBuyButton';

export default function FollowingListScreen({ navigation }) {
  const [followList, setFollowList] = useState([]);


  useEffect(() => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const followListRef = db.collection(`users/${user.uid}/following`);
    function subscribeFollow() {
      followListRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setFollowList(list);
      });
    }
    subscribeFollow();
  }, []);

  const goBack = () => {
    navigation.navigate('main');
  };

  const footer = () => {
    return (
      <View style={styles.footer}>
        <NeumoBuyButton
          text="Go Back"
          onBuyButtonPress={goBack}
        />
      </View>
    );
  };

  const header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Following
        </Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <FollowingList
        followList={followList}
        navigation={navigation}
        header={header}
        footer={footer}
      />
    </View>
  );
}

FollowingListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  footerButtonTitle: {
    fontSize: 12,
  },
});
