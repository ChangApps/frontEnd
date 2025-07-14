import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosPantallaAyuda = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  degradado: {
    flex: 1,
  },
  tituloAyuda: {
    fontSize: 18,
    color: Colors.naranja,
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPreguntas: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tituloPregunta: {
    fontSize: 16,
    color: Colors.naranja,
    marginBottom: 5,
  },
  infoPregunta: {
    fontSize: 16,
    color: Colors.grisTextoAyuda,
    marginBottom: 5,
    textAlign: 'justify',
  },
  contenidoResponsivo: {
    width: '100%',
    paddingHorizontal: 20,
  },
  contenidoWeb: {
    maxWidth: 700,
    alignSelf: 'center',
  },
  infoSubparrafo: {
  fontSize: 16,
  color: Colors.grisTextoAyuda,
  marginBottom: 5,
  textAlign: 'justify',
  paddingLeft: 20, // sangría visual
},

});

export default EstilosPantallaAyuda;