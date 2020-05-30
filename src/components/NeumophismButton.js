
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NeumophismButton(props) {
  const [isDown, setDown] = useState(false)
  const handlePressIn = useCallback(() => {
    setDown(true);
  });

  const handlePressOut = useCallback(() => {
    setDown(false);
  });

  const gradColor = isDown ? ['#e6e6e6', '#e6e6e6'] : ['#ffffff', '#ffffff'];
  const shadowColor = isDown ? '#ffffff' : '#d9d9d9';

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.buttonOuter, { shadowColor }]}>
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
    borderRadius: 32,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  buttonInner: {
    position: 'absolute',
    top: 0,
    height: 48,
    marginTop: -10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 32,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowColor: '#BABECC',
    shadowRadius: 3,
  },
  buttonFace: {
    padding: 12,
    borderRadius: 32,
    height: 48,
    width: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 12,
  },
});
