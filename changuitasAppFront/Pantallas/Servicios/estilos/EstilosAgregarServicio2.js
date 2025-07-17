import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

// Obtener dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && screenWidth > 768;

const EstilosAgregarServicio2 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contenedorDesplazable: {
    paddingHorizontal: isDesktop ? Math.min(screenWidth * 0.30, 300) : 20,
    paddingBottom: 10,
    maxWidth: isDesktop ? 1000 : '100%',
    alignSelf: isDesktop ? 'center' : 'stretch',
  },
  etiqueta: {
    color: Colors.blancoTexto,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  campoDescripcion: {
    borderWidth: 1,
    borderColor: Colors.fondo,
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: isDesktop ? 15 : 20,
  },
  encabezadoDias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: isDesktop ? 15 : 20,
    marginBottom: isDesktop ? 8 : 10,
    paddingHorizontal:isDesktop ? 0 :5,
    // REMOVIDO: paddingHorizontal: 0 - esto causaba el problema
  },
  etiquetaDia: {
    fontSize: 20,
    color: Colors.grisTexto,
    fontWeight: '600',
  },
  etiquetaHora: {
    fontSize: 20,
    color: Colors.grisTexto,
    fontWeight: '600',
  },
  filaDia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: isDesktop ? 6 : 8,
    width: '100%',
    paddingHorizontal: 0
    // REMOVIDO: paddingHorizontal: 0 - esto causaba el problema
  },
  switchYTextoDia: {
    flexDirection: 'row',
    alignItems: 'center',
    width: isDesktop ? '35%' : '31%',
    minWidth: isDesktop ? 120 : 0,
  },
  textoDia: {
    fontSize: 16,
    color: Colors.blancoTexto,
    marginLeft: isDesktop ? 10 : 1,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  campoHora: {
    borderWidth: 1,
    borderColor: Colors.grisBoxes,
    borderRadius: 4,
    width: 60,
    textAlign: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  textoSeparador: {
    fontSize: 16,
    color: Colors.blancoTexto,
    marginHorizontal: isDesktop ? 8 : 2,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: isDesktop ? 15 : 20,
  },
  picker: {
    height: 50,
    width: isDesktop ? 120 : 111.5,
    marginVertical: 2,
  },
  pickerItem: {
    fontSize: 50,
    paddingVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.naranja,
    borderRadius: 8,
    backgroundColor: Colors.blancoTexto,
    shadowColor: Colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pasosWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.fondo,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: isDesktop ? 10 : 15,
    gap: 10,
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
});

export default EstilosAgregarServicio2;