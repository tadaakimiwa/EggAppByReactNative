import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';

export default function ProgressBar(props) {
  return (
    <View>
      <Progress.Bar
        progress={props.progress}
        width={240}
        height={18}
      />
    </View>
  );
}
