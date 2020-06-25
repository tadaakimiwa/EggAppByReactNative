import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import AthListAirbnb from '../../components/AthListAirbnb';

export default function AlpineScreen(props) {
  const [athList, setAthList] = useState([]);

  const getData = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collectionGroup('posts')
      .where('category', '==', 'Alpine')
      .get()
      .then((querysnapshot) => {
        const list = [];
        querysnapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
          console.log(list);
        });
        setAthList(list);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <AthListAirbnb
        athList={athList}
        navigation={props.navigation}
        getData={getData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 12,
    backgroundColor: '#f7f7f7',
  },
});
