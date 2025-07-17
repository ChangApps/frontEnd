import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosHistorial1 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.azulClaroBoxes,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginLeft:5,
    marginRight:5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.blancoOscuroTexto,
  },
  resultDetails: {
    flex: 1,
    marginLeft: 15,
  },
  nombreConEstadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap', // para que no haga wrap en cel
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.naranja,
    marginRight: 8, // espacio entre nombre y cartel rojo
  },
    estadoCriticoContainer: {
    backgroundColor: '#ff4d4d', // rojo claro
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  estadoCriticoText: {
    color: 'white',
    fontWeight: 'bold',
  },
    estadoNormalContainer: {
    backgroundColor: 'gray', // rojo claro
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  estadoNormalText: {
    marginTop: 4,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowButton: {
    paddingLeft: 10,
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  fecha: {
    fontSize: 12,
    color: Colors.blancoTexto,
    marginTop: 2,
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
  mensajeNoUsuarios: {
    fontSize: 18,
    color: Colors.grisTexto,
    textAlign: 'center',
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

export default EstilosHistorial1;


