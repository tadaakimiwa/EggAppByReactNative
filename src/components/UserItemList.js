import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import NeumoUserItemContent from '../elements/NeumoUserItemContent';
import NeumoBuyButton from '../elements/NeumoBuyButton';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

const itemWidth = Dimensions.get('window').width * 0.49;
const itemHeight = itemWidth * 0.8;

export default function UserItemList({ itemList, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const onBackdropPress = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal = (n, p, q) => {
    setModalVisible(!isModalVisible);
    setName(n);
    setPrice(p);
    setQuantity(q);
  };

  const goBack = () => {
    navigation.navigate('main');
  };

  const renderShopItem = ({ item }) => {
    console.log(item);
    return (
      <View style={[styles.userItem, { height: itemHeight, width: itemWidth }]}>
        <NeumoUserItemContent
          toggleModal={() => { toggleModal(item.name, item.price, item.quantity); }}
          onBackdropPress={onBackdropPress}
          isModalVisible={isModalVisible}
          iconName={item.iconName}
          text={item.name}
          modalName={name}
          modalPrice={price}
          modalQuantity={quantity}
        />
      </View>
    );
  }

  return (
    <View style={styles.athList}>
      <FlatList
        data={itemList}
        renderItem={renderShopItem}
        style={styles.athListFlat}
        numColumns={2}
        horizontal={false}
        scrollEnabled={false}
        ListEmptyComponent={(
          <View>
            <Text>Go Shop and Get some Item</Text>
          </View>
        )}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Items
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

UserItemList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


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
  athList: {
    width: '100%',
  },
  athListFlat: {
    width: '100%',
    paddingTop: 50,
  },
  userItem: {
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
