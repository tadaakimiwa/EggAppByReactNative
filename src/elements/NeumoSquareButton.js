
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NeumoSquareButton(props) {
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  });

  const handlePressOut = useCallback(() => {
    setDown(false);
  });

  const gradColor = isDown ? ['#e6e6e6', '#ffffff'] : ['#ffffff', '#e6e6e6'];
  const shadowOuterColor = isDown ? '#3c82aa' : '#e0e0e0';

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
              a
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
    borderRadius: 24,
    shadowColor: '#e0e0e0',
    shadowOffset: { width: 24, height: 24 },
    shadowOpacity: 1,
    shadowRadius: 18,
    marginTop: 12,
    marginBottom: 12,
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowOffset: { width: -24, height: -24 },
    shadowOpacity: 1,
    shadowColor: '#ffffff',
    shadowRadius: 18,
  },
  buttonFace: {
    padding: 12,
    borderRadius: 24,
    height: 96,
    width: 216,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 12,
  },
});
