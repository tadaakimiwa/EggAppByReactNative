import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchList from '../../components/SearchList';

class CrossCountryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchList />
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

export default CrossCountryScreen;
