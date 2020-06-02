import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

import AthPageInfo from './AthPageInfo';

const imageWidth = Dimensions.get('window').width;

export default function AthPostList(props) {

  const renderPost = ({ item }) => {
    const post = item;
    const postid = post.key;
    const uid = post.uploader;
    return (
      <View style={styles.athPostListItem}>
        <TouchableHighlight
          onPress={() => { props.navigation.navigate('PostDetail', { postid, uid }); }}
        >
          <Image
            style={styles.postImageTitle}
            source={{ uri: post.thumbnailURL }}
          />
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={styles.postList}>
      <FlatList
        data={props.postList}
        renderItem={renderPost}
        style={styles.postListFlat}
        numColumns={2}
        horizontal={false}
        scrollEnabled
        ListHeaderComponent={(
          <AthPageInfo
            info={props.info}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  athPostListItem: {
    width: imageWidth * 0.5,
    height: imageWidth * 0.3,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  postImageTitle: {
    width: imageWidth * 0.5,
    height: imageWidth * 0.3,
  },
});
