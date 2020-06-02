import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';

import UserInfo from './UserInfo';
import NeumoAthListInUser from '../elements/NeumoAthListInUser';

class AthListInUser extends React.Component {
  renderAth({ item }) {
    const athlete = item;
    const { uid } = athlete;
    return (
      <View style={styles.athListItem}>
        <View style={styles.athListItemTab}>
          <NeumoAthListInUser
            athlete={athlete}
            uid={uid}
            navigation={this.props.navigation}
          />
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
          ListHeaderComponent={(
            <UserInfo
              info={this.props.info}
              button={this.props.button}
              followingNum={this.props.followingNum}
              commentsNum={this.props.commentsNum}
              onPressFollowing={this.props.onPressFollowing}
              onPressEdit={this.props.onPressEdit}
            />
          )}
          ListHeaderComponentStyle={{
            width: '100%',
          }}
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
  },
  userInfo: {
    width: '100%',
  },
  athListFlat: {
    backgroundColor: '#f7f7f7',
    width: '100%',
  },
  athListItem: {
    width: '33%',
  },
  athListItemTab: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 36,
  },
  athImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 120,
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
    fontWeight: '300',
    color: '#fff',
    padding: 8,
  },
});

export default AthListInUser;
