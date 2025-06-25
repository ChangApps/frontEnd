import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import estilos from '../../Pantallas/Usuario/estilos/EstilosPerfilUsuario';

interface Props {
  nombre: string;
  apellido: string;
  imagen?: React.ReactNode;
}

const InfoUsuarioCompacto: React.FC<Props> = ({ nombre, apellido, imagen }) => (
  <View style={styles.container}>
    {imagen}
    <Text style={estilos.infoUsuario}>{nombre} {apellido}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 10 },
  nombre: { fontSize: 18, fontWeight: '600' }
});

export default InfoUsuarioCompacto;