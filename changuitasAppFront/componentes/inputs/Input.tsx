import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';
import Colors from '../../assets/Colors';

interface InputProps extends TextInputProps {
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: number;
}

const Input: React.FC<InputProps> = ({
  backgroundColor = Colors.grisBoxes,
  borderRadius = 15,
  padding = 15,
  fontSize = 16,
  style,
  ...rest
}) => {
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
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    color: Colors.blancoTexto,
  },
});

export default Input;
