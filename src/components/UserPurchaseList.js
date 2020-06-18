import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

import NeumoBuyButton from '../elements/NeumoBuyButton';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

export default function UserPurchaseList({ purchaseList, navigation }) {
  const goBack = () => {
    navigation.navigate('main');
  };

  const renderPurchase = ({ item }) => {

    console.log(item);
    return (
      <View style={styles.purchaseItem}>
        <Text>
          {item.itemName}
        </Text>
        <Text>
          {dateString(item.createdOn)}
        </Text>
        <Text>
          {item.price}
        </Text>
        <Text>
          {item.uploader}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.purchaseList}>
      <FlatList
        data={purchaseList}
        renderItem={renderPurchase}
        style={styles.purchaseListFlat}
        numColumns={2}
        horizontal={false}
        scrollEnabled={false}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Purchase History
            </Text>
          </View>
        )}
        ListFooterComponent={(
          <View style={styles.footer}>
            <NeumoBuyButton
              text="Go Back"
              onBuyButtonPress={goBack}
            />
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  purchaseList: {
    width: '100%',
    paddingTop: 50,
  },
  purchaseListFlat: {
    width: '100%',
  },
  purchaseItem: {
    alignItems: 'center',
    width: '49%',
  },
  footer: {
    alignItems: 'center',
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
