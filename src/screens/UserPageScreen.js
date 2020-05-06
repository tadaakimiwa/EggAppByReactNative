import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserInfo from '../components/UserInfo';
import AthList from '../components/AthList';

class UserPageScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <UserInfo style={styles.userInfo} navigation={this.props.navigation}/>

        <AthList style={styles.athList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  userInfo: {
    width: '100%',
  },
  athList: {
    height: '100%',
  },
});

export default UserPageScreen;
