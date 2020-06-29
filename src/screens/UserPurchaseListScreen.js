import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import UserPurchaseList from '../components/UserPurchaseList';

export default function PurchaseHistoryScreen({ navigation }) {
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const purchaseRef = db.collection(`users/${user.uid}/purchase`);

    function subscribePurchases() {
      purchaseRef.onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        setPurchaseList(list);
      });
    }
    subscribePurchases();
  }, []);

  return (
    <View style={styles.container}>
      <UserPurchaseList
        purchaseList={purchaseList}
        navigation={navigation}
      />
    </View>
  );
}

PurchaseHistoryScreen.propTypes = {
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
