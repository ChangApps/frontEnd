import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const  EstilosRegistro = StyleSheet.create({
    degradado: {
      flex: 1,
    },
    areaSegura: {
      flex: 1,
    },
    contenedor: {
      flex: 1,
      paddingHorizontal: 20,
    },
    formulario: {
      marginTop: 10,
    },
    campo: {
      marginBottom: 0,
    },
    etiqueta: {
      color: Colors.blancoTexto,
      marginBottom: 8,
      fontSize: 16,
    },
    errorContainer: {
      backgroundColor: Colors.blancoTexto,
      borderRadius: 10,
      padding: 10,
    },
    errorText: {
      color: Colors.errorTexto,
      fontSize: 14,
      textAlign: 'center',
    },
    contenidoResponsivo: {
      width: '100%',
    },
    contenidoWeb: {
      maxWidth: 700,
      alignSelf: 'center',
    },
  });
  export default EstilosRegistro;  