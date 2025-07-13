import { StyleSheet } from 'react-native';
import Colors from "../../../assets/Colors";

const EstilosResultadosBusqueda = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333237',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  resultDetails: {
    flex: 1,
    marginLeft: 15,
  },
  noResultsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blancoTexto,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  arrowButton: {
    paddingLeft: 10,
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 155
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imagenModal: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensajeNoUsuarios: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  }
});
export default EstilosResultadosBusqueda;
