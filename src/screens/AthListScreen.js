import React from 'react';
import { StyleSheet, View } from 'react-native';

import AthList from '../components/AthList';

class AthListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AthList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default AthListScreen;
