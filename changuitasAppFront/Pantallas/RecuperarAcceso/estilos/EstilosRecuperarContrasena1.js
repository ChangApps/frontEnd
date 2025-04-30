import { StyleSheet } from 'react-native';


const EstilosRecuperarContrasena1= StyleSheet.create({
    areaSegura: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    contenedor: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 70,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    botonAtras: {
      marginRight: 10,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    instruccion: {
      fontSize: 14,
      color: '#333',
      marginBottom: 15,
    },
    entrada: {
      borderWidth: 1,
      borderColor: '#197278',
      borderRadius: 25,
      padding: 15,
      fontSize: 16,
      marginBottom: 30,
      color: '#000',
    },
    botonSiguiente: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#197278',
      borderRadius: 25,
    },
    textoBoton: {
      color: '#197278',
      fontSize: 16,
      fontWeight: '600',
      marginRight: 5,
    },
  });
  export default EstilosRecuperarContrasena1;