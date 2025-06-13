import { StyleSheet } from 'react-native';

const estilosModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imagenModal: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
  },
});
export default estilosModal;  