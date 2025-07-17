import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosUsuariosBloqueados = StyleSheet.create({
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
  cargando: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#197278',
  },
  sinServicios: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  listaUsuarios: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  usuarioBloqueado: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: Colors.grisBoxes,
  padding: 15,
  marginVertical: 5,
  borderRadius: 8,
  elevation: 2,
  },
  infoUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.blancoTexto,
    marginRight: 10,
  },
  nombreUsuarioBloqueado: {
    fontWeight: 'bold',
    color: Colors.blancoTexto,
  },
  botonDesbloquear: {
    backgroundColor: Colors.naranja,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  botonTexto: {
    color: Colors.blancoTexto,
    textAlign: 'center',
    fontWeight: 'bold',
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
  mensajeNoUsuarios: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
});
export default EstilosUsuariosBloqueados;
