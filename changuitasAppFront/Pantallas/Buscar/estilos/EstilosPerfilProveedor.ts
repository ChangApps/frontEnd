import { StyleSheet, TextStyle, ViewStyle, ImageStyle, Image } from 'react-native';
import EstilosCompartidos, { COLORES_APP, FUENTES } from '../../../componentes/estilosCompartidosPerfilesUsuarios';

type NamedStyles = {
  [key: string]: ViewStyle | TextStyle | ImageStyle | ImageStyle;
};

// Estilos específicos para PerfilProveedor que no están en los compartidos
const estilosEspecificos = StyleSheet.create({
  // Estilos específicos para reseñas
  resenaItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORES_APP.grisClaro,
    paddingVertical: 10,
  },
  resenaUsuario: {
    fontWeight: 'bold',
  },
  resenaComentario: {
    fontSize: FUENTES.mediana,
    color: COLORES_APP.negro,
  },
});

// Combinar estilos compartidos con específicos
const EstilosPerfilProveedor: NamedStyles = {
  ...EstilosCompartidos,
  ...estilosEspecificos,
};

export default EstilosPerfilProveedor;