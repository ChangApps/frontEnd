import { StyleSheet } from 'react-native';

const EstilosAgregarServicio2 = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 40,
      },
      contenedorEncabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#197278', // Color de fondo de la barra
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
        color: 'black',
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
        color: 'black',
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

export default EstilosAgregarServicio2;