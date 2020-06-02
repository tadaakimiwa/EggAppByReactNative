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

  const gradColor = ['#ffffff', '#e6e6e6'];
  const shadowOuterColor = isDown ? '#3c82aa' : '#e0e0e0';

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
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
    borderRadius: 24,
    shadowColor: '#a3a3a3',
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    marginTop: 12,
    marginBottom: 12,
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 1,
    shadowColor: '#ffffff',
    shadowRadius: 5,
  },
  buttonFace: {
    paddingTop: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
  },
});
