import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import AthListAirbnb from '../../components/AthListAirbnb';

class CrossCountryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athList: [],
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collectionGroup('posts')
      .where('category', '==', 'Cross Country')
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

  render() {
    return (
      <View style={styles.container}>
        <AthListAirbnb athList={this.state.athList} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
    backgroundColor: '#efefef',
  },
});

export default CrossCountryScreen;
