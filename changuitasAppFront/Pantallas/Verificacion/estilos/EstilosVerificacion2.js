import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosVerificacion2 = StyleSheet.create({
  areaSegura: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'flex-start',
  },
  degradado: {
      flex: 1,
    },
  instruccion: {
      fontSize: 14,
      color: Colors.blancoTexto,
      marginBottom: 15,
    },
  contenedorImagenPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.blancoOscuroTexto,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 5, 
    borderColor: Colors.naranja,
    marginTop:10,
  },
  imagenPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  textoOpcion: {
    fontSize: 16,
    color: Colors.naranja,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.negro,
  },
  imagenModal: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
  },
    //Modal del recortador
    modalOverlay: {
      flex: 1,
      backgroundColor: Colors.negro,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: Colors.blancoOscuroTexto,
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      maxWidth: "90%",
    },
    contenidoResponsivo: {
      width: '100%',
    },
    contenidoWeb: {
      maxWidth: 700,
      alignSelf: 'center',
    },
})
export default EstilosVerificacion2;  