import { StyleSheet } from 'react-native';

const EstilosPantallaAyuda = StyleSheet.create({
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
  tituloAyuda: {
    fontSize: 18,
    color: '#197278',
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPreguntas: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tituloPregunta: {
    fontSize: 16,
    color: '#197278',
    marginBottom: 5,
  },
  infoPregunta: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default EstilosPantallaAyuda;