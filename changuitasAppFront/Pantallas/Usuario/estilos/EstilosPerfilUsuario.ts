import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import EstilosCompartidos, { COLORES_APP } from '../../../componentes/estilosCompartidosPerfilesUsuarios';
import Colors from '../../../assets/Colors';

type NamedStyles = {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
};

// Estilos específicos para PerfilUsuario que no están en los compartidos
const estilosEspecificos = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
  mensajeVacio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.grisTexto,
  },
});

// Combinar estilos compartidos con específicos
const EstilosPerfilUsuario: NamedStyles = {
  ...EstilosCompartidos,
  ...estilosEspecificos,
};

export default EstilosPerfilUsuario;