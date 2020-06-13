import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

import PropTypes from 'prop-types';

import UserItemList from '../../components/UserItemList';

export default function UserItemScreen(props) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const itemRef = db.collection();

    function subscribeItems() {
      itemRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setItemList(list);
      });
    }
    subscribeItems();
  }, []);

  return (
    <View style={styles.container}>
      <UserItemList itemList={itemList} navigation={props.navigation} />
    </View>
  );
}

UserItemScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
});
