import { StyleSheet } from 'react-native';

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
    encabezado: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 8,
    },
    botonAtras: {
      marginRight: 10,
    },
    titulo: {
      fontSize: 20,
      color: '#fff',
      fontWeight: '500',
      justifyContent: 'flex-end',
    },
    formulario: {
      marginTop: 10,
    },
    campo: {
      marginBottom: 16,
    },
    etiqueta: {
      color: '#fff',
      marginBottom: 8,
      fontSize: 16,
    },
    entradaTexto: {
      backgroundColor: '#fff',
      borderRadius: 25,
      padding: 15,
      fontSize: 16,
      color: '#000',
    },
    contenedorContraseña: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingHorizontal: 15,
    },
    entradaContraseña: {
      flex: 1,
      padding: 15,
      fontSize: 16,
      color: '#000',
    },
    botonDegradado: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 50,
      marginTop: 20,
      marginBottom: 60,
      alignItems: 'center',
    },
    textoBotonRegistro: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    errorContainer: {
      backgroundColor: '#F8D7DA',
      borderRadius: 10,
      padding: 10,
    },
    errorText: {
      color: '#A94442',
      fontSize: 14,
      textAlign: 'center',
    },
  });
  export default EstilosRegistro;  