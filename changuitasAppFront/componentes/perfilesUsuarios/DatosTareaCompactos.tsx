import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  servicio: string;
  fecha: string;
  puntaje: string | number;
  estado: string;
  estilos: any;
}

const DatosTareaCompactos: React.FC<Props> = ({ servicio, fecha, puntaje, estado, estilos }) => (
  <View>
    <Text style={estilos.tituloDatosPersonales}>DATOS DE LA TAREA</Text>
    <View style={estilos.datosPersonales}>
      <Text style={estilos.infoUsuario}>Servicio: {servicio}</Text>
      <Text style={estilos.infoUsuario}>Fecha: {fecha}</Text>
      <Text style={estilos.infoUsuario}>Puntaje: {puntaje}</Text>
      <Text style={estilos.infoUsuario}>Estado: {estado}</Text>
    </View>
  </View>
);

export default DatosTareaCompactos;