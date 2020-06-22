import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';

export default function AthPageModal(props) {
  return (
    <View style={styles.athPageModal}>
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={props.onBackdropPress}
      >
        <View style={styles.athModalContent}>
          <TouchableHighlight
            onPress={props.onPress}
            underlayColor="transparent"
          >
            <View style={styles.modalItem}>
              <Text style={styles.modalItemTitle}>Edit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  athPageModal: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  athModalContent: {
    height: 160,
    width: 320,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 24,
  },
  modalItem: {
    height: 160,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalItemTitle: {
    fontSize: 24,
    fontWeight: '300',
  },
});
