import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  YellowBox,
} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from 'firebase';

import PostVideoModal from './PostVideoModal';
import PostCommentList from '../components/PostCommentList';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

class PostDetailScreen extends React.Component {
  static navigationOptions = {
    headerRight: () => (
      <Button
        icon={(
          <MaterialCommunityIcons
            name="menu"
            size={15}
            color="black"
          />
        )}
        color="black"
        onPress={() => {}}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      postVideoURL: '',
      thumbnailURL: '',
      contentsCaption: '',
      updatedOn: '',
      uploader: '',
      contentsInfo: '',
      url: '',
      isModalVisible: false,
      postid: '',
      uid: '',
      commentList: [],
    };
  }

  componentDidMount() {
    const { postid } = this.props.route.params;
    const { uid } = this.props.route.params;
    console.log(this.props.route.params.postid);
    const db = firebase.firestore();
    const docRef = db.collection(`users/${uid}/posts`).doc(`${postid}`);
    const commentRef = db.collection(`users/${uid}/posts/${postid}/comments`);

    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const url = doc.data().profileImageURL;
        const { postVideoURL } = doc.data();
        const { thumbnailURL } = doc.data();
        const { contentsCaption } = doc.data();
        const { contentsInfo } = doc.data();
        const { updatedOn } = doc.data();
        const { uploader } = doc.data();
        this.setState({
          url,
          postVideoURL,
          thumbnailURL,
          contentsCaption,
          contentsInfo,
          updatedOn: dateString(updatedOn),
          uid,
          postid,
          uploader,
        });
        console.log(this.state.updatedOn);
      } else {
        console.log('No such document!');
      }
    });

    commentRef.onSnapshot((snapshot) => {
      const commentList = [];
      snapshot.forEach((doc) => {
        commentList.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ commentList });
    });
  }

  toggleModal() {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }

  render() {
    const post = {
      postVideoURL: this.state.postVideoURL,
      thumbnailURL: this.state.thumbnailURL,
      contentsCaption: this.state.contentsCaption,
      contentsInfo: this.state.contentsInfo,
      updatedOn: this.state.updatedOn,
      profileImageURL: this.state.url,
      uid: this.state.uid,
      postid: this.state.postid,
      uploader: this.state.uploader,
    };
    const info = {
      constentsCaption: post.constentsCaption,
      contentsInfo: post.constentsInfo,
      thumbnailURL: post.thumbnailURL,
    };

    return (
      <View style={styles.container}>
        <View style={styles.video}>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              source: {
                uri: post.postVideoURL,
              },
              rate: 1.0,
              volume: 1.0,
              isMuted: false,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              isLooping: true,
              posterSource: {
                uri: post.thumbnailURL,
              },
              usePoster: true,
            }}
            videoBackground="transparent"
            inFullscreen={false}
            width={300}
            height={300}
          />
        </View>
        <View style={styles.videoInfo}>
          <View style={styles.videoBar}>
            <View style={styles.videoCaption}>
              <Text style={styles.videoCaptionTitle}>
                {post.contentsCaption}
              </Text>
            </View>
            <View style={styles.videoDate}>
              <Text style={styles.videoDateTitle}>
                {post.updatedOn}
              </Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => { this.props.navigation.navigate('AthDetail', { uid: post.uid }); }}
          >
            <View style={styles.videoUserBar}>
              <View style={styles.videoUploader}>
                <Image
                  style={styles.videoUploaderImage}
                  source={{ uri: post.profileImageURL }}
                />
              </View>
              <View style={styles.videoUploaderName}>
                <Text style={styles.videoUploaderNameTitle}>
                  Name
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <PostCommentList
          post={post}
          commentList={this.state.commentList}
        />
        <PostVideoModal
          post={post}
          navigation={this.props.navigation}
          onPress={() => this.props.navigation.navigate('PostEdit', { info })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 300,
    zIndex: 5,
    alignItems: 'center',
  },
  videoUploader: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 36,
    height: 72,
    width: 72,
    overflow: 'hidden',
  },
  videoUploaderImage: {
    height: 72,
    width: 72,
  },
  videoInfo: {
    paddingTop: 300,
    backgroundColor: '#fff',
  },
  videoBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
  },
  videoCaptionTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
  videoDateTitle: {
    fontSize: 12,
  },
  videoUserBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  videoUploaderName: {
    justifyContent: 'center',
    paddingLeft: 24,
  },
  videoUploaderNameTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default PostDetailScreen;
