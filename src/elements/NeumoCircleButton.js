
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NeumoCircleButton(props) {
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  });

  const handlePressOut = useCallback(() => {
    setDown(false);
  });

  const gradColor = isDown ? ['#e6e6e6', '#ffffff'] : ['#ffffff', '#e6e6e6'];
  const shadowOuterColor = isDown ? '#e0e0e0' : '#c9c9c9';

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={props.onPress}
    >
      <View style={[styles.buttonOuter, { shadowOuterColor }]}>
        <View style={styles.buttonInner}>
          <LinearGradient
            colors={gradColor}
            style={styles.buttonFace}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonTitle}>
              {props.text}
            </Text>
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
    borderRadius: 32,
    shadowColor: '#b3b3b3',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 48,
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 1,
    shadowColor: '#ffffff',
    shadowRadius: 12,
  },
  buttonFace: {
    padding: 12,
    borderRadius: 32,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 12,
  },
});
