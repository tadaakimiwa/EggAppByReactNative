import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserEdit from '../components/UserEdit';
import CircleButton from '../elements/CircleButton';

class UserEditScreen extends React.Component {
  state = {

  }

  /* handlePress = {
    db.collection(Users).doc(username).set({
      profile:
    })
    .then(() => {
      console.log('Success!!');
    })
    .catch((error) => {
      console.log('Failed.....', error)
    })
  } */

  render() {
    return (
      <View style={styles.container}>
        <UserEdit />
        <CircleButton name="check" onPress={this.handlePress.bind(this)}/>
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
