import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Draggable from 'react-native-draggable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DraggableItem(props) {
  return (
    <View style={styles.draggableItem}>
      <Draggable
        shouldReverse
      >
        <MaterialCommunityIcons
          name={props.iconName}
          size={32}
        />
      </Draggable>
    </View>
  );
}

const styles = StyleSheet.create({
  draggableItem: {
    zIndex: 1000,
  }
});
