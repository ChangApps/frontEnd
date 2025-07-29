import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Usuario = {
  id: number;
  first_name: string;
  last_name: string;
  fotoPerfil?: string;
};

type Solicitud = {
  id: number;
  cliente?: number;
  proveedor_id?: number;
  servicio_id?: number;
};

type Props = {
  historial: Solicitud[];
  usuarios: Usuario[];
  navigation: any;
  claveUsuario: 'cliente' | 'proveedor_id';
  estiloCard?: ViewStyle;
  estiloAvatar?: ImageStyle;
  estiloNombre?: TextStyle;
  estiloOficio?: TextStyle;
  onPerfilPress?: () => void;
};

const ResultadoListSimple = ({
  historial,
  usuarios,
  navigation,
  claveUsuario,
  estiloCard,
  estiloAvatar,
  estiloNombre,
  estiloOficio,
  onPerfilPress,
}: Props) => {
  return (
    <FlatList
      data={historial}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const idUsuario = item[claveUsuario];
        const usuario = usuarios.find(u => u.id === idUsuario);
        const servicioId = item.servicio_id;

        return (
          <View style={estiloCard}>
            <Image
              style={estiloAvatar}
              source={{ uri: usuario?.fotoPerfil || 'https://via.placeholder.com/40' }}
            />

            <Text style={estiloNombre || {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
              justifyContent: 'center',
              textAlign: 'center',
              marginBottom: 4,
            }}>
              {`${usuario?.first_name || 'Nombre'} ${usuario?.last_name || ''}`}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (onPerfilPress) {
                  onPerfilPress();
                }
                navigation.navigate('PerfilProveedor', {
                  id: usuario?.id?.toString() || 'No disponible',
                  servicio: servicioId, 
                });
              }}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default ResultadoListSimple;