import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import EstilosPerfilUsuario from '../Pantallas/Usuario/estilos/EstilosPerfilUsuario';
import { RootStackParamList } from '../navegacion/AppNavigator';

const BarraPestanasPerfil = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute(); // Usamos useRoute para obtener la pantalla actual
  const [pestanaActiva, setPestanaActiva] = useState<string>('Perfil'); 

  // Actualiza  a la pestaña activa cuando cambie la ruta
  useEffect(() => {
    const rutaActual = route.name; 
    setPestanaActiva(rutaActual);
  }, [route.name]);

  const pestanas = [
    { label: 'Perfil', route: 'PerfilUsuario' },
    { label: 'Editar', route: 'EditarPerfil' },
    { label: 'Servicios', route: 'MisServicios' },
    { label: 'Bloqueados', route: 'UsuariosBloqueados' },
  ];

  return (
    <View style={EstilosPerfilUsuario.barraPestanas}>
      {pestanas.map((pestana) => {
        const activa = pestanaActiva === pestana.route;
        return (
          <TouchableOpacity
            key={pestana.route}
            style={[
              EstilosPerfilUsuario.pestana,
              { flex: 1 },
              activa ? EstilosPerfilUsuario.pestanaActiva : EstilosPerfilUsuario.pestanaInactiva,
            ]}
            onPress={() => {
              setPestanaActiva(pestana.route);
              navigation.navigate(pestana.route as never);
            }}
          >
            <Text style={activa ? EstilosPerfilUsuario.textoPestanaActiva : EstilosPerfilUsuario.textoPestanaInactiva}>
              {pestana.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BarraPestanasPerfil;