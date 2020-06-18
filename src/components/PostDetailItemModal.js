import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default function PostDetailItemModal(props) {
  return (
    <View style={styles.postItemModal}>
      <Modal
        isVisible={props.isItemModalVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={props.onItemBackdropPress}
      >
        <View style={styles.postItemModalContent}>
          <View style={styles.itemName}>
            <Text style={styles.itemNameTitle}>
              {props.modalName}
            </Text>
          </View>
          <View style={styles.itemPrice}>
            <Text style={styles.itemPriceTitle}>
              {props.modalPrice}
              円
            </Text>
          </View>
          <View style={styles.giftButton}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={props.handleGift}
            >
              <Text style={styles.giftButtonTitle}>
                Gift
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

PostDetailItemModal.propTypes = {
  modalName: PropTypes.string.isRequired,
};


const styles = StyleSheet.create({
  userPageModal: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  postItemModalContent: {
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
  giftButton: {
    marginTop: 12,
    backgroundColor: 'blue',
    borderRadius: 18,
  },
  giftButtonTitle: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
  },
});
