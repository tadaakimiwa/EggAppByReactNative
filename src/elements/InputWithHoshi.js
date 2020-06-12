import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import PropTypes from 'prop-types';

export default function InputWithHoshi({ label, value, onChangeText }) {
  return (
    <View style={styles.inputHoshi}>
      <Hoshi
        style={styles.input}
        label={label}
        value={value}
        borderColor="#265366"
        borderHeight={4}
        inputPadding={12}
        onChangeText={onChangeText}
      />
    </View>
  );
}

InputWithHoshi.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  inputHoshi: {
    paddingBottom: 10,
  },
});
