import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.appbar}>
        <View>
          <Text style={styles.appbarTitle}>EggApp</Text>
        </View>
      </View>

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
  appbar: {
    position: 'absolute',
    top: 0,
    height: 78,
    paddingTop: 30,
    backgroundColor: '#141414',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 10,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
  },
  footerbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    paddingTop: 30,
    backgroundColor: '#eee',
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
