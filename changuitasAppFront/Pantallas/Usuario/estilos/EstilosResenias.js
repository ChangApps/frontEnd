import { StyleSheet } from 'react-native';

const EstilosResenias = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#191A2E',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop:30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        flex: 1,  // Esto permite que el título se quede en el medio y el toggle se mueva a la derecha
    },
    toggleContainer: {
        marginLeft: 30,  // Asegura que el toggle se alinee a la derecha
    },
    reseniaItem: {
        backgroundColor: '#333237',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerResenia: {
        flexDirection: 'column',
        marginBottom: 15, // Aumenta el espacio entre comentarios y fecha
    },
    categoria: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 5, // Espacio entre comentario y fecha
    },
    fecha: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5, // Espacio entre fecha y solicitud
    },
    descripcion: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    rating: {
        flexDirection: 'row',
        marginTop: 5,
    },
    valoracion: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 10, // Espacio debajo de la valoración
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
    mensajeVacio: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    desplegable: {
        position: 'absolute',
        top: 70,
        right: 20,
        width: 150,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        zIndex: 10,
      },
      opcionDesplegable: {
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      textoDesplegable: {
        fontSize: 16,
        color: '#333333',
      },
});
export default EstilosResenias;