import { StyleSheet } from 'react-native';
import EstilosCompartidos, { COLORES_APP } from '../../../componentes/estilosCompartidosPerfilesUsuarios';
import Colors from '../../../assets/Colors';

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
  // Este archivo solo usa los estilos compartidos, 
  // no tiene estilos específicos únicos
});

// Combinar estilos compartidos con específicos
const EstilosPerfilUsuario = StyleSheet.create({
  ...EstilosCompartidos,
  ...estilosEspecificos,
});

export default EstilosPerfilUsuario;