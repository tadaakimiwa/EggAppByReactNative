import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class TrendList extends React.Component {
  render() {
    return (
      <View style={styles.trendList}>

        <View style={styles.trendItem}>
          <View style={styles.trendItemIcon}>
            <Text style={styles.trendItemIconTitle}>I</Text>
          </View>
          <View style={styles.trendItemBody}>
            <Text style={styles.trendItemBodyTitle}>
              TestTestTestTestTestTestTestTestTest
            </Text>
            <Text style={styles.trendItemDate}>2020/5/02</Text>
          </View>
        </View>

        <View style={styles.trendItem}>
          <View style={styles.trendItemIcon}>
            <Text style={styles.trendItemIconTitle}>I</Text>
          </View>
          <View style={styles.trendItemBody}>
            <Text style={styles.trendItemBodyTitle}>
              TestTestTestTestTestTestTestTestTest
            </Text>
            <Text style={styles.trendItemDate}>2020/5/02</Text>
          </View>
        </View>

        <View style={styles.trendItem}>
          <View style={styles.trendItemIcon}>
            <Text style={styles.trendItemIconTitle}>I</Text>
          </View>
          <View style={styles.trendItemBody}>
            <Text style={styles.trendItemBodyTitle}>
              TestTestTestTestTestTestTestTestTest
            </Text>
            <Text style={styles.trendItemDate}>2020/5/02</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  trendList: {
    width: '100%',
  },
  trendItem: {
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  trendItemIcon: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  trendItemBody: {
    justifyContent: 'center',
  },
  trendItemBodyTitle: {
    fontSize: 14,
  },
  trendItemDate: {
    fontSize: 8,
  },
});

export default TrendList;
