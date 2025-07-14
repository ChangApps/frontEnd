import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosHistorial2 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
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
    backgroundColor: Colors.grisBoxes,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    gap: 10,
  },
});

export default EstilosHistorial2;