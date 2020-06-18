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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

import ShopItemModal from './ShopItemModal';
import NeumoBuyButton from '../elements/NeumoBuyButton';
import NeumoShopItemContent from '../elements/NeumoShopItemContent';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

const itemWidth = Dimensions.get('window').width * 0.49;
const itemHeight = itemWidth;

export default function ShopItemList({ itemList, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const onBackdropPress = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal = (n, p) => {
    setModalVisible(!isModalVisible);
    setName(n);
    setPrice(p);
  };

  const goBack = () => {
    navigation.navigate('main');
  };

  const renderShopItem = ({ item }) => {

    const handleBuy = () => {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      const userItemRef = db.collection(`users/${user.uid}/items`).doc(`${item.name}`);
      return db.runTransaction((transaction) => {
        return transaction.get(userItemRef).then((userItemDoc) => {
          if (!userItemDoc.exists) {
            transaction.set(userItemRef, {
              iconName: item.iconName,
              name: item.name,
              price: item.price,
              quantity: 1,
            });
          } else {
            const newQuantity = userItemDoc.data().quantity + 1;
            transaction.update(userItemRef, { quantity: newQuantity });
          }
        });
      })
        .then(() => {
          alert('you bought');
        });
    };

    console.log(item);
    return (
      <View style={[styles.shopItem, { height: itemHeight, width: itemWidth }]}>
        <NeumoShopItemContent
          toggleModal={() => { toggleModal(item.name, item.price); }}
          onBackdropPress={onBackdropPress}
          isModalVisible={isModalVisible}
          iconName={item.iconName}
          text={item.name}
          modalName={name}
          modalPrice={price}
        />
        <View style={styles.itemButton}>
          <NeumoBuyButton
            text="Buy"
            onBuyButtonPress={handleBuy}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.itemList}>
      <FlatList
        data={itemList}
        renderItem={renderShopItem}
        style={styles.itemListFlat}
        numColumns={2}
        horizontal={false}
        scrollEnabled={false}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Shop
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
  itemList: {
    width: '100%',
    paddingTop: 50,
  },
  itemListFlat: {
    width: '100%',
  },
  shopItem: {
    alignItems: 'center',
    width: '49%',
  },
  itemButton: {
    paddingTop: 18,
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
