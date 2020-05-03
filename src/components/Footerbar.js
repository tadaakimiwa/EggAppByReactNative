import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import fontAwesome from '../../assets/fonts/fa-solid-900.ttf';

const CustomIcon = createIconSet({
  Home: '\uf015',
  Search: '\uf002',
  Alert: '\uf0f3',
  User: '\uf007',
}, 'FontAwesome');

class Footerbar extends React.Component {
  state  = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: fontAwesome,
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.footerbar}>
        <View style={styles.footerList}>
          <View style={styles.footerListItem}>
            {
              this.state.fontLoaded ? (
                <CustomIcon name="Home" style={styles.footerListItemTitle} />
              ) : null
            }
          </View>

          <View style={styles.footerListItem}>
            {
              this.state.fontLoaded ? (
                <CustomIcon name="Search" style={styles.footerListItemTitle} />
              ) : null
            }
          </View>

          <View style={styles.footerListItem}>
            {
              this.state.fontLoaded ? (
                <CustomIcon name="Alert" style={styles.footerListItemTitle} />
              ) : null
            }
          </View>

          <View style={styles.footerListItem}>
            {
              this.state.fontLoaded ? (
                <CustomIcon name="User" style={styles.footerListItemTitle} />
              ) : null
            }
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
    backgroundColor: '#141414',
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
    fontFamily: 'FontAwesome',
  },
  footerListItemTitle: {
    fontSize: 24,
    color: '#eee',
  },
});

export default Footerbar;
