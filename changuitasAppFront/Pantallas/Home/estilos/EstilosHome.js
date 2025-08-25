import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosHome = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contenidoResponsivo: {
    // placeholder
  },
  contenidoWeb: {
    // estilos web 
  },
  encabezado: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoInicio: {
    color: Colors.blancoTexto,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollContenido: {
    paddingBottom: 100,
  },
  barraBusqueda: {
    flexDirection: 'row',
    backgroundColor: Colors.azulBoxes,
    marginHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inputBusqueda: {
    flex: 1,
    color: Colors.blancoTexto,
    fontSize: 16,
  },
  botonFiltro: {
    marginLeft: 10,
    backgroundColor: Colors.naranja,
    padding: 8,
    borderRadius: 20,
  },
  subtituloSeccion: {
    color: Colors.naranja,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  cardPersona: {
    backgroundColor: Colors.azulBoxes,
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  nombrePersona: {
    color: Colors.blancoTexto,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 0,
    marginTop: 0,
  },
  oficioPersona: {
    color: '#ccc',
    fontSize: 12,
  },
  cardCategoria: {
    backgroundColor: Colors.azulBoxes,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: '48%',
    height:80,
  },
  textoCategoria: {
    color: Colors.blancoTexto,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  contenidoPrincipal: {
    // si se necesita más contenido despues
  },
  contenedorCaracteristicas: {
    paddingHorizontal: 20,
  },
  cajaCaracteristica: {
    marginBottom: 10,
  },
  textoCaracteristica: {
    color: Colors.blancoTexto,
  },
  mensajeVacio: {
    fontSize: 16,
    color: Colors.blancoTexto,
    marginLeft: 20,
    marginTop: 8,
  }
});

export default EstilosHome;