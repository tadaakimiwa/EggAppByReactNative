import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-native';
import { useHeaderHeight } from '@react-navigation/stack';


import ENV from '../../env.json';

import SearchList from '../components/SearchList';
import SearchUserList from '../components/SearchUserList';
import SearchStack from './SearchStack';
import SearchBox from '../elements/SearchBox';
import FakeSearchBox from '../elements/FakeSearchBox';

const client = algoliasearch(
  ENV.ALGOLIA_ID,
  ENV.ALGOLIA_ADMIN_KEY,
);
const index = client.initIndex('dev_EggApp');

const { deviceHeight } = Dimensions.get('window').height;

export default function SearchScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const headerHeight = useHeaderHeight();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onFocus = () => {
    props.navigation.navigate('SearchStack', { headerHeight });
  };

  const header = () => {
    return (
      <FakeSearchBox
        onFocus={onFocus}
        toggleModal={toggleModal}
        navigation={props.navigation}
      />
    );
  };


  const { navigation } = props;
  navigation.setOptions({
    headerTitle: () => header()
  });

  const onBackdropPress = () => {
    setModalVisible(!isModalVisible);
  };

  const [query, setQuery] = useState('');
  const handleQueryChange = (e) => {
    setQuery(e.value);
  };

  return (
    <View style={styles.container}>
      <SearchList navigation={navigation} />
      <Modal
        isVisible={isModalVisible}
        backdropColor="#fff"
        backdropOpacity={1}
        animationInTiming={30}
        coverScreen
        onBackdropPress={onBackdropPress}
        style={{ margin: 0, justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <View style={styles.modalContainer}>
          <InstantSearch
            searchClient={client}
            indexName="dev_EggApp"
          >
            <View style={[styles.modalHeader, { height: headerHeight }]}>
              <SearchBox />
            </View>
            <SearchUserList navigation={navigation} />
            <Text> hey </Text>
          </InstantSearch>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  SearchList: {
    width: '100%',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});
