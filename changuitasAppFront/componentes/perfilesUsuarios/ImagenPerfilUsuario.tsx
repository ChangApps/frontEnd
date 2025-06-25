import React from 'react';
import { View, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import estilos from '../../Pantallas/Usuario/estilos/EstilosPerfilUsuario';

interface Props {
  imageUri: string | null;
  modalVisible: boolean;
  onImagePress: () => void;
  onCloseModal: () => void;
}

const ImagenPerfilUsuario: React.FC<Props> = ({ imageUri, modalVisible, onImagePress, onCloseModal }) => (
  <>
    <TouchableOpacity onPress={onImagePress}>
      <Image source={{ uri: imageUri || 'https://via.placeholder.com/80' }} style={estilos.imagenUsuarioGrande} />
    </TouchableOpacity>

    <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={estilos.modalContainer}>
          <Image source={{ uri: imageUri || 'https://via.placeholder.com/80' }} style={estilos.imagenModal} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </>
);

export default ImagenPerfilUsuario;
