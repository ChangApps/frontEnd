import { StyleSheet } from 'react-native';

const EstilosPantallaAyuda = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#191a2e',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#2a2b45',
    marginTop: 50,
  },
  textoInicio: {
    fontSize: 24,
    color: '#F2F2F2',
    fontWeight: '600',
    color:"white",
  },
  menuPuntos: {
    fontSize: 24,
    color: '#F2F2F2',
    fontWeight: '600',
    color:"#fd6b2f"
  },
  tituloAyuda: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight:"bold",
  },
  datosPreguntas: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tituloPregunta: {
    fontSize: 16,
    color: '#fd6b2f',
    marginBottom: 5,
    fontWeight:"bold",
  },
  infoPregunta: {
    fontSize: 16,
    color: 'white',
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