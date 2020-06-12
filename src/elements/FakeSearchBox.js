
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

function FakeSearchBox({ handleQueryChange, toggleModal, onFocus }) {
  const openSearchUserList = () => {
    return (
      <SearchUserList />
    );
  };

  const openModal = () => {
    return toggleModal();
  };

  return (
    <TextInput
      style={styles.input}
      onFocus={openModal}
      placeholder=""
    />
  );
}

FakeSearchBox.propTypes = {
  toggleModal: PropTypes.func.isRequired,
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

export default FakeSearchBox;
