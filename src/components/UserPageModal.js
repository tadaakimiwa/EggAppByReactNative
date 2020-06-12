import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';

export default function UserPageModal(props) {
  return (
    <View style={styles.userPageModal}>
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={props.onBackdropPress}
      >
        <View style={styles.userModalContent}>
          <TouchableHighlight
            onPress={props.onPress}
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
  userPageModal: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  userModalContent: {
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
