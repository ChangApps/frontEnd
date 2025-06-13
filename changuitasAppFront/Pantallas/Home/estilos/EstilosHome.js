import { StyleSheet } from 'react-native';

const EstilosHome = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#1A202B',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    marginTop: 50,
  },
  textoInicio: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F2F2F2',
  },
  menuPuntos: {
    fontSize: 24,
    fontWeight: '600',
  },
  contenidoPrincipal: {
    flex: 1,
    backgroundColor: '#292929',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  tituloApp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFAE17',
    marginBottom: 20,
    lineHeight: 40,
  },
  contenedorCaracteristicas: {
    gap: 10,
  },
  cajaCaracteristica: {
    backgroundColor: '#333237',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoCaracteristica: {
    color: '#FFAE17',
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