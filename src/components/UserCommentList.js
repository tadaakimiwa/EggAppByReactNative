import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NeumoBuyButton from '../elements/NeumoBuyButton';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return `${str.split('T')[0]} ${str.split('T')[1].substr(0, 8)}`;
};

export default function UserCommentList({ commentList, navigation }) {
  const goBack = () => {
    navigation.navigate('main');
  };

  const goPostDetail = (postid) => {
    navigation.navigate('PostDetail', { postid })
  }

  const renderComment = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.commentItem}>
        <TouchableHighlight
          onPress={goPostDetail}
          underlayColor="transparent"
        >
          <View style={styles.itemContents}>
            <View style={styles.athuidAndTime}>
              <View style={styles.itemAthName}>
                <Text style={styles.itemAthNameTo}>
                  To
                </Text>
                <Text style={styles.itemAthNameTitle}>
                  {item.athuid}
                </Text>
              </View>
              <View style={styles.itemTime}>
                <Text style={styles.itemTimeTitle}>
                  {dateString(item.createdOn)}
                </Text>
              </View>
            </View>
            <View style={styles.commentContents}>
              <Text style={styles.commentContentsTitle}>
                {item.commentContents}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={styles.commentList}>
      <FlatList
        data={commentList}
        renderItem={renderComment}
        style={styles.commentListFlat}
        numColumns={1}
        horizontal={false}
        scrollEnabled
      />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  commentList: {
    width: '100%',
  },
  commentListFlat: {
    width: '100%',
  },
  commentItem: {
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  itemContents: {
    width: '100%',
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 12,
  },
  athuidAndTime: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemAthName: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemAthNameTo: {
    fontSize: 16,
  },
  itemAthNameTitle: {
    paddingLeft: 2,
    fontSize: 16,
  },
  itemTime: {
    paddingLeft: 6,
  },
  itemTimeTitle: {
    fontSize: 16,
  },
  commentContents: {

  },
  commentContentsTitle: {
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  footerButtonTitle: {
    fontSize: 12,
  },
});
