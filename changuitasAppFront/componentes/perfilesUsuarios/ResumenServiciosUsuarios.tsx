import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import estilos from '../../Pantallas/Usuario/estilos/EstilosPerfilUsuario';
import { useNavigation } from '@react-navigation/native';

interface Props {
  usuarioId: string;
  contratados: number;
  trabajados: number;
  puntaje: number;
}

const ResumenServiciosUsuario: React.FC<Props> = ({ usuarioId, contratados, trabajados, puntaje }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={estilos.datosExtras}>
    <TouchableOpacity onPress={() => navigation.navigate("Historial1")}>
      <View style={estilos.datoItem}>
        <Text style={estilos.datoNumero}>{contratados}</Text>
        <Text style={estilos.datoLabel}>Contrató</Text>
      </View>
       </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Historial2")}>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>{trabajados}</Text>
          <Text style={estilos.datoLabel}>Trabajó</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Resenias", { idUsuario: usuarioId })}>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>{puntaje}</Text>
          <Text style={estilos.datoLabel}>Puntaje</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ResumenServiciosUsuario;