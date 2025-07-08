import React from 'react';
import { Image, Modal, TouchableWithoutFeedback, View, StyleProp, ImageStyle } from 'react-native';

interface Props {
  uri: string | null;
  visible: boolean;
  onClose: () => void;
  estiloImagen: StyleProp<ImageStyle>;
}

const ImagenConModal: React.FC<Props> = ({ uri, visible, onClose, estiloImagen }) => (
  <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: uri || 'https://via.placeholder.com/80' }} style={estiloImagen} />
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default ImagenConModal;