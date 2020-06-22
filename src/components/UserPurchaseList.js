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

import NeumoBuyButton from '../elements/NeumoBuyButton';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return `${str.split('T')[0]} ${str.split('T')[1].substr(0, 8)}`;
};

export default function UserPurchaseList({ purchaseList, navigation }) {
  const goBack = () => {
    navigation.navigate('main');
  };

  const renderPurchase = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.purchaseItem}>
        <View style={styles.leftTab}>
          <MaterialCommunityIcons
            name={item.iconName}
            size={48}
          />
          <Text style={styles.itemNameTitle}>
            {item.itemName}
          </Text>
        </View>
        <View style={styles.rightTab}>
          <View style={styles.itemTime}>
            <Text style={styles.itemTimeTitle}>
              {dateString(item.createdOn)}
            </Text>
          </View>
          <View style={styles.itemPrice}>
            <Text style={styles.itemPriceTitle}>
              Price: ¥
              {item.price}
            </Text>
          </View>
          <View style={styles.itemAthName}>
            <Text style={styles.itemAthNameTo}>
              To
            </Text>
            <Text style={styles.itemAthNameTitle}>
              {item.athuid}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.purchaseList}>
      <FlatList
        data={purchaseList}
        renderItem={renderPurchase}
        style={styles.purchaseListFlat}
        numColumns={1}
        horizontal={false}
        scrollEnabled
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
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 12,
  },
  leftTab: {
    alignItems: 'center',
    paddingRight: 12,
  },
  itemNameTitle: {
    fontSize: 12,
    fontWeight: '300',
  },
  rightTab: {
    paddingTop: 0,
  },
  itemTime: {

  },
  itemTimeTitle: {
    fontSize: 16,
  },
  itemPrice: {
    paddingTop: 2,
  },
  itemPriceTitle: {
    fontSize: 16,
  },
  itemAthName: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 2,
  },
  itemAthNameTo: {
    fontSize: 16,
  },
  itemAthNameTitle: {
    paddingLeft: 2,
    fontSize: 16,
    color: 'blue',
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
