import { StyleSheet } from 'react-native';
const  EstilosUsuariosBloqueados = StyleSheet.create({
    contenedor: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop:43,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'white',
      marginTop: 5,
    },
    textoEncabezado: {
      fontSize: 24,
      fontWeight: '600',
      marginRight: 300,
    },
    encabezado: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
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
    opcion: {
      fontSize: 16,
      color: 'gray',
    },
    opcionSeleccionada: {
      color: '#197278',
      fontWeight: '600',
    },
    cargando: {
      textAlign: 'center',
      fontSize: 16,
      marginVertical: 20,
      color: '#197278',
    },
    sinServicios: {
      textAlign: 'center',
      fontSize: 16,
      color: '#666',
      marginVertical: 20,
    },
    listaUsuarios: {
      paddingHorizontal: 15,
      paddingBottom: 80, 
    },
    usuarioBloqueado: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 5,
      borderRadius: 8,
      elevation: 2,
    },
    botonDesbloquear: {
      backgroundColor: '#197278',
      color: 'white',
      padding: 10,
      borderRadius: 5,
      textAlign: 'center',
      marginTop: 5
    },
    seccionFoto: {
      alignItems: 'center',
      marginVertical: 20,
    },
    imagenUsuario: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#f0f0f0',
    },
    cambiarFotoTexto: {
      color: '#197278',
      marginTop: 10,
    },
    formulario: {
      paddingHorizontal: 20,
      marginTop: -20,
    },
    label: {
      fontSize: 16,
      color: '#666',
      marginTop: 20,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: '#f0f0f0',
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
    botonGuardarCambios: {
      backgroundColor: '#197278',
      paddingVertical: 12,
      borderRadius: 50,
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
      marginTop: -130,
    },
    textoBotonGuardar: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 5,
      backgroundColor: '#E0E0E0',
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
      marginTop: 20,
    }
  });
export default EstilosUsuariosBloqueados;
