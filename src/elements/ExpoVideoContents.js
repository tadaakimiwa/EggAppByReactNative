import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

export default function ExpoVideoContents(props) {
  const [shouldPlay, setShouldPlay] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        setShouldPlay(false);
      }
      return () => {
        unsubscribe();
      }
    }, [props.navigation])
  );

  return (
    <View style={[styles.video, { width, height: width * 0.6, backgroundColor: 'black' }]}>
      <Video
        source={props.uri ? { uri: props.uri } : null}
        shouldPlay={shouldPlay}
        useNativeControls
        rate={1.0}
        volume={1.0}
        isLooping
        style={styles.videoContents}
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
  videoContents: {
    zIndex: 100,
    width,
    height: width * 0.6,
  },
});
