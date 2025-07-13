import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Colors from '../assets/Colors';

const PantallaCarga = () => {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size="large" color={Colors.naranja} />
      <Text style={styles.texto}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.fondo, 
  },
  texto: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.naranja,
  },
});

export default PantallaCarga;
