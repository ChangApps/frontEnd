import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosVerificacion1Mail = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
    alignItems: 'flex-start',
  },
  degradado: {
    flex: 1,
  },
  instruccion: {
    fontSize: 18,
    color: Colors.blancoTexto,
    textAlign: 'justify',
    marginBottom: 20,
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
export default EstilosVerificacion1Mail;  