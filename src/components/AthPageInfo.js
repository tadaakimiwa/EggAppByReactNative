import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

function returnInfo(info) {
  this.setState({ info });
}

export default function AthPageInfo(props) {
  const { info } = props;
  console.log(info);

  return (
    <View style={styles.athPageInfo}>
      <View style={styles.athInfo}>
        <View style={styles.athProfileImage}>
          <Avatar
            size={84}
            rounded
            title="U"
            source={info.url ? { uri: info.url } : null}
          />
        </View>
        <View style={styles.athInfoContent}>
          <Text style={styles.athInfoContentTitle}>
            {info.firstname}
          </Text>
        </View>
        <View style={styles.athInfoContent}>
          <Text style={styles.athInfoContentTitle}>
            {info.lastname}
          </Text>
        </View>
        <View style={styles.athAge}>
          <Text style={styles.athAgeTitle}>
            age:
            {info.age}
          </Text>
        </View>
      </View>
      <View style={styles.userEdit}>
        <TouchableHighlight
          style={styles.userEditButton}
          onPress={() => { props.navigation.navigate('AthEdit', { info, returnInfo: returnInfo.bind(this) }); }}
        >
          <Text style={styles.userEditTitle}>
            Edit your athlete Infomation
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.userEdit}>
        <TouchableHighlight
          style={styles.userEditButton}
          onPress={() => { props.navigation.navigate('AthUploading'); }}
        >
          <Text style={styles.userEditTitle}>
            Post new Video
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.athIntroVideo}>
        <Text style={styles.athIntroVideoTitle}>
          紹介ビデオ、オンプレスで流れる
        </Text>
      </View>
      <View style={styles.athIntroCommentList}>
        <View style={styles.athIntroComment}>
          <Text style={styles.athIntroCommentTitle}>
            {info.intro1}
          </Text>
        </View>
        <View style={styles.athIntroComment}>
          <Text style={styles.athIntroCommentTitle}>
            {info.intro2}
          </Text>
        </View>
        <View style={styles.athIntroComment}>
          <Text style={styles.athIntroCommentTitle}>
            {info.intro3}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  athPageInfo: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
  },
  athInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userEdit: {
    alignItems: 'center',
    marginBottom: 5,
  },
  userEditButton: {
    borderWidth: 0.5,
    borderColor: '#2DCCD3',
    padding: 3,
  },
  userEditTitle: {
    color: '#2DCCD3',
  },
  athInfoContent: {
    marginTop: 32,
    paddingLeft: 12,
  },
  athInfoContentTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  athProfileImage: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 42,
    height: 84,
    width: 84,
    overflow: 'hidden',
  },
  athProfileImageTitle: {
    height: 84,
    width: 84,
  },
  athAge: {
    marginTop: 38,
    paddingLeft: 8,
  },
  athAgeTitle: {
    fontSize: 14,
    color: '#fff',
  },
  athIntroVideo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 12,
  },
  athIntroCommentList: {
    marginBottom: 24,
  },
  athIntroComment: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  athIntroCommentTitle: {
    fontSize: 14,
    color: '#fff',
  },
});
