import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navegacion/AppNavigator';
import EstilosHome from '../Pantallas/Home/estilos/EstilosHome';

const BarraNavegacionInferior = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={EstilosHome.barraNavegacion}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={EstilosHome.iconoNavegacion}>
        <Ionicons name="home-outline" size={24} color="gray" />
        <Text style={EstilosHome.textoNavegacion}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={EstilosHome.iconoNavegacion}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <Text style={EstilosHome.textoNavegacion}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={EstilosHome.iconoNavegacion}>
        <Ionicons name="grid-outline" size={24} color="gray" />
        <Text style={EstilosHome.textoNavegacion}>Historial</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={EstilosHome.iconoNavegacion}>
        <Ionicons name="person-outline" size={24} color="gray" />
        <Text style={EstilosHome.textoNavegacion}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarraNavegacionInferior;
