import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

import DraggableItem from "../elements/DraggableItem";
import PostDetailItemModal from "./PostDetailItemModal";

export default function PostDetailItemList({
  itemList,
  navigation,
  uploader,
  postid,
  athuid,
}) {
  const [isItemModalVisible, setItemModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [iconName, setIconName] = useState(0);
  const [itemListHeight, setHeight] = useState(64);

  const onItemBackdropPress = () => {
    setItemModalVisible(!isItemModalVisible);
  };

  const toggleItemModal = (item) => {
    setItemModalVisible(!isItemModalVisible);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setIconName(item.iconName);
  };

  const closeItemModal = () => {
    setItemModalVisible(false);
  };

  const handleGift = () => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const newDate = firebase.firestore.Timestamp.now();
    const userRef = db.collection(`users/${user.uid}/User`).doc("info");
    const userItemRef = db.collection(`users/${user.uid}/items`).doc(name);
    const uploaderItemRef = db
      .collection(`users/${uploader}/posts/${postid}/items`)
      .doc(name);
    const purchaseRef = db.collection(`users/${user.uid}/purchase`).doc();
    const batch = db.batch();
    batch.update(userItemRef, {
      quantity: firebase.firestore.FieldValue.increment(-1),
    });
    batch.update(uploaderItemRef, {
      quantity: firebase.firestore.FieldValue.increment(1),
    });
    batch.update(userRef, {
      giftsNum: firebase.firestore.FieldValue.increment(1),
    });
    batch.set(purchaseRef, {
      uploader,
      postid,
      itemName: name,
      createdOn: newDate,
      price,
      uid: user.uid,
      athuid,
      iconName,
    });
    batch.commit().then(() => {
      closeItemModal();
    });
  };

  const renderItems = ({ item }) => {
    console.log(item);
    if (item.quantity >= 1) {
      return (
        <View style={styles.userItem}>
          <TouchableHighlight
            onPress={() => {
              toggleItemModal(item);
            }}
            underlayColor="transparent"
          >
            <View style={styles.itemContents}>
              <MaterialCommunityIcons
                name={item.iconName}
                size={32}
                color="#000"
              />
            </View>
          </TouchableHighlight>
          <PostDetailItemModal
            isItemModalVisible={isItemModalVisible}
            onItemBackdropPress={onItemBackdropPress}
            modalName={name}
            modalPrice={price}
            modalIconName={iconName}
            handleGift={handleGift}
          />
        </View>
      );
    } else {
      setHeight(0);
    }
  };

  return (
    <View style={(styles.itemList, { height: itemListHeight })}>
      <FlatList
        data={itemList}
        renderItem={renderItems}
        style={styles.itemListFlat}
        horizontal
      />
    </View>
  );
}

PostDetailItemList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  itemList: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  itemListFlat: {
    width: "100%",
  },
  userItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 64,
    width: 64,
  },
  itemContents: {},
});
