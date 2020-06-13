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

  const goBack = (props) => {
    navigation.navigate('main');
  }

  const renderShopItem = ({ item }) => {
    console.log(item);
    return (
      <View style={[styles.shopItem, { height: itemHeight, width: itemWidth }]}>
        <NeumoShopItemContent
          toggleModal={() => { toggleModal(item.name, item.price); }}
          onBackdropPress={onBackdropPress}
          isModalVisible={isModalVisible}
          text={item.name}
          modalName={name}
          modalPrice={price}
        />
        <View style={styles.itemButton}>
          <NeumoBuyButton
            text="Buy"
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
            <TouchableHighlight
              style={styles.footerButton}
              onPress={goBack}
            >
              <Text style={styles.footerButtonTitle}>Go Back</Text>
            </TouchableHighlight>
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
    flexDirection: 'row',
    paddingTop: 50,
    alignItems: 'center',
  },
  itemListFlat: {
    width: '100%',
  },
  shopItem: {
    alignItems: 'center',
    width: '49%',
  },
  shopItemContent: {
    borderColor: '#ddd',
    borderWidth: 1,
    height: '60%',
    width: '80%',
    alignItems: 'center',
  },
  itemButton: {
    paddingTop: 18,
  },
  footer: {
    alignItems: 'center',
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
