
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ShopItemModal from '../components/ShopItemModal';

export default function NeumoShopItemContent(props) {
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  });

  const handlePressOut = useCallback(() => {
    setDown(false);
  });

  const gradColor = isDown ? ['#e6e6e6', '#ffffff'] : ['#ffffff', '#e6e6e6'];
  const shadowOuterColor = isDown ? '#ddd' : '#878787';

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={props.toggleModal}
    >
      <View>
        <View style={[styles.buttonOuter, { shadowColor: shadowOuterColor }]}>
          <View style={styles.buttonInner}>
            <LinearGradient
              colors={gradColor}
              style={styles.buttonFace}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons
                name="diamond-stone"
                size={64}
              />
              <Text style={styles.buttonTitle}>
                {props.text}
              </Text>
            </LinearGradient>
          </View>
        </View>
        <ShopItemModal
          isModalVisible={props.isModalVisible}
          onBackdropPress={props.onBackdropPress}
          itemName={props.modalName}
          itemPrice={props.modalPrice}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonOuter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowOffset: { width: -0.5, height: -0.5 },
    shadowOpacity: 1,
    shadowColor: '#ffffff',
    shadowRadius: 2,
  },
  buttonFace: {
    height: 120,
    width: 144,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontWeight: '400',
    fontSize: 12,
  },
});
