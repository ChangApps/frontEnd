import { StyleSheet } from 'react-native';

const EstilosHome = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#0D0D2B',
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContenido: {
    paddingBottom: 100,
  },
  barraBusqueda: {
    flexDirection: 'row',
    backgroundColor: '#1E1E3F',
    marginHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inputBusqueda: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  botonFiltro: {
    marginLeft: 10,
    backgroundColor: '#FF6A00',
    padding: 8,
    borderRadius: 20,
  },
  subtituloSeccion: {
    color: '#FF6A00',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  cardPersona: {
    backgroundColor: '#1E1E3F',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 120,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  nombrePersona: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  oficioPersona: {
    color: '#ccc',
    fontSize: 12,
  },
  cardCategoria: {
    backgroundColor: '#1E1E3F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: '48%',
  },
  textoCategoria: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
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
    color: '#fff',
  },
});

export default EstilosHome;