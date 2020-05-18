import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Video from 'react-native-video';

class AthPostList extends React.Component {
  render() {
    return (
      <View style={styles.athPostList}>
        <View style={styles.athPostListItem}>
          <Text>
            posted
          </Text>
        </View>
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
  },
});

export default AthPostList;
