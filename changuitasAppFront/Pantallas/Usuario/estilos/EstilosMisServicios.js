import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosMisServicios = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  botonAgregarServicio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.naranja,
    borderRadius: 50,
  },
  textoBoton: {
    color: Colors.naranja,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  cargando: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.grisTexto,
  },
  listaServicios: { paddingHorizontal: 16 },
  servicioCard: { padding: 16, marginBottom: 8, backgroundColor: Colors.grisBoxes, borderRadius: 8, elevation: 2 },
  nombreServicio: { fontSize: 16, fontWeight: 'bold', color: Colors.blancoTexto },
  descripcion: { fontSize: 14, color: Colors.grisTexto },
  horario: { fontSize: 12, color: Colors.naranja },
  sinServicios: { textAlign: 'center', marginTop: 20, color: 'grey', fontSize: 18 },

  botonEliminar: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffe5e5",
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
});

export default EstilosMisServicios;