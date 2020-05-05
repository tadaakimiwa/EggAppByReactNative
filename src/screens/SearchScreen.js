import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchList from '../components/SearchList';

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchList navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  SearchList: {
    width: '100%',
  },
});

export default SearchScreen;
