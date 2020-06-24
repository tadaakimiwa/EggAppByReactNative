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
        <View style={styles.modalContainer}>
          <View style={styles.athModalContent}>
            <TouchableHighlight
              onPress={props.athEditOnPress}
              underlayColor="transparent"
            >
              <View style={styles.modalItem}>
                <Text style={styles.modalItemTitle}>Edit</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.athModalContent_last}>
            <TouchableHighlight
              onPress={props.athPostOnPress}
              underlayColor="transparent"
            >
              <View style={styles.modalItem}>
                <Text style={styles.modalItemTitle}>Post</Text>
              </View>
            </TouchableHighlight>
          </View>
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
  modalContainer: {
    height: 320,
    width: 320,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 24,
  },
  athModalContent: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  athModalContent_last: {

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
