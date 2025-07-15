import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosEditarPerfil = StyleSheet.create({
    contenedor: {
      flex: 1,
      backgroundColor: Colors.fondo,
    },
    seccionFoto: {
      alignItems: 'center',
      marginVertical: 20,
    },
    tituloSeccion: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: Colors.blancoTexto,
    },
    imagenUsuario: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: Colors.blancoOscuroTexto,
    },
    cambiarFotoTexto: {
      color: Colors.naranja,
      marginTop: 10,
    },
    formulario: {
      paddingHorizontal: 20,
      marginTop: -20,
    },
    label: {
      fontSize: 16,
      color: Colors.grisTexto,
      marginTop: 20,
    },
    botonGuardarCambios: {
      backgroundColor: Colors.naranja,
      paddingVertical: 12,
      borderRadius: 50,
      alignItems: 'center',
      width: '50%',  
      alignSelf: 'center',
      marginTop: 32, 
    },
    textoBotonGuardar: {
      color: Colors.fondo,
      fontSize: 16,
      fontWeight: 'bold',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 160, 
    },
    botonCambiarPassword: {
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
    },
  //Modal del recortador
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.negro,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.blancoTexto,
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: "90%",
  },
  });
  
  export default EstilosEditarPerfil;