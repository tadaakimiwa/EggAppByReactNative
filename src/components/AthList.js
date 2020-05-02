import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class AthList extends React.Component {
  render() {
    return (
      <View style={styles.athList}>
        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>

        <View style={styles.athListItem}>
          <View style={styles.athTab}>
            <View style={styles.athImage}>
              <Text style={styles.athImageTitle}>Image</Text>
            </View>
            <View style={styles.athName}>
              <Text style={styles.athNameTitle}>Name</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  athList: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  athListItem: {
    padding: 16,
    width: '33%',
    height: '28%',
    alignItems: 'center',
  },
  athTab: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  athImage: {
    height: '80%',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  athImageTitle: {
    fontSize: 18,
  },
  athName: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  athNameTitle: {
    fontSize: 14,
  },
});

export default AthList;
