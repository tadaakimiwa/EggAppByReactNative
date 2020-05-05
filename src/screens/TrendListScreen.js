import React from 'react';
import { StyleSheet, View } from 'react-native';

import TrendList from '../components/TrendList';

class TrendListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TrendList style={styles.trendList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  trendList: {
    width: '100%',
  },
});

export default TrendListScreen;
