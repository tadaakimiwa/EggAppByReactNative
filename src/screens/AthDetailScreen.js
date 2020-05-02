import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AthIntroCommentList from '../components/AthIntroCommentList';
import AthPostList from '../components/AthPostList';

class AthDetailScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.athIntroVideo}>
          <Text style={styles.athIntroVideoTitle}>
            紹介ビデオ、オンプレスで流れる
          </Text>
        </View>
        <AthIntroCommentList />
        <AthPostList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
  },
  athIntroVideo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 24,
  },
});

export default AthDetailScreen;
