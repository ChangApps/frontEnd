import React from 'react';
import { View, Text } from 'react-native';
import estilos from '../../Pantallas/Usuario/estilos/EstilosPerfilUsuario';
import Colors from '../../assets/Colors';

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
    <Text style={[estilos.tituloDatosPersonales, { fontWeight: 'bold' }]}>DATOS PERSONALES</Text>
    <View style={estilos.datosPersonales}>
      <View style={estilos.infoBox}>
        <Text style={estilos.infoUsuario}>
          <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
            Nombre:
          </Text>{" "}
          <Text >
            {usuario.first_name}
          </Text>
        </Text>
      </View>
      <View style={estilos.infoBox}>
        <Text style={estilos.infoUsuario}>
          <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
            Apellido:
          </Text>{" "}
          <Text >
            {usuario.last_name}
          </Text>
        </Text>
      </View>
      <View style={estilos.infoBox}>
        <Text style={estilos.infoUsuario}>
          <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
            Fecha de nacimiento:
          </Text>{" "}
          <Text >
            {formatFecha(usuario.fechaNacimiento)}
          </Text>
        </Text>
      </View>
      <View style={estilos.infoBox}>
        <Text style={estilos.infoUsuario}>
          <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
            Correo:
          </Text>{" "}
          <Text >
            {usuario.email}
          </Text>
        </Text>
      </View>
      <View style={estilos.infoBox}>
        <Text style={estilos.infoUsuario}>
          <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
            Teléfono:
          </Text>{" "}
          <Text >
            {usuario.telefono}
          </Text>
        </Text>
      </View>
     <View style={[estilos.infoBox, { paddingBottom: 20 }]}>
  {/* Título */}
  <Text style={[estilos.infoUsuario, { fontWeight: 'bold', color: Colors.naranja }]}>
    Dirección:
  </Text>

  {/* Lista compacta */}
  <View style={{ marginLeft: 12, marginTop: 2 }}>
    <Text style={[estilos.infoUsuario, { marginVertical: 0, lineHeight: 18 }]}>
      <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>Calle: </Text>
      <Text style={{ color: 'white' }}>{usuario.direccion.calle}</Text>
    </Text>

    <Text style={[estilos.infoUsuario, { marginVertical: 0, lineHeight: 18 }]}>
      <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>Altura: </Text>
      <Text style={{ color: 'white' }}>{usuario.direccion.altura}</Text>
    </Text>

    {usuario.direccion.piso != null && (
      <Text style={[estilos.infoUsuario, { marginVertical: 0, lineHeight: 18 }]}>
        <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>Piso: </Text>
        <Text style={{ color: 'white' }}>{usuario.direccion.piso}</Text>
      </Text>
    )}

    {usuario.direccion.nroDepto != null && (
      <Text style={[estilos.infoUsuario, { marginVertical: 0, lineHeight: 18 }]}>
        <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>Departamento: </Text>
        <Text style={{ color: 'white' }}>{usuario.direccion.nroDepto}</Text>
      </Text>
    )}

    <Text style={[estilos.infoUsuario, { marginVertical: 0, lineHeight: 18 }]}>
      <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>Barrio: </Text>
      <Text style={{ color: 'white' }}>{usuario.direccion.barrio}</Text>
    </Text>
  </View>
</View>


    </View>
  </>
);

export default DatosPersonalesUsuario;
