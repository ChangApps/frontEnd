import Colors from '../assets/Colors';
import { StyleSheet, Platform } from 'react-native';

const EstilosModalBuscar = StyleSheet.create({
modalContainer: {
  // En web usamos un ancho más angosto para una mejor visualización
  // En otras plataformas como Android se mantiene al 90% 
  width: Platform.OS === 'web' ? '90%' : '90%',

  // Solo para web aplicamos un ancho máximo y centramos el modal
  ...(Platform.OS === 'web'
    ? {
        maxWidth: 600,           // Evita que se estire demasiado en pantallas grandes
        alignSelf: 'center',     // Centra el modal horizontalmente
      }
    : {}),

  // Fondo y padding comunes a todas las plataformas
  backgroundColor: Colors.fondo,
  padding: 16,
  borderRadius: 10,
},
  botonCerrar: {
    alignSelf: 'flex-end',
  },
  cuadroIcono: {
  backgroundColor: Colors.naranja, 
  padding: 6,
  borderRadius: 6,
},
  tituloSeccion: {
    color: Colors.grisTexto,
    fontSize: 14,
    position: 'absolute',
    top: 10, 
  },
    tituloRango: {
    color: Colors.grisTexto,
    fontSize: 14,
    marginTop: -5,
  },
  subtitulo: {
    color: Colors.naranja,
    fontWeight: 'bold',
    marginVertical: 6,
    marginTop:25,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  opcion: {
    borderWidth: 1,
    borderColor: Colors.naranja,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  opcionSeleccionada: {
    backgroundColor: Colors.naranja,
  },
  textoOpcion: {
    color: 'white',
  },
  botonesFiltrado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  botonFiltrado: {
    padding: 10,
    borderRadius: 20,
    minWidth: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.naranja,
  },
  eliminar: {
    backgroundColor: 'transparent',
  },
  aplicar: {
    backgroundColor: Colors.naranja,
  },
textoEliminar: {
  color: Colors.naranja,
  fontWeight: 'bold',
},
textoAplicar: {
  color: 'black',
  fontWeight: 'bold',
},
});
export default EstilosModalBuscar;


