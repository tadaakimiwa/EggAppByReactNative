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

class AthList extends React.Component {
  renderAth({ item }) {
    const post = item;
    console.log(item);
    return (
      <View style={styles.athListItem}>
        <TouchableHighlight
          onPress={() => { this.props.navigation.navigate('PostDetail', { post }); }}
        >
          <View style={styles.itemImage}>
            <Image
              style={styles.itemImageTitle}
              source={{ uri: post.thumbnailURL }}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.itemComment}>
          <View style={styles.userNamePic}>
            <Image
              style={styles.userNamePicTitle}
              source={{ uri: post.profileImageURL }}
            />
          </View>
          <View style={styles.itemCaption}>
            <Text style={styles.itemCaptionTitle}>
              {post.contentsCaption}
            </Text>
            <Text style={styles.itemCaptionDate}>
              {dateString(post.createdOn)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.athList}>
        <FlatList
          data={this.props.athList}
          renderItem={this.renderAth.bind(this)}
          style={styles.athListFlat}
          numColumns={2}
          horizontal={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  athList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  athListFlat: {
    backgroundColor: '#fff',
    width: '100%',
  },
  athListItem: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 6,
    width: '50%',
  },
  itemImage: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginRight: 12,
    marginLeft: 12,
  },
  itemImageTitle: {
    height: '100%',
    width: '100%',
  },
  itemComment: {
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  userNamePic: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    height: 30,
    width: 30,
    overflow: 'hidden',
  },
  userNamePicTitle: {
    height: 30,
    width: 30,
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

export default AthList;
