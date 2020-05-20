import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

function FollowingButton(props) {
  return (
    <View style={styles.userEdit}>
      <TouchableHighlight
        style={styles.userEditButton}
        onPress={props.onPress}
      >
        <Text style={styles.userEditTitle}>
          Follow
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  userEdit: {
    alignItems: 'center',
    marginBottom: 5,
  },
  userEditButton: {
    borderWidth: 0.5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    padding: 3,
  },
  userEditTitle: {
    color: '#88a5b7',
  },
});

export default FollowingButton;
