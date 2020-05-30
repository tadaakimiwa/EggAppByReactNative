import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';

const { width, height } = Dimensions.get('window');

export default function VideoContents(props) {
  const uri = props.uri ? { uri: props.uri } : null;
  return (
    <View style={[styles.video, { height: height / 5 }]}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          source: { uri: props.uri },
          rate: 1.0,
          volume: 1.0,
          isMuted: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          isLooping: true,
          posterSource: {
            uri: props.posteruri,
          },
          usePoster: true,
        }}
        videoBackground="transparent"
        inFullscreen
        width={width}
        height={height / 5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 5,
    alignItems: 'center',
  },
});
