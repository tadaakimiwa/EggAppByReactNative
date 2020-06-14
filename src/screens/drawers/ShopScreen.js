import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import ShopItemList from '../../components/ShopItemList';

export default function ShopScreen({ navigation }) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const itemRef = db.collection('app/shop/items');

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
      <ShopItemList
        itemList={itemList}
        navigation={navigation}
      />
    </View>
  );
}

ShopScreen.propTypes = {
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
});
