import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import AthList from '../../components/AthList';

class AlpineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athList: [],
    };
  }

  UNSAFE_componentWillMount() {
    const db = firebase.firestore();
    db.collectionGroup('posts')
      .where('category', '==', 'Alpine')
      .get()
      .then((querysnapshot) => {
        const athList = [];
        querysnapshot.forEach((doc) => {
          athList.push({ ...doc.data(), key: doc.id });
          console.log(athList);
        });
        this.setState({ athList });
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <AthList athList={this.state.athList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default AlpineScreen;
