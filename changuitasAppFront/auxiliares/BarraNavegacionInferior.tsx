import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navegacion/AppNavigator';
import EstilosPerfilUsuario from '../Pantallas/Usuario/estilos/EstilosPerfilUsuario';
const BarraNavegacionInferior = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={EstilosPerfilUsuario.barraNavegacion}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={EstilosPerfilUsuario.iconoNavegacion}>
        <Ionicons name="home-outline" size={24} color="gray" />
        <Text style={EstilosPerfilUsuario.textoNavegacion}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('BuscarServicio1')} style={EstilosPerfilUsuario.iconoNavegacion}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <Text style={EstilosPerfilUsuario.textoNavegacion}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={EstilosPerfilUsuario.iconoNavegacion}>
        <Ionicons name="grid-outline" size={24} color="gray" />
        <Text style={EstilosPerfilUsuario.textoNavegacion}>Historial</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')} style={EstilosPerfilUsuario.iconoNavegacion}>
        <Ionicons name="person-outline" size={24} color="gray" />
        <Text style={EstilosPerfilUsuario.textoNavegacion}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarraNavegacionInferior;
