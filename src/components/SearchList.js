import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class SearchList extends React.Component {
  render() {
    return (
      <View style={styles.searchList}>
        <View style={styles.searchListItem}>
          <View style={styles.itemImage}>
            <Text style={styles.itemImageTitle}>
              Image
            </Text>
          </View>
          <View style={styles.itemComment}>
            <View style={styles.itemUser}>
              <Text style={styles.itemUserImage}>
                Pic
              </Text>
            </View>
            <View style={styles.itemCaption}>
              <Text style={styles.itemCaptionTitle}>
                Title
              </Text>
              <Text style={styles.itemCaptionDate}>
                2020/05/03
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.searchListItem}>
          <View style={styles.itemImage}>
            <Text style={styles.itemImageTitle}>
              Image
            </Text>
          </View>
          <View style={styles.itemComment}>
            <View style={styles.itemUser}>
              <Text style={styles.itemUserImage}>
                Pic
              </Text>
            </View>
            <View style={styles.itemCaption}>
              <Text style={styles.itemCaptionTitle}>
                Title
              </Text>
              <Text style={styles.itemCaptionDate}>
                2020/05/03
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.searchListItem}>
          <View style={styles.itemImage}>
            <Text style={styles.itemImageTitle}>
              Image
            </Text>
          </View>
          <View style={styles.itemComment}>
            <View style={styles.itemUser}>
              <Text style={styles.itemUserImage}>
                Pic
              </Text>
            </View>
            <View style={styles.itemCaption}>
              <Text style={styles.itemCaptionTitle}>
                Title
              </Text>
              <Text style={styles.itemCaptionDate}>
                2020/05/03
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchList: {
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchListItem: {
    width: '49%',
  },
  itemImage: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginRight: 10,
    marginLeft: 10,
  },
  itemComment: {
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  itemUser: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemUserImage: {
    fontSize: 10,
  },
  itemCaption: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  itemCaptionTitle: {
    fontSize: 14,
  },
  itemCaptionDate: {
    fontSize: 8,
  },
});

export default SearchList;
