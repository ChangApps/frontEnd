import { StyleSheet } from 'react-native';
import EstilosCompartidos, { COLORES_APP } from '../../../componentes/estilosCompartidosPerfilesUsuarios';

// Estilos específicos para PerfilUsuario que no están en los compartidos
const estilosEspecificos = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
  // Este archivo solo usa los estilos compartidos, 
  // no tiene estilos específicos únicos
});

// Combinar estilos compartidos con específicos
const EstilosPerfilUsuario = StyleSheet.create({
  ...EstilosCompartidos,
  ...estilosEspecificos,
});

export default EstilosPerfilUsuario;