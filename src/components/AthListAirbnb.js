import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split("T")[0];
};

export default function AthListAirbnb(props) {
  const [refreshing, setRefreshing] = useState(false);
  const fetchItems = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    props.getData();
    setRefreshing(false);
  }, [refreshing]);

  const renderAth = ({ item }) => {
    const post = item;
    const postid = post.key;
    const uid = post.uploader;
    console.log("Hey!", postid, uid);
    return (
      <View style={styles.athListItem}>
        <TouchableHighlight
          onPress={() => {
            props.navigation.navigate("PostDetail", { postid, uid });
          }}
          underlayColor="transparent"
        >
          <View>
            <View style={styles.itemImage}>
              <Image
                style={styles.itemImageTitle}
                source={{ uri: item.thumbnailURL }}
              />
            </View>
            <View style={styles.itemComment}>
              <View style={styles.userNamePic}>
                <Image
                  style={styles.userNamePicTitle}
                  source={{ uri: item.profileImageURL }}
                />
              </View>
              <View style={styles.itemCaption}>
                <Text style={styles.itemCaptionTitle}>
                  {item.contentsCaption}
                </Text>
                <Text style={styles.itemCaptionDate}>
                  {dateString(item.createdOn)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  return (
    <View style={styles.athList}>
      <FlatList
        data={props.athList}
        renderItem={renderAth}
        style={styles.athListFlat}
        refreshing={refreshing}
        onRefresh={fetchItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  athList: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    shadowColor: "#a1a1a1",
    shadowOffset: { width: 1, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 7,
  },
  athListFlat: {
    width: "100%",
  },
  athListItem: {
    marginTop: 12,
    marginBottom: 24,
    width: 320,
    height: 280,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  itemImage: {
    justifyContent: "center",
    alignItems: "center",
    height: 180,
  },
  itemImageTitle: {
    height: "100%",
    width: "100%",
  },
  itemComment: {
    marginTop: 12,
    marginLeft: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    alignItems: "center",
    width: 320,
    height: 100,
  },
  userNamePic: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 32,
    height: 64,
    width: 64,
    overflow: "hidden",
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
