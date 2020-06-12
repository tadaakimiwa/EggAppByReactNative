import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';

function SearchUserList({ navigation, hits, hasMore, refine }) {
  const renderSearch = ({ item }) => {
    const athlete = item;
    const { uid } = athlete;
    console.log(item);
    return (
      <View style={styles.searchListItem}>
        <TouchableHighlight
          onPress={() => { navigation.navigate('AthDetail', { uid }); }}
        >
          <View style={styles.itemContents}>
            <View style={styles.itemImage}>
              <Image
                style={styles.itemImageTitle}
                source={{ uri: athlete.profileImageURL }}
              />
            </View>
            <View style={styles.itemAthuid}>
              <Text style={styles.itemAthuidTitle}>
                {athlete.athuid}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={styles.searchList}>
      <FlatList
        data={hits}
        keyExtractor={(item) => item.objectID}
        onEndReached={() => hasMore && refine()}
        renderItem={renderSearch}
        style={styles.searchListFlat}
        numColumns={1}
        horizontal={false}
      />
    </View>
  );
}

SearchUserList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  searchList: {
    width: '100%',
  },
  searchListFlat: {
    backgroundColor: '#fff',
    width: '100%',
  },
  searchListItem: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 6,
  },
  itemContents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemImage: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    overflow: 'hidden',
  },
  itemImageTitle: {
    height: 36,
    width: 36,
  },
  itemAthuid: {
    padding: 5,
  },
  itemAthuidTitle: {
    color: '#000',
    fontSize: 18,
  },
});

export default connectInfiniteHits(SearchUserList);
