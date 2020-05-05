import React from 'react';
import { StyleSheet, View } from 'react-native';

import FollowingList from '../components/FollowingList';

class FollowingListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FollowingList style={styles.followingList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  followingList: {
    width: '100%',
  },
});

export default FollowingListScreen;
