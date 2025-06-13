import { StyleSheet } from 'react-native';

const EstilosPerfilUsuario = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    contenedor: {
      flex: 1,
      backgroundColor: '#1A202B',
      paddingBottom: 60,
    },
    encabezado: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 50,
    },
    textoEncabezado: {
      fontSize: 24,
      fontWeight: '600',
      color: '#F2F2F2',
    },
    barraPestanas: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 20,
    },
    pestanaActiva: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#FFAE17',
    },
    pestanaInactiva: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    textoPestanaActiva: {
      fontSize: 16,
      color: '#FFAE17',
    },
    textoPestanaInactiva: {
      fontSize: 16,
      color: '#B3B3B3',
    },
    seccionUsuario: {
      alignItems: 'center',
      marginVertical: 16,
    },
    imagenUsuario: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: '#f0f0f0',
      marginBottom: 10,
    },
    nombreCompleto: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#F2F2F2',
    },
    rolUsuario: {
      fontSize: 16,
      color: '#666',
    },
    datosExtras: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 8,
    },
    datoItem: {
      alignItems: 'center',
    },
    datoNumero: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#F2F2F2',
    },
    datoLabel: {
      fontSize: 14,
      color: '#B3B3B3',
    },
    tituloDatosPersonales: {
      fontSize: 18,
      color: '#FFAE17',
      textAlign: 'center',
      marginVertical: 8,
    },
    datosPersonales: {
      paddingHorizontal: 16,
    },
    datosPersonalesBox: {
      padding: 6,
      margin: 6,
      borderRadius: 8,
      backgroundColor: '#333237',
    },
    infoUsuario: {
      fontSize: 16,
      color: '#B3B3B3',
      marginBottom: 5,
    },
    barraNavegacion: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      position: 'relative', 
      top: -40, //para la barra estaba encima de los botones
      width: '100%',
    },
    iconoNavegacion: {
      alignItems: 'center',
    },
    textoNavegacion: {
      fontSize: 12,
      color: 'gray',
    },
     // Estilos para el modal
     modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro
    },
    imagenGrande: {
      width: '90%',
      height: '80%',
      borderRadius: 10,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      borderRadius: 50,
    },
    closeText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    imagenModal: {
      width: 200,   // Ajusta el tamaño de la imagen en el modal
      height: 200,  
      borderRadius: 100,  // Garantiza que la imagen sea circular
      resizeMode: 'cover',  // Mantiene la proporción de la imagen
    },
  });


export default EstilosPerfilUsuario;  