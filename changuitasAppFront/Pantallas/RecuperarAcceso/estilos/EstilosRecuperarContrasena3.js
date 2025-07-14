import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosRecuperarContrasena3 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 25,
  },
  degradado: {
      flex: 1,
    },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    color: '#197278',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contenedorEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  entrada: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  contenedorEntradaContrasena: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entradaContrasena: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    flex: 1,
    marginBottom: 16,
  },
  iconoOjo: {
    position: 'absolute',
    right: 15,
  },
  instruccion: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  contenidoResponsivo: {
      width: '100%',
    },
    contenidoWeb: {
      maxWidth: 700,
      alignSelf: 'center',
    },
});
export default EstilosRecuperarContrasena3;  