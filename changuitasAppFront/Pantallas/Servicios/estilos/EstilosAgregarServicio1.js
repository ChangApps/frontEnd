import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && screenWidth > 768;

const EstilosAgregarServicio1 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  title: {
    color: Colors.blancoTexto,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollContainer: {
    paddingHorizontal: isDesktop ?400:20,
    paddingBottom: 15,
  },
  selectorBoton: {
    backgroundColor: Colors.naranja,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  selectorTexto: {
    color: Colors.blancoTexto,
    fontWeight: 'bold',
  },
  categoriaContenedor: {
    marginBottom: 25,
  },
  categoriaTitulo: {
    color: Colors.blancoTexto,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  chipsContenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderColor: Colors.naranja,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSeleccionado: {
    backgroundColor: Colors.naranja
  },
  chipTexto: {
    color: Colors.blancoTexto,
    fontWeight: '600',
  },
  chipTextoSeleccionado: {
    color: Colors.blancoTexto
  },
  botonesContenedor: {
  paddingHorizontal: 20,
  paddingBottom: 10,
  backgroundColor: Colors.fondo,
  gap: 5,
},
pasoActivo: {
  backgroundColor: Colors.naranja,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
pasoInactivo: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: Colors.naranja,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
pasoTextoActivo: {
  color: Colors.blancoTexto,
  fontWeight: 'bold',
  fontSize: 14,
},
pasoTextoInactivo: {
  color: Colors.naranja,
  fontWeight: 'bold',
  fontSize: 14,
},
pasosWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: Colors.fondo,
  borderRadius: 30,
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginBottom: 20,
  gap: 10,
},
});


export default EstilosAgregarServicio1;