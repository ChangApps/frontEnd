import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import EstilosPerfilUsuario from '../Pantallas/Usuario/estilos/EstilosPerfilUsuario'; 
import { RootStackParamList } from '../navegacion/AppNavigator';

const BarraPestanasPerfil = () => {
   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={EstilosPerfilUsuario.barraPestanas}>
      <TouchableOpacity style={EstilosPerfilUsuario.pestanaActiva} onPress={() => navigation.navigate('Home')}>
        <Text style={EstilosPerfilUsuario.textoPestanaActiva}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={EstilosPerfilUsuario.pestanaInactiva} onPress={() => navigation.navigate('EditarPerfil')}>
        <Text style={EstilosPerfilUsuario.textoPestanaInactiva}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={EstilosPerfilUsuario.pestanaInactiva} onPress={() => navigation.navigate('MisServicios')}>
        <Text style={EstilosPerfilUsuario.textoPestanaInactiva}>Mis servicios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={EstilosPerfilUsuario.pestanaInactiva} onPress={() => navigation.navigate('UsuariosBloqueados')}>
        <Text style={EstilosPerfilUsuario.textoPestanaInactiva}>Bloqueados</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarraPestanasPerfil;