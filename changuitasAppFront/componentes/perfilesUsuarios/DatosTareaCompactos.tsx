import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  servicio: string;
  fecha: string | null;
  fechaValoracion: string | null;
  puntaje: string | number;
  estado: string;
  comentario: string;
  estilos: any;
}

const formatearFecha = (fechaISO: string | null | undefined): string => {
  if (!fechaISO) {
    return 'Fecha no disponible';
  }
  if (fechaISO.trim() === '') {
    return 'Fecha inválida';
  }
  try {
    const [fechaParte] = fechaISO.split('T'); // Obtener solo la parte de la fecha (YYYY-MM-DD)
    const [anio, mes, dia] = fechaParte.split('-');
    return `${dia}/${mes}/${anio}`;
  } catch (e) {
    console.error("Error al formatear la fecha en DatosTareaCompactos:", fechaISO, e);
    return 'Formato de fecha inválido'; // Mensaje de error si el formato es incorrecto
  }
};

const DatosTareaCompactos: React.FC<Props> = ({ servicio, fecha, fechaValoracion, puntaje, estado, comentario, estilos }) => {
  const fechaFormateada = formatearFecha(fecha);

  return (
    <View>
      <Text style={estilos.tituloDatosPersonales}>DATOS DE LA TAREA</Text>
      <View style={estilos.datosPersonales}>
        <Text style={estilos.infoUsuario}>Servicio: {servicio}</Text>
        <Text style={estilos.infoUsuario}>Fecha: {fechaFormateada}</Text>
        <Text style={estilos.infoUsuario}>Puntaje: {puntaje}</Text>
        <Text style={estilos.infoUsuario}>Fecha valoracion: {fechaValoracion}</Text>
        <Text style={estilos.infoUsuario}>Estado: {estado}</Text>
        <Text style={estilos.infoUsuario}>Comentario: {comentario}</Text>
      </View>
    </View>
  );
};

export default DatosTareaCompactos;