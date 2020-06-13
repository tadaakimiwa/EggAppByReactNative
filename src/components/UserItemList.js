import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

export default function UserItemList({ itemList }) {
  const renderShopItem = ({ item }) => {
    const post = item;
    console.log(item);
    return (
      <View style={styles.userItem}>
        <Text>hey</Text>
      </View>
    );
  }

  return (
    <View style={styles.athList}>
      <FlatList
        data={itemList}
        renderItem={renderShopItem}
        style={styles.athListFlat}
        ListEmptyComponent={(
          <View>
            <Text>Go Shop to Get some Item</Text>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  athList: {
    width: '100%',
    flexDirection: 'row',
  },
  athListFlat: {
    width: '100%',
  },
  athListItem: {
    marginTop: 12,
    marginBottom: 24,
    width: 320,
    height: 280,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  itemImage: {
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  itemImageTitle: {
    height: '100%',
    width: '100%',
  },
  itemComment: {
    marginTop: 12,
    marginLeft: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    alignItems: 'center',
    width: 320,
    height: 100,
  },
  userNamePic: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 32,
    height: 64,
    width: 64,
    overflow: 'hidden',
  },
  userNamePicTitle: {
    height: 64,
    width: 64,
  },
  itemCaption: {

    paddingLeft: 18,
  },
  itemCaptionTitle: {
    fontSize: 18,
  },
  itemCaptionDate: {
    fontSize: 12,
  },
});
