import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import estilos from '../../Pantallas/Usuario/estilos/EstilosPerfilUsuario';

interface Props {
  onToggleMenu: () => void;
}

const EncabezadoPerfil: React.FC<Props> = ({ onToggleMenu }) => (
  <View style={estilos.encabezado}>
    <Text style={estilos.textoEncabezado}>Perfil</Text>
    <TouchableOpacity onPress={onToggleMenu}>
      <Ionicons name="ellipsis-horizontal" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export default EncabezadoPerfil;
