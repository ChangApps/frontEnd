import { StyleSheet } from 'react-native';

const EstilosHome = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'white',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoInicio: {
    fontSize: 24,
    fontWeight: '600',
  },
  menuPuntos: {
    fontSize: 24,
    fontWeight: '600',
  },
  desplegable: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 10,
  },
  opcionDesplegable: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: 16,
    color: '#333333',
  },
  contenidoPrincipal: {
    flex: 1,
    backgroundColor: '#4EAAA5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  tituloApp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 40,
  },
  contenedorCaracteristicas: {
    gap: 10,
  },
  cajaCaracteristica: {
    backgroundColor: '#2A3A35',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoCaracteristica: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
});
export default EstilosHome;  