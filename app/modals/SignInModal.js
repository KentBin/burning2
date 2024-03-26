import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./SignUpModalStyles";

const ModalPopup = ({
  isVisible,
  onClose,
  title,
  content,

}) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalFormContainer}>
        <View style={styles.modalFormModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              onClose();
              if (navigateHome) navigation.navigate("Home");
            }}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalContent}>{content}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopup;