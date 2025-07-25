import { StyleSheet } from 'react-native';
import EstilosCompartidos, { COLORES_APP, DIMENSIONES, FUENTES } from '../../../componentes/estilosCompartidosPerfilesUsuarios';

// Estilos específicos para DetalleTarea que no están en los compartidos
const estilosEspecificos = StyleSheet.create({
  // Desplegable específico para DetalleTarea
  desplegable: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 150,
    backgroundColor: COLORES_APP.blanco,
    borderRadius: DIMENSIONES.borderRadiusModal,
    paddingVertical: 10,
    shadowColor: COLORES_APP.sombra,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: DIMENSIONES.zIndexModal,
  },
  opcionDesplegable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: FUENTES.normal,
    color: COLORES_APP.negro,
  },
  
});

// Combinar estilos compartidos con específicos
const EstilosDetalleTarea = StyleSheet.create({
  ...EstilosCompartidos,
  ...estilosEspecificos,
});

export default EstilosDetalleTarea;