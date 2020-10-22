import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";

import AthDetailInfo from "./AthDetailInfo";

export default function AthPostList(props) {
  const renderPost = ({ item }) => {
    const post = item;
    const postid = post.key;
    const uid = post.uploader;
    return (
      <View style={styles.athPostListItem}>
        <TouchableHighlight
          onPress={() => {
            props.navigation.navigate("PostDetail", { postid, uid });
          }}
        >
          <Image
            style={styles.postImageTitle}
            source={{ uri: post.thumbnailURL }}
          />
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={styles.postList}>
      <FlatList
        data={props.postList}
        renderItem={renderPost}
        style={styles.postListFlat}
        numColumns={2}
        horizontal={false}
        ListHeaderComponent={
          <AthDetailInfo info={props.info} button={props.button} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: "center",
  },
  postListFlat: {
    width: "100%",
    height: "100%",
  },
  athPostListItem: {
    width: "50%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  postImageTitle: {
    width: 180,
    height: 150,
  },
});
