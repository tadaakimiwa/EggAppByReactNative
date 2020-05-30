import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';

export default function NotNeumoInfoTabButton(props) {
  return (
    <TouchableHighlight
      style={styles.userInfoTabItem}
      onPress={props.onPressFollowing}
    >
      <View>
        <Text style={styles.userInfoTabNum}>
          {String(props.text)}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  userInfoTabItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 32,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoTabNum: {
    fontSize: 20,
  },
  userInfoTabTitle: {
    fontSize: 15,
    paddingTop: 12,
  },
});
