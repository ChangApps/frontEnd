import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosRecuperarContrasena2 = StyleSheet.create({
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
  instruccion: {
    fontSize: 18,
    color: Colors.blancoTexto,
    textAlign: 'justify',
    marginBottom: 10,
    paddingVertical: 15
  },
  contenidoResponsivo: {
    width: '100%',
  },
  contenidoWeb: {
    maxWidth: 700,
    alignSelf: 'center',
  },
});
export default EstilosRecuperarContrasena2;  