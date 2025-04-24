import { StyleSheet } from 'react-native';

const EstilosBuscarServicio2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#197278', // Color de fondo
    color: 'white', // Color del texto
    fontSize: 18, // Tamaño del texto
    fontWeight: '600', // Negrita
    paddingVertical: 10, // Espaciado vertical interno
    paddingHorizontal: 15, // Espaciado horizontal interno
    textAlign: 'left', // Alineación a la izquierda
    marginBottom: 15, // Margen inferior
  },
  
  
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  dayContainer: {
    marginTop: 20,
  },
  dayLabel: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
    marginBottom: 10,
  },
  hourLabel: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
    position: 'absolute',
    right: 20,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    flex: 1,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: 60,
    textAlign: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  toText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 70,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 40,
  },
  prevButtonText: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 40,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 121,
    marginVertical: 10,
  },
  pickerItem: {
    fontSize: 50, // Aumenta el tamaño de la fuente para que sea más fácil de leer
    paddingVertical: 30, // Da más espacio entre las opciones
  },
  pickerContainer: {
    borderWidth: 1, // Borde alrededor del contenedor
    borderColor: '#197278', // Color del borde
    borderRadius: 8, // Bordes redondeados
    backgroundColor: 'white', // Fondo blanco
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 4, // Elevación para Android
  },
});

export default EstilosBuscarServicio2;
