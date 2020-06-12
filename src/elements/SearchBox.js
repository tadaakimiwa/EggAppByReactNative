
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connectSearchBox } from 'react-instantsearch-native';
import PropTypes from 'prop-types';

import SearchUserList from '../components/SearchUserList';

function SearchBox({ currentRefinement, isSearchStalled, refine }) {
  const openSearchUserList = () => {
    return (
      <SearchUserList />
    );
  };

  return (
    <TextInput
      style={styles.input}
      value={currentRefinement}
      onChangeText={(value) => refine(value)}
      placeholder=""
    />
  );
}

SearchBox.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    fontSize: 12,
    width: 200,
    backgroundColor: '#fff',
  },
});

export default connectSearchBox(SearchBox);
