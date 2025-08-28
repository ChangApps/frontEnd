import {Linking } from 'react-native';
import API_URL from './API_URL';

export const capitalizarPrimeraLetra = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};


export const redirectAdmin = () => {
  Linking.openURL(`${API_URL}/admin/`);
};