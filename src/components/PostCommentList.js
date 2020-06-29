import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList
} from 'react-native';
import { Avatar } from 'react-native-elements';

import PostCommentInput from './PostCommentInput';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

export default function PostCommentList(props) {
  const renderComment = ({ item }) => {
    const comment = item;
    const commentid = comment.key;
    const uid = comment.commenter;
    console.log(item);
    return (
      <View style={styles.commentListItem}>
        <View style={styles.userPic}>
          <Avatar
            size={36}
            rounded
            title="U"
            source={comment.profileImageURL ? { uri: comment.profileImageURL } : null}
          />
        </View>
        <View style={styles.commentInfo}>
          <View style={styles.commentInfoUpper}>
            <View style={styles.commenter}>
              <Text style={styles.commenterTitle}>
                {comment.username}
              </Text>
            </View>
            <View style={styles.commentDate}>
              <Text style={styles.commentDateTitle}>
                {dateString(comment.updatedOn)}
              </Text>
            </View>
          </View>
          <View style={styles.commentInfoLower}>
            <View style={styles.commentContents}>
              <Text style={styles.commentContentsTitle}>
                {comment.commentContents}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const { post } = props;

  return (
    <View style={styles.PostCommentList}>
      <FlatList
        data={props.commentList}
        renderItem={renderComment}
        style={styles.commentListFlat}
        numColumns={1}
        horizontal={false}
        ListFooterComponent={(
          <PostCommentInput
            uploader={post.uploader}
            postid={post.postid}
            username={props.username}
            userProfileURL={props.userProfileURL}
            athuid={post.athuid}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentListItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  commentInfo: {
    paddingLeft: 12,
  },
  commentInfoUpper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commenterTitle: {
    fontSize: 14,
    fontWeight: '300',
  },
  commentDate: {
    paddingLeft: 12,
  },
  commentDateTitle: {
    fontSize: 14,
    fontWeight: '300',
  },
  commentContentsTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});
