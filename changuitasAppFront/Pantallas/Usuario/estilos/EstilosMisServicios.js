import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosMisServicios = StyleSheet.create({
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
    backgroundColor: 'white',
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
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  cambiarFotoTexto: {
    color: '#197278',
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
  botonGuardarCambios: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: -130,
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonAgregarServicio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.naranja,
    borderRadius: 50,
  },
  textoBoton: {
    color: Colors.naranja,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  cargando: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.grisTexto,
  },
  listaServicios: { paddingHorizontal: 16 },
  servicioCard: { padding: 16, marginBottom: 8, backgroundColor: Colors.grisBoxes, borderRadius: 8, elevation: 2 },
  nombreServicio: { fontSize: 16, fontWeight: 'bold', color: Colors.blancoTexto },
  descripcion: { fontSize: 14, color: Colors.grisTexto },
  horario: { fontSize: 12, color: Colors.naranja },
  sinServicios: { textAlign: 'center', marginTop: 20, color: 'grey', fontSize: 18 },

  botonEliminar: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffe5e5",
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
});

export default EstilosMisServicios;