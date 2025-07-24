import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const EstilosResenias = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: Colors.fondo,
        backgroundColor: Colors.fondo,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
        backgroundColor: Colors.grisBoxes,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: Colors.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerResenia: {
        flexDirection: 'column',
        marginBottom: 15,
    },
    categoria: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.blancoTexto,
        marginBottom: 5,
    },
    fecha: {
        fontSize: 14,
        color: Colors.grisTexto,
        marginBottom: 5,
    },
    rating: {
        flexDirection: 'row',
        marginTop: 5,
    },
    valoracion: {
        fontSize: 14,
        color: Colors.blancoTexto,
        marginBottom: 10,
    },
    mensajeVacio: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: Colors.grisTexto,
    },
    desplegable: {
        position: 'absolute',
        top: 70,
        right: 20,
        width: 150,
        backgroundColor: Colors.blancoTexto,
        borderRadius: 16,
        paddingVertical: 10,
        shadowColor: Colors.negro,
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
        color: Colors.negro,
      },
});
export default EstilosResenias;