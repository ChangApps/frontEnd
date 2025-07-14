import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosVerificacion1Mail = StyleSheet.create({
  areaSegura: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  degradado: {
      flex: 1,
    },
  instruccion: {
      fontSize: 14,
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
export default EstilosVerificacion1Mail;  