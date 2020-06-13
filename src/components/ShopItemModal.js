import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default function ShopItemModal(props) {
  return (
    <View style={styles.shopItemModal}>
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={props.onBackdropPress}
      >
        <View style={styles.shopItemModalContent}>
          <View style={styles.itemName}>
            <Text style={styles.itemNameTitle}>
              {props.itemName}
            </Text>
          </View>
          <View style={styles.itemPrice}>
            <Text style={styles.itemPriceTitle}>
              {props.itemPrice}
              円
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

ShopItemModal.propTypes = {
  itemName: PropTypes.string.isRequired,
};


const styles = StyleSheet.create({
  userPageModal: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  shopItemModalContent: {
    height: 180,
    width: 320,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
  },
  itemName: {
    paddingTop: 12,
  },
  itemNameTitle: {
    fontSize: 32,
    fontWeight: '400',
  },
  itemPrice: {
    paddingTop: 24,
  },
  itemPriceTitle: {
    fontSize: 18,
    fontWeight: '300',
  },
});
