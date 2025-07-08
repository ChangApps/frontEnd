import { StyleSheet } from 'react-native';

const EstilosAgregarServicio1 = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#0B0F2F',
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  selectorBoton: {
    backgroundColor: '#FF6D3B',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  selectorTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoriaContenedor: {
    marginBottom: 25,
  },
  categoriaTitulo: {
    color: '#FFF',
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
    borderColor: '#FF6D3B',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSeleccionado: {
    backgroundColor: '#FF6D3B',
  },
  chipTexto: {
    color: '#FF6D3B',
    fontWeight: '600',
  },
  chipTextoSeleccionado: {
    color: '#FFF',
  },
  botonesContenedor: {
  paddingHorizontal: 20,
  paddingBottom: 20,
  backgroundColor: '#0B0F2F',
  gap: 10,
},
pasosContenedor: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 20,
  gap: 10,
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


export default EstilosAgregarServicio1;