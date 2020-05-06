import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserEdit from '../components/UserEdit';

class UserEditScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UserEdit />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default UserEditScreen;
