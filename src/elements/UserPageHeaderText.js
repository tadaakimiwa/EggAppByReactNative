import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function UserPageHeaderText(username) {
  return (
    <View>
      <Text style={styles.text}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#DDD',
    backgroundColor: '#eee',
  },
});
