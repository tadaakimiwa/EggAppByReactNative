import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class AthIntroCommentList extends React.Component {
  render() {
    return (
      <View style={styles.athIntroCommentList}>
        <View style={styles.athIntroComment}>
          <Text style={styles.athIntroCommentTitle}>
            ・Intro Comment Title
          </Text>
        </View>
        <View style={styles.athIntroComment}>
          <Text style={styles.athIntroCommentTitle}>
            ・Intro Comment Title
          </Text>
        </View>
        <View style={styles.athIntroComment}>
          <Text style={styles.athIntroCommentTitle}>
            ・Intro Comment Title
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  athIntroCommentList: {
    marginBottom: 24,
  },
  athIntroComment: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  athIntroCommentTitle: {
    fontSize: 14,
  },
});

export default AthIntroCommentList;
