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
      backgroundColor: 'white',
      paddingBottom: 60,
    },
    encabezado: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'white',
      marginTop: 50,
    },
    textoEncabezado: {
      fontSize: 24,
      fontWeight: '600',
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
      borderBottomColor: '#197278',
    },
    pestanaInactiva: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    textoPestanaActiva: {
      fontSize: 16,
      color: '#197278',
    },
    textoPestanaInactiva: {
      fontSize: 16,
      color: '#666',
    },
    seccionUsuario: {
      alignItems: 'center',
      marginVertical: 20,
    },
    imagenUsuario: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#f0f0f0',
      marginBottom: 10,
    },
    nombreCompleto: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    rolUsuario: {
      fontSize: 16,
      color: '#666',
    },
    datosExtras: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
    datoItem: {
      alignItems: 'center',
    },
    datoNumero: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    datoLabel: {
      fontSize: 14,
      color: '#666',
    },
    tituloDatosPersonales: {
      fontSize: 18,
      color: '#197278',
      textAlign: 'center',
      marginVertical: 10,
    },
    datosPersonales: {
      paddingHorizontal: 20,
    },
    infoUsuario: {
      fontSize: 16,
      color: '#333',
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
    desplegable: {
      position: 'absolute',
      top: 70,
      right: 20,
      width: 150,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      zIndex: 10,
    },
    opcionDesplegable: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    textoDesplegable: {
      fontSize: 16,
      color: '#333333',
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