import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosHistorial1 = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
  },
  barraPestanas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  pestanaActiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#197278',
  },
  pestanaInactiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoPestanaActiva: {
    fontSize: 16,
    color: '#197278',
  },
  textoPestanaInactiva: {
    fontSize: 16,
    color: '#666',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2b45',
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
    backgroundColor: '#E0E0E0',
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
    color: '#fd6b2f',
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
  seccionUsuario: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  nombreCompleto: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rolUsuario: {
    fontSize: 16,
    color: '#666',
  },
  datosExtras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  datoItem: {
    alignItems: 'center',
  },
  datoNumero: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datoLabel: {
    fontSize: 14,
    color: '#666',
  },
  tituloDatosPersonales: {
    fontSize: 18,
    color: '#197278',
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPersonales: {
    paddingHorizontal: 20,
  },
  infoUsuario: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },

  textoVacio: {
    textAlign: 'center',  
    fontSize: 18,         
    color: '#333',        
  },
  fecha: {
    fontSize: 12,
    color: 'white',
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
    color: 'grey',
    textAlign: 'center',
  },
  pasoActivo: {
  backgroundColor: '#FF6D3B',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
pasoInactivo: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#FF6D3B',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
pasoTextoActivo: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},
pasoTextoInactivo: {
  color: '#FF6D3B',
  fontWeight: 'bold',
  fontSize: 14,
},
pasosWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: '#1D233B',
  borderRadius: 30,
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginBottom: 20,
  gap: 10,
},
});

export default EstilosHistorial1;


