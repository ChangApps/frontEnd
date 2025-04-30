import { StyleSheet } from 'react-native';

const EstilosRecuperarContrasena3 = StyleSheet.create({
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
export default EstilosRecuperarContrasena3;  