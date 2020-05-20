import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';

class AthPostList extends React.Component {
  renderPost({ item }) {
    const post = item;
    const postid = post.key;
    const uid = post.uploader;
    return (
      <View style={styles.athPostListItem}>
        <TouchableHighlight
          onPress={() => { this.props.navigation.navigate('PostDetail', { postid, uid }); }}
        >
          <Image
            style={styles.postImageTitle}
            source={{ uri: post.thumbnailURL }}
          />
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.postList}>
        <FlatList
          data={this.props.postList}
          renderItem={this.renderPost.bind(this)}
          style={styles.postListFlat}
          numColumns={2}
          horizontal={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  athPostList: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  athPostListItem: {
    width: '50%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  postImageTitle: {
    width: 180,
    height: 150,
  },
});

export default AthPostList;
