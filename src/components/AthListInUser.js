import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';


class AthListInUser extends React.Component {
  renderAth({ item }) {
    const athlete = item;
    const { uid } = athlete;
    return (
      <View style={styles.athListItem}>
        <TouchableHighlight
          onPress={() => { this.props.navigation.navigate('AthDetail', { uid }); }}
        >
          <View style={styles.athImage}>
            <Image
              style={styles.athImageTitle}
              source={{ uri: athlete.profileImageURL }}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.athName}>
          <Text style={styles.athNameTitle}>{athlete.athuid}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.athList}>
        <FlatList
          data={this.props.athList}
          renderItem={this.renderAth.bind(this)}
          style={styles.athListFlat}
          numColumns={3}
          horizontal={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  athList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 18,
  },
  athListFlat: {
    backgroundColor: '#fff',
    width: '100%',
  },
  athListItem: {
    width: '33%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  athImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  athImageTitle: {
    width: '100%',
    height: '100%',
  },
  athName: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aaaf',
  },
  athNameTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    padding: 8,
  },
});

export default AthListInUser;
