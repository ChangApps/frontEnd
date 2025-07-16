import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosRecuperarContrasena3 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 25,
  },
  degradado: {
      flex: 1,
    },
  contenedorEntrada: {
    marginBottom: 20,
  },
  instruccion: {
    fontSize: 16,
    color: Colors.blancoTexto,
    marginBottom: 15,
  },
  contenidoResponsivo: {
      width: '100%',
  },
  contenidoWeb: {
    maxWidth: 700,
    alignSelf: 'center',
  },
});
export default EstilosRecuperarContrasena3;  