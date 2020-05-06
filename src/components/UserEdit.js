import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

class UserEdit extends React.Component {
  render() {
    return (
      <View style={styles.userEdit}>
        <View style={styles.userEditImage}>
          <TouchableHighlight style={styles.userImage}>
            <Text style={styles.userImageTitle}>
              Change
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.userEditInfo}>
          <Hoshi
            style={styles.input}
            label="Name"
            value="Test"
            borderColor="#265366"
            borderHeight={4}
            inputPadding={12}
          />
        </View>

        <View style={styles.userEditInfo}>
          <Hoshi
            style={styles.input}
            label="Profile"
            value="Test"
            borderColor="#265366"
            borderHeight={4}
            inputPadding={12}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userEdit: {
    backgroundColor: '#fff',
  },
  userEditImage: {
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  userImage: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageTitle: {
    fontSize: 16,
  },
  userEditInfo: {
    paddingBottom: 10,
  },
});

export default UserEdit;
