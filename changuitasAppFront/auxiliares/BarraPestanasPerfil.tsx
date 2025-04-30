import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import EstilosPerfilUsuario from '../Pantallas/Usuario/estilos/EstilosPerfilUsuario';
import { RootStackParamList } from '../navegacion/AppNavigator';

const BarraPestanasPerfil = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute(); // Usamos useRoute para obtener la pantalla actual
  const [pestanaActiva, setPestanaActiva] = useState<string>('Perfil'); 

  // Actualiza  a la pestaña activa cuando cambie la ruta
  useEffect(() => {
    const rutaActual = route.name; 
    setPestanaActiva(rutaActual);
  }, [route.name]);

  return (
    <View style={EstilosPerfilUsuario.barraPestanas}>
      <TouchableOpacity
        style={pestanaActiva === 'PerfilUsuario' ? EstilosPerfilUsuario.pestanaActiva : EstilosPerfilUsuario.pestanaInactiva}
        onPress={() => navigation.navigate('PerfilUsuario')}
      >
        <Text style={pestanaActiva === 'PerfilUsuario' ? EstilosPerfilUsuario.textoPestanaActiva : EstilosPerfilUsuario.textoPestanaInactiva}>
          Perfil
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={pestanaActiva === 'EditarPerfil' ? EstilosPerfilUsuario.pestanaActiva : EstilosPerfilUsuario.pestanaInactiva}
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <Text style={pestanaActiva === 'EditarPerfil' ? EstilosPerfilUsuario.textoPestanaActiva : EstilosPerfilUsuario.textoPestanaInactiva}>
          Editar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={pestanaActiva === 'MisServicios' ? EstilosPerfilUsuario.pestanaActiva : EstilosPerfilUsuario.pestanaInactiva}
        onPress={() => navigation.navigate('MisServicios')}
      >
        <Text style={pestanaActiva === 'MisServicios' ? EstilosPerfilUsuario.textoPestanaActiva : EstilosPerfilUsuario.textoPestanaInactiva}>
          Mis servicios
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={pestanaActiva === 'UsuariosBloqueados' ? EstilosPerfilUsuario.pestanaActiva : EstilosPerfilUsuario.pestanaInactiva}
        onPress={() => navigation.navigate('UsuariosBloqueados')}
      >
        <Text style={pestanaActiva === 'UsuariosBloqueados' ? EstilosPerfilUsuario.textoPestanaActiva : EstilosPerfilUsuario.textoPestanaInactiva}>
          Bloqueados
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarraPestanasPerfil;