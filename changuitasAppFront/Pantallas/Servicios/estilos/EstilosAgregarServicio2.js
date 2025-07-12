import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosAgregarServicio2 = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: Colors.fondo,
    paddingTop: 50,
  },
      contenedorEncabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:Colors.naranja, // Color de fondo de la barra
        paddingHorizontal: 15,
        paddingVertical: 10,
      },
      encabezado: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', // Color de texto blanco
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
      campoDescripcion: {
        borderWidth: 1,
        borderColor: '#197278',
        borderRadius: 8,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
      },
      encabezadoDias: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      etiquetaDia: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '600',
      },
      etiquetaHora: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '600',
      },
      filaDia: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
      textoDia: {
        fontSize: 16,
        color:Colors.blancoTexto,
        marginLeft: 8,
        flex: 1,
      },
      campoHora: {
        borderWidth: 1,
        borderColor: '#ddd',
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
      botonAtras: {
        borderWidth: 1,
        borderColor: '#197278',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
      },
      textoBotonAtras: {
        color: '#197278',
        fontSize: 16,
        fontWeight: 'bold',
      },
      botonSiguiente: {
        backgroundColor: '#197278',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
      },
      textoBotonSiguiente: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
        borderColor: Colors.naranja, // Color del borde
        borderRadius: 8, // Bordes redondeados
        backgroundColor: 'white', // Fondo blanco
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        shadowRadius: 4, // Radio de la sombra
        elevation: 4, // Elevación para Android
      },
      pasosWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: '#1D233B',
  borderRadius: 30,
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginVertical: 15,
  gap: 10,
},
pasoActivo: {
  backgroundColor:  Colors.naranja,
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
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},
pasoTextoInactivo: {
  color:  Colors.naranja,
  fontWeight: 'bold',
  fontSize: 14,
},
    });

export default EstilosAgregarServicio2;