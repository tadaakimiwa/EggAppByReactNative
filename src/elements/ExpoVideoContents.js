import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

export default function ExpoVideoContents({ navigation, uri, width }) {
  const [shouldPlay, setShouldPlay] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        setShouldPlay(false);
      }
      return () => {
        unsubscribe();
      }
    }, [navigation])
  );

  return (
    <View style={[styles.video, { width, height: width * 0.6, backgroundColor: 'black' }]}>
      <Video
        source={uri ? { uri } : null}
        shouldPlay={shouldPlay}
        useNativeControls
        rate={1.0}
        volume={1.0}
        isLooping
        style={[styles.videoContents, { width, height: width * 0.6 }]}
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
  },
});
