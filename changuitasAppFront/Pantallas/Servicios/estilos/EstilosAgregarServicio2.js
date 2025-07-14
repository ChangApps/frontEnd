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
  encabezado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blancoTexto,
  },
  contenedorDesplazable: {
    paddingHorizontal: 20,
    paddingBottom: 10,
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
    marginBottom: 20,
  },
  encabezadoDias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,       // agrega separación desde arriba (recuadro de descripción)
    marginBottom: 10,
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
    marginVertical: 8,
    width: '100%',
  },

  switchYTextoDia: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '31%',       // ocupa 30% de la fila
  },

  textoDia: {
    fontSize: 16,
    color: Colors.blancoTexto,
    marginLeft: 1,
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
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  picker: {
    height: 50,
    width: 111.5,
    marginVertical: 2,
  },
  pickerItem: {
    fontSize: 50, // Aumenta el tamaño de la fuente para que sea más fácil de leer
    paddingVertical: 10, // Da más espacio entre las opciones
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
    marginHorizontal: 1,       // espaciado lateral
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