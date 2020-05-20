import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

import UserItemList from '../../components/UserItemList';

class UserItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemList: [],
    };
  }

  // itemのfirebase 未
  componentDidMount() {
    const db = firebase.firestore();
    db.collectionGroup('posts')
      .where('category', '==', 'Cross Country')
      .get()
      .then((querysnapshot) => {
        const itemList = [];
        querysnapshot.forEach((doc) => {
          itemList.push({ ...doc.data(), key: doc.id });
          console.log(itemList);
        });
        this.setState({ itemList });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <UserItemList itemList={this.state.itemList} navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default UserItemScreen;
