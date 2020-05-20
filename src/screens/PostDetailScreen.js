import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  YellowBox,
} from 'react-native';
import { Video } from 'expo-av';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const dateString = async (date) => {
  const str = await date.toDate().toISOString();
  return str.split('T')[0];
};

class PostDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const { post } = this.props.route.params;
    this.setState({ post });
    console.log(this.props.route.params.post);
  }

  render() {
    const { post } = this.state;
    const { uploader } = post;
    return (
      <View style={styles.container}>
        <View style={styles.video}>
          <Video
            source={{ uri: post.postVideoURL }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            shouldPlay
            isLooping
            style={{ width: 300, height: 300 }}
            posterSource={{ uri: post.thumbnailURL }}
            usePoster="true"
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
                Uploaded: 2012-10-9
              </Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => { this.props.navigation.navigate('AthDetail', { uploader }); }}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
