import React from 'react';
import { StyleSheet, View } from 'react-native';

import Appbar from './src/components/Appbar';
import UserPageScreen from './src/screens/UserPageScreen';
import Footerbar from './src/components/Footerbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Appbar />
      <UserPageScreen />
      <Footerbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 78,
  },

});
