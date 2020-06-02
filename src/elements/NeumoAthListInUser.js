
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
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
  const shadowOuterColor = isDown ? '#e4e4e4' : '#b3b3b3';

  const { athlete } = props;
  const { uid } = props;

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={props.onPress}
    >
      <View style={[styles.buttonOuter, { shadowColor: shadowOuterColor }]}>
        <View style={styles.buttonInner}>
          <LinearGradient
            colors={gradColor}
            style={styles.buttonFace}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.athListItemTab}>
              <TouchableHighlight
                onPress={() => { props.navigation.navigate('AthDetail', { uid }); }}
              >
                <View style={styles.athImage}>
                  <Image
                    style={styles.athImageTitle}
                    source={{ uri: athlete.profileImageURL }}
                  />
                </View>
              </TouchableHighlight>
              <View style={styles.athName}>
                <Text style={styles.athNameTitle}>{athlete.athuid}</Text>
              </View>
            </View>
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
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 1,
    shadowColor: '#ffffff',
    shadowRadius: 2,
  },
  buttonFace: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  athListItemTab: {

  },
  athImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 120,
  },
  athImageTitle: {
    width: '100%',
    height: '100%',
  },
  athName: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aaaf',
  },
  athNameTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#fff',
    padding: 8,
  },
});
