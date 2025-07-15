import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosUsuariosBloqueados = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: Colors.fondo,
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
