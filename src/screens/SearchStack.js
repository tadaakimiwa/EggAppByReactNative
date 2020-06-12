import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-native';
import PropTypes from 'prop-types';

import ENV from '../../env.json';
import SearchUserList from '../components/SearchUserList';
import SearchBox from '../elements/SearchBox';

const client = algoliasearch(
  ENV.ALGOLIA_ID,
  ENV.ALGOLIA_ADMIN_KEY,
);

function SearchStack(props) {
  const { headerHeight } = props.route.params;

  return (
    <View style={styles.searchModal}>
      <InstantSearch
        searchClient={client}
        indexName="dev_EggApp"
      >
        <View style={[styles.headerbar, { height: headerHeight }]}>
          <SearchBox />
        </View>
        <SearchUserList navigation={props.navigation} />
        <Text> hey </Text>
      </InstantSearch>
    </View>
  );
}

SearchStack.propTypes = {
};

const styles = StyleSheet.create({
  searchModal: {
    flex: 1,
    width: '100%',
  },
  modalContainer: {
    width: '100%',
  },
});

export default SearchStack;
