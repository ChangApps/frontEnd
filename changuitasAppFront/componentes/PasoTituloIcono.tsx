import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasoTituloIconoProps {
  iconName: keyof typeof Ionicons.glyphMap;
  texto: string;
  backgroundColor?: string;
  iconColor?: string;
  textoColor?: string;
}

const PasoTituloIcono: React.FC<PasoTituloIconoProps> = ({
  iconName,
  texto,
  backgroundColor = '#FC6A30',
  iconColor = '#F2F2F2',
  textoColor = '#FC6A30',
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconBackground, { backgroundColor }]}>
        <Ionicons name={iconName} size={48} color={iconColor} />
      </View>
      <Text style={[styles.texto, { color: textoColor }]}>{texto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  iconBackground: {
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  texto: {
    fontSize: 20,
  },
});

export default PasoTituloIcono;
