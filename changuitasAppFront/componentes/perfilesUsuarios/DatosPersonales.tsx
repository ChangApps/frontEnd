import React from 'react';
import { View, Text } from 'react-native';
import estilos from '../../Pantallas/Usuario/estilos/EstilosPerfilUsuario';

interface Direccion {
  calle: string;
  altura: number;
  piso: number | null;
  nroDepto: number | null;
  barrio: string;
}

interface Usuario {
  first_name: string;
  last_name: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  direccion: Direccion;
}

interface Props {
  usuario: Usuario;
}

const formatFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
};

const DatosPersonalesUsuario: React.FC<Props> = ({ usuario }) => (
  <>
    <Text style={estilos.tituloDatosPersonales}>DATOS PERSONALES</Text>
    <View style={estilos.datosPersonales}>
      <Text style={estilos.infoUsuario}>Nombre: {usuario.first_name}</Text>
      <Text style={estilos.infoUsuario}>Apellido: {usuario.last_name}</Text>
      <Text style={estilos.infoUsuario}>
        Fecha de Nacimiento: {formatFecha(usuario.fechaNacimiento)}
      </Text>
      <Text style={estilos.infoUsuario}>Correo Electrónico: {usuario.email}</Text>
      <Text style={estilos.infoUsuario}>Teléfono: {usuario.telefono}</Text>
      <Text style={estilos.infoUsuario}>
        Dirección: {usuario.direccion.calle}, {usuario.direccion.altura}{' '}
        {usuario.direccion.piso ? `Piso ${usuario.direccion.piso}` : ''}{' '}
        {usuario.direccion.nroDepto ? `Depto ${usuario.direccion.nroDepto}` : ''}, {usuario.direccion.barrio}
      </Text>
    </View>
  </>
);

export default DatosPersonalesUsuario;
