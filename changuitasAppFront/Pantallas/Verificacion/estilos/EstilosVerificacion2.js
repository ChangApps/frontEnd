import { StyleSheet } from 'react-native';

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
  botonAtras: {
    marginRight: 10,
    padding: 5,
    marginLeft:-10,
    marginTop:10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginRight:10,
    marginLeft:32,
    marginTop:-38
  },
  textoPaso: {
    fontSize: 16,
    color: '#FC6A30',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  instruccion: {
      fontSize: 14,
      color: '#F2F2F2',
      marginBottom: 15,
    },
  contenedorImagenPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 5, 
    borderColor: '#FC6A30',
    marginTop:10,
  },
  imagenPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  textoOpcion: {
    fontSize: 16,
    color: '#FC6A30',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  botonContenedor: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FC6A30',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textoBoton: {
    color: '#FC6A30',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
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