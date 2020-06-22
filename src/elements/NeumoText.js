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

  const { fontSize } = props;

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.buttonOuter, { shadowOuterColor }]}>
        <View style={styles.buttonInner}>
          <LinearGradient
            colors={gradColor}
            style={[
              styles.buttonFace,
              {
                overflow: 'hidden',
                borderRadius: 16,
              },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.buttonTitle, { fontSize }]}>
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
    borderRadius: 20,
    shadowColor: '#a1a1a1',
    shadowOffset: { width: -1.5, height: -1.5 },
    shadowOpacity: 1,
    shadowRadius: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  buttonInner: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowColor: '#fff',
    shadowRadius: 1,
  },
  buttonFace: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    paddingTop: 8,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
    fontWeight: '700',
    color: '#555',
  },
});
