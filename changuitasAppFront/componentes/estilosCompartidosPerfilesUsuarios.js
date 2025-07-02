import { StyleSheet } from 'react-native';
import Colors from '../assets/Colors';

// Constantes de diseño para mantener consistencia en toda la app
export const COLORES_APP = {
  // Colores del sistema existente
  ...Colors,
  
  // Colores específicos para las pantallas de perfil y tareas
  primario: '#FC6A30',
  gris: '#666',
  grisClaro: '#ddd',
  grisBackground: '#f0f0f0',
  negro: '#333',
  rojo: 'red',
  fondoModal: 'rgba(0, 0, 0, 0.7)',
  fondoBotonModal: 'rgba(0, 0, 0, 0.5)',
  sombra: '#000',
};

export const DIMENSIONES = {
  paddingHorizontal: 20,
  paddingVertical: 15,
  paddingVerticalReducido: 10,
  borderRadius: 50,
  borderRadiusModal: 16,
  borderRadiusPequeno: 10,
  alturaNavegacion: 60,
  tamanoImagenUsuarioChico: 80,
  tamanoImagenUsuarioGrande: 160,
  tamanoImagenModal: 200,
  marginTopEncabezado: 50,
  zIndexModal: 10,
  // Posiciones específicas
  topNavegacionRelativa: -40,
};

export const FUENTES = {
  pequena: 12,
  mediana: 14,
  normal: 16,
  grande: 18,
  titulo: 22,
  encabezado: 24,
};

// Estilos base compartidos entre todas las pantallas de perfil y tareas
const EstilosCompartidos = StyleSheet.create({
  // Estados de carga y error
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORES_APP.rojo,
    fontSize: FUENTES.normal,
  },

  // Contenedores principales
  contenedor: {
    flex: 1,
    backgroundColor: COLORES_APP.fondo,
  },
  contenedorConMargenInferior: {
    flex: 1,
    backgroundColor: COLORES_APP.blanco,
    paddingBottom: DIMENSIONES.alturaNavegacion,
  },
  
  // Encabezados
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DIMENSIONES.paddingHorizontal,
    paddingVertical: DIMENSIONES.paddingVertical,
    backgroundColor: COLORES_APP.blanco,
    marginTop: DIMENSIONES.marginTopEncabezado,
  },
  encabezadoReducido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DIMENSIONES.paddingHorizontal,
    paddingVertical: DIMENSIONES.paddingVerticalReducido,
    backgroundColor: COLORES_APP.blanco,
    marginTop: DIMENSIONES.marginTopEncabezado,
  },
  textoEncabezado: {
    fontSize: FUENTES.encabezado,
    fontWeight: '600',
    color: COLORES_APP.blancoTexto,
  },
  
  // Sistema de pestañas
  barraPestanas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORES_APP.grisClaro,
    marginBottom: 20,
  },
  pestanaActiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORES_APP.primario,
  },
  pestanaInactiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoPestanaActiva: {
    fontSize: FUENTES.normal,
    color: COLORES_APP.primario,
  },
  textoPestanaInactiva: {
    fontSize: FUENTES.normal,
    color: COLORES_APP.blancoTexto,
  },
  
  // Sección de usuario - imagen pequeña (80x80)
  seccionUsuario: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuarioChica: {
    width: DIMENSIONES.tamanoImagenUsuarioChico,
    height: DIMENSIONES.tamanoImagenUsuarioChico,
    borderRadius: DIMENSIONES.tamanoImagenUsuarioChico / 2,
    backgroundColor: COLORES_APP.grisBackground,
    marginBottom: 10,
  },
  
  // Sección de usuario - imagen grande (160x160)
  imagenUsuarioGrande: {
    width: DIMENSIONES.tamanoImagenUsuarioGrande,
    height: DIMENSIONES.tamanoImagenUsuarioGrande,
    borderRadius: DIMENSIONES.tamanoImagenUsuarioGrande / 2,
    backgroundColor: COLORES_APP.grisBackground,
    marginBottom: 10,
  },
  
  nombreCompleto: {
    fontSize: FUENTES.titulo,
    fontWeight: 'bold',
    color: COLORES_APP.blancoTexto,
  },
  rolUsuario: {
    fontSize: FUENTES.normal,
    color: COLORES_APP.gris,
  },
  
  // Datos adicionales
  datosExtras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  datoItem: {
    alignItems: 'center',
  },
  datoNumero: {
    fontSize: FUENTES.grande,
    fontWeight: 'bold',
    color: COLORES_APP.blancoTexto,
  },
  datoLabel: {
    fontSize: FUENTES.mediana,
    color: COLORES_APP.grisTexto,
  },
  
  // Datos personales
  tituloDatosPersonales: {
    fontSize: FUENTES.grande,
    color: COLORES_APP.primario,
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPersonales: {
    paddingHorizontal: DIMENSIONES.paddingHorizontal,
  },
  infoUsuario: {
    fontSize: FUENTES.normal,
    color: COLORES_APP.blancoTexto,
    marginBottom: 5,
  },
  
  // Botones
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: COLORES_APP.primario,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: DIMENSIONES.borderRadius,
  },
  prevButtonText: {
    color: COLORES_APP.primario,
    fontSize: FUENTES.normal,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: COLORES_APP.primario,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: DIMENSIONES.borderRadius,
  },
  nextButtonText: {
    color: COLORES_APP.blanco,
    fontSize: FUENTES.normal,
    fontWeight: 'bold',
  },
  
  // Navegación
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: DIMENSIONES.alturaNavegacion,
    backgroundColor: COLORES_APP.blanco,
    borderTopWidth: 1,
    borderTopColor: COLORES_APP.grisClaro,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  barraNavegacionRelativa: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: DIMENSIONES.alturaNavegacion,
    backgroundColor: COLORES_APP.blanco,
    borderTopWidth: 1,
    borderTopColor: COLORES_APP.grisClaro,
    position: 'relative',
    top: DIMENSIONES.topNavegacionRelativa,
    width: '100%',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: FUENTES.pequena,
    color: 'gray',
  },
  
  // Modales base
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORES_APP.fondoModal,
  },
  modalContenido: {
    backgroundColor: COLORES_APP.blanco,
    padding: 20,
    borderRadius: DIMENSIONES.borderRadiusModal,
    width: '80%',
    alignItems: 'center',
    shadowColor: COLORES_APP.sombra,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitulo: {
    fontSize: FUENTES.titulo,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  // Modal de imagen circular
  imagenModal: {
    width: DIMENSIONES.tamanoImagenModal,
    height: DIMENSIONES.tamanoImagenModal,
    borderRadius: DIMENSIONES.tamanoImagenModal / 2,
    resizeMode: 'cover',
  },
  
  // Modal de imagen grande
  imagenGrande: {
    width: '90%',
    height: '80%',
    borderRadius: DIMENSIONES.borderRadiusPequeno,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: COLORES_APP.fondoBotonModal,
    padding: 10,
    borderRadius: DIMENSIONES.borderRadius,
  },
  closeText: {
    color: COLORES_APP.blanco,
    fontSize: FUENTES.grande,
    fontWeight: 'bold',
  },
  
  // Botón cerrar modal
  botonCerrar: {
    marginTop: 10,
    backgroundColor: COLORES_APP.primario,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: DIMENSIONES.borderRadius,
  },
  botonCerrarTexto: {
    color: COLORES_APP.blanco,
    fontSize: FUENTES.normal,
    fontWeight: 'bold',
  },
});

export default EstilosCompartidos;