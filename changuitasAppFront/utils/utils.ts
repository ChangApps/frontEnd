import {Linking } from 'react-native';

export const capitalizarPrimeraLetra = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};


export const redirectAdmin = () => {
  Linking.openURL('http://127.0.0.1:8000/admin/');
};