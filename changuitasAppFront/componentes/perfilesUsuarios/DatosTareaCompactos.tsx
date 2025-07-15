import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  servicio: string;
  fecha: string;
  puntaje: string | number;
  estado: string;
  estilos: any;
}

const formatearFecha = (fechaISO: string): string => {
  const [anio, mes, dia] = fechaISO.split('T')[0].split('-');
  return `${dia}/${mes}/${anio}`;
};

const DatosTareaCompactos: React.FC<Props> = ({ servicio, fecha, puntaje, estado, estilos }) => {
  const fechaFormateada = formatearFecha(fecha);

  return (
    <View>
      <Text style={estilos.tituloDatosPersonales}>DATOS DE LA TAREA</Text>
      <View style={estilos.datosPersonales}>
        <Text style={estilos.infoUsuario}>Servicio: {servicio}</Text>
        <Text style={estilos.infoUsuario}>Fecha: {fechaFormateada}</Text>
        <Text style={estilos.infoUsuario}>Puntaje: {puntaje}</Text>
        <Text style={estilos.infoUsuario}>Estado: {estado}</Text>
      </View>
    </View>
  );
};

export default DatosTareaCompactos;