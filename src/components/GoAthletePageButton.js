import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

function GoAthletePageButton(props) {
  return (
    <View style={styles.userEdit}>
      <TouchableHighlight
        style={styles.userEditButton}
        onPress={props.onPress}
      >
        <Text style={styles.userEditTitle}>
          Go to Athlete Page
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
    borderColor: '#2DCCD3',
    padding: 3,
  },
  userEditTitle: {
    color: '#2DCCD3',
  },
});

export default GoAthletePageButton;
