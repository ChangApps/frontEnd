import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import ModalBuscar from '../componentes/ModalBuscar';
import { RootStackParamList } from '../navegacion/AppNavigator';

const BarraNavegacionInferior = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [mostrarModalBuscar, setMostrarModalBuscar] = useState(false);

  const alturaBase = Platform.OS === "web" ? 70 : 100;
  const alturaFinal = alturaBase + insets.bottom;

  return (
    <>
      {/* Modal de búsqueda */}
      <ModalBuscar visible={mostrarModalBuscar} onClose={() => setMostrarModalBuscar(false)} />

      {/* Barra de navegación */}
      <SafeAreaView
        edges={['bottom']}
        style={[
          estilos.barraNavegacion,
          {
            height: alturaFinal,
            paddingBottom: insets.bottom,
            bottom: Platform.OS === 'android' ? -insets.bottom : 0,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={estilos.iconoNavegacion}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMostrarModalBuscar(true)} style={estilos.iconoNavegacion}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Historial1')} style={estilos.iconoNavegacion}>
          <Ionicons name="grid-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')} style={estilos.iconoNavegacion}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Perfil</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const estilos = StyleSheet.create({
  barraNavegacion: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 100,
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
});

export default BarraNavegacionInferior;
