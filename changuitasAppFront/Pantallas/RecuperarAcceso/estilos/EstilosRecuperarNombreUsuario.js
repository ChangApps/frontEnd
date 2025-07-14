import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosRecuperarNombreUsuario = StyleSheet.create({
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
  export default EstilosRecuperarNombreUsuario;    