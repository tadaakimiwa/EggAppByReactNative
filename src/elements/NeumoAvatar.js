import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';

export default function NeumoAvatar(props) {
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  });

  const handlePressOut = useCallback(() => {
    setDown(false);
  });

  const gradColor = isDown ? ['#e6e6e6', '#ffffff'] : ['#ffffff', '#e6e6e6'];
  const shadowOuterColor = isDown ? '#e4e4e4' : '#b3b3b3';

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.buttonOuter, { shadowColor: shadowOuterColor }]}>
        <View style={styles.buttonInner}>
          <LinearGradient
            colors={gradColor}
            style={styles.buttonFace}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Avatar
              size={84}
              rounded
              title="U"
              source={props.info.url ? { uri: props.info.url } : null}
            />
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonOuter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 42,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 42,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 1,
    shadowColor: '#ffffff',
    shadowRadius: 2,
  },
  buttonFace: {
    borderRadius: 42,
    height: 84,
    width: 84,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 12,
  },
});
