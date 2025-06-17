import { StyleSheet } from 'react-native';

const EstilosPantallaAyuda = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#191A2E',
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
    color: '#F2F2F2',
    fontWeight: '600',
  },
  menuPuntos: {
    fontSize: 24,
    color: '#F2F2F2',
    fontWeight: '600',
  },
  tituloAyuda: {
    fontSize: 18,
    color: '#FC6A30',
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPreguntas: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tituloPregunta: {
    fontSize: 16,
    color: '#FC6A30',
    marginBottom: 5,
  },
  infoPregunta: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 5,
  },
  contenidoResponsivo: {
    width: '100%',
    paddingHorizontal: 20,
  },
  contenidoWeb: {
    maxWidth: 700,
    alignSelf: 'center',
  },
});

export default EstilosPantallaAyuda;