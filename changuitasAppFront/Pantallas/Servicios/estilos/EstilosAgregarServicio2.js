import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosAgregarServicio2 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contenedorEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.naranja, // Color de fondo de la barra
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  contenedorDesplazable: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop: 20,
  },
  etiqueta: {
    color: Colors.blancoTexto,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  encabezadoDias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  etiquetaDia: {
    fontSize: 14,
    color: Colors.grisTexto,
    fontWeight: '600',
  },
  etiquetaHora: {
    fontSize: 14,
    color: Colors.grisTexto,
    fontWeight: '600',
  },
  filaDia: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textoDia: {
    fontSize: 16,
    color: Colors.blancoTexto,
    marginLeft: 8,
    flex: 1,
  },
  textoSeparador: {
    fontSize: 16,
    color: Colors.blancoTexto,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  picker: {
    height: 50,
    width: 121,
    marginVertical: 10,
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
    marginVertical: 15,
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