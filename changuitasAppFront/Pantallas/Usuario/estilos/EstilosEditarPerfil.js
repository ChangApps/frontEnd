import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosEditarPerfil = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '191A2E',
    marginTop: 5,
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 300,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  opcion: {
    fontSize: 16,
    color: 'gray',
  },
  opcionSeleccionada: {
    color: '#197278',
    fontWeight: '600',
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
    color: '#F2F2F2',
  },
  imagenUsuario: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  cambiarFotoTexto: {
    color: '#FC6A30',
    marginTop: 10,
  },
  formulario: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  botonGuardarCambios: {
    backgroundColor: '#FC6A30',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 32,
  },
  textoBotonGuardar: {
    color: '#191A2E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  botonCambiarPassword: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  textoCambiarPassword: {
    color: '#197278',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  contenedorEntradaContrasena: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  inputContrasena: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
  },
  iconoOjo: {
    padding: 10,
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