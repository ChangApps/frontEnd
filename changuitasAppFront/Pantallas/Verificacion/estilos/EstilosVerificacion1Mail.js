import { StyleSheet } from 'react-native';

const EstilosVerificacion1Mail = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginLeft:30,
    marginTop:-35,
  },
    botonAtras: {
    marginRight: 10,
    padding: 5,
    marginLeft:-10,
    marginTop:1,
  },
  subtitulo: {
    fontSize: 18,
    color: '#197278',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instruccion: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 30,
    color: '#000',
  },
  botonSiguiente: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 25,
  },
  textoBoton: {
    color: '#197278',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
});
export default EstilosVerificacion1Mail;  