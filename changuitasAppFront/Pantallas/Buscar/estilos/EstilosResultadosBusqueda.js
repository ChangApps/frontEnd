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
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grisBoxes,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.blancoTexto,
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
    color: Colors.grisTexto,
  },
  arrowButton: {
    paddingLeft: 10,
  },
  errorContainer: {
    backgroundColor: Colors.blancoOscuroTexto,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  errorText: {
    color: Colors.errorTexto,
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.negro,
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
    color: Colors.grisTexto,
    textAlign: 'center',
  }
});
export default EstilosResultadosBusqueda;
