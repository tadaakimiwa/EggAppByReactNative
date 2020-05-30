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

class FollowingList extends React.Component {
  renderFollow({ item }) {
    const athlete = item;
    const { uid } = athlete;
    console.log(item);
    return (
      <View style={styles.followListItem}>
        <TouchableHighlight
          onPress={() => { this.props.navigation.navigate('AthDetail', { uid }); }}
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
  }

  render() {
    return (
      <View style={styles.followList}>
        <FlatList
          data={this.props.followList}
          renderItem={this.renderFollow.bind(this)}
          style={styles.followListFlat}
          numColumns={1}
          horizontal={false}
        />
      </View>
    )
  }
}

FollowingList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  followList: {
    width: '100%',
  },
  followListFlat: {
    backgroundColor: '#fff',
    width: '100%',
  },
  followListItem: {
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

export default FollowingList;
