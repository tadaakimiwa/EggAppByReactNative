import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

class FollowingAlertList extends React.Component {
  render() {
    return (
      <View style={styles.followingList}>
        <TouchableHighlight onPress={() => {}}>
          <View style={styles.followingItem}>
            <View style={styles.followingItemIcon}>
              <Text style={styles.followingItemIconTitle}>I</Text>
            </View>
            <View style={styles.followingItemBody}>
              <Text style={styles.followingItemBodyTitle}>
                TestTestTestTestTestTestTestTestTest
              </Text>
              <Text style={styles.followingItemDate}>2020/10/22</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {}}>
          <View style={styles.followingItem}>
            <View style={styles.followingItemIcon}>
              <Text style={styles.followingItemIconTitle}>I</Text>
            </View>
            <View style={styles.followingItemBody}>
              <Text style={styles.followingItemBodyTitle}>
                TestTestTestTestTestTestTestTestTest
              </Text>
              <Text style={styles.followingItemDate}>2020/10/22</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {}}>
          <View style={styles.followingItem}>
            <View style={styles.followingItemIcon}>
              <Text style={styles.followingItemIconTitle}>I</Text>
            </View>
            <View style={styles.followingItemBody}>
              <Text style={styles.followingItemBodyTitle}>
                TestTestTestTestTestTestTestTestTest
              </Text>
              <Text style={styles.followingItemDate}>2020/10/22</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  followingList: {
    width: "100%",
  },
  followingItem: {
    height: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  followingItemIcon: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  followingItemBody: {
    justifyContent: "center",
  },
  followingItemBodyTitle: {
    fontSize: 14,
  },
  followingItemDate: {
    fontSize: 8,
  },
});

export default FollowingAlertList;
