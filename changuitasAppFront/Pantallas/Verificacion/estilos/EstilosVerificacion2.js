import { StyleSheet } from 'react-native';

const EstilosVerificacion2 = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginRight:10,
  },
  textoPaso: {
    fontSize: 16,
    color: '#197278',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
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
    borderColor: '#5A9EA2',
    marginTop:10,
  },
  imagenPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  textoOpcion: {
    fontSize: 16,
    color: '#197278',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  botonContenedor: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#197278',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textoBoton: {
    color: '#197278',
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
})
export default EstilosVerificacion2;  