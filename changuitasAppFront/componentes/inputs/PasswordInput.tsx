import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps extends TextInputProps {
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: number;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  backgroundColor = '#333237',
  borderRadius = 15,
  padding = 15,
  fontSize = 16,
  style,
  ...rest
}) => {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor,
            borderRadius,
            padding,
            fontSize,
          },
          style,
        ]}
        secureTextEntry={!mostrarContrasena}
        placeholderTextColor="#666"
        {...rest}
      />
      <TouchableOpacity
        style={styles.icono}
        onPress={() => setMostrarContrasena(!mostrarContrasena)}
      >
        <Ionicons
          name={mostrarContrasena ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  icono: {
    position: 'absolute',
    right: 15,
  },
});

export default PasswordInput;
