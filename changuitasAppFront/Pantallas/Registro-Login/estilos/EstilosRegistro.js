import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosRegistro = StyleSheet.create({
  degradado: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 8,
  },
  botonAtras: {
    marginRight: 10,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
    justifyContent: 'flex-end',
  },
  formulario: {
    marginTop: 10,
  },
  campo: {
    marginBottom: 0,
  },
  etiqueta: {
    color: '#F2F2F2',
    marginBottom: 8,
    fontSize: 16,
  },
  entradaTexto: {
    backgroundColor: '#333237',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  contenedorContraseña: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333237',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  entradaContraseña: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  botonDegradado: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 60,
    alignItems: 'center',
  },
  textoBotonRegistro: {
    color: '#1A202B',
    fontSize: 20,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
  contenidoResponsivo: {
    width: '100%',
  },
  contenidoWeb: {
    maxWidth: 700,
    alignSelf: 'center',
  },
});
export default EstilosRegistro;  