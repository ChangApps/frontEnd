import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../../assets/Colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const CampoDescripcion: React.FC<Props> = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput
      style={estilos.input}
      placeholder={placeholder || 'Descripción'}
      placeholderTextColor={Colors.grisTexto}
      value={value}
      onChangeText={onChangeText}
      multiline
      numberOfLines={5}
    />
  );
};

const estilos = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: Colors.naranja,
    borderRadius: 12,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
  },
});

export default CampoDescripcion;