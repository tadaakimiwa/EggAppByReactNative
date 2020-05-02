import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Footerbar extends React.Component {
  render() {
    return (
      <View style={styles.footerbar}>
        <View style={styles.footerList}>
          <View style={styles.footerListItem}>
            <Text style={styles.footerListItemTitle}>Home</Text>
          </View>

          <View style={styles.footerListItem}>
            <Text style={styles.footerListItemTitle}>Search</Text>
          </View>

          <View style={styles.footerListItem}>
            <Text style={styles.footerListItemTitle}>Alert</Text>
          </View>

          <View style={styles.footerListItem}>
            <Text style={styles.footerListItemTitle}>My Page</Text>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    paddingTop: 30,
    backgroundColor: '#eee',
    zIndex: 10,
  },
  footerList: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footerListItem: {
    width: '25%',
    alignItems: 'center',
  },
});

export default Footerbar;
