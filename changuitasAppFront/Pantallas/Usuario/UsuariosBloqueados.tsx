import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,Alert, FlatList,Image,TouchableWithoutFeedback, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from '../../utils/API_URL';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import { ActivityIndicator } from 'react-native';
import EstilosUsuariosBloqueados from './estilos/EstilosUsuariosBloqueados';
import BarraNavegacionInferior from '../../utils/BarraNavegacionInferior';
import BarraPestanasPerfil from '../../utils/BarraPestanasPerfil';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import EncabezadoPerfil from '../../componentes/perfilesUsuarios/EncabezadoPerfil';

const redirectAdmin = () => {
  Linking.openURL('http://127.0.0.1:8000/admin/');
};

const UsuariosBloqueados = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state,setState] = useContext(AuthContext);
  const [usuariosBloqueados, setUsuariosBloqueados] = useState<any[]>([]);


  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
 
  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    }  catch (error: any) {
        console.log('Error en el cierre de sesión:', error.message);
        Alert.alert("Error", error.message);
    } finally {
    console.log("Intentando ir al iniciar sesion ");
    navigation.reset({
      index: 0,
      routes: [{ name: "InicioDeSesion" }],
    });
    }
  };

  const desbloquearUsuario = async (idUsuario: number) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/desbloquear/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ usuario_id: idUsuario }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        Alert.alert("Éxito", "Usuario desbloqueado con éxito.");
        
        // Filtramos la lista para quitar al usuario desbloqueado
        setUsuariosBloqueados(prevUsuarios =>
          prevUsuarios.filter(usuario => usuario.id !== idUsuario)
        );

  
      } else {
        Alert.alert("Error", data.error || "No se pudo desbloquear al usuario.");
      }
    } catch (error) {
      console.error("Error al desbloquear usuario:", error);
      Alert.alert("Error", "No se pudo desbloquear al usuario.");
    }
  };

  const verUsuariosBloqueados = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bloqueados/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener usuarios bloqueados: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Usuarios bloqueados:", data);
  
     
      setUsuariosBloqueados((data as any).map((usuario: any) => ({
        id: usuario.id,
        nombre: `${usuario.first_name} ${usuario.last_name}`,
        foto: usuario.fotoPerfil ? `${API_URL}${usuario.fotoPerfil}` : 'https://via.placeholder.com/50'
      })));
  
    } catch (error) {
      console.error("Error al obtener usuarios bloqueados:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    verUsuariosBloqueados();
  }, []);
 
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosUsuariosBloqueados.contenedor}>
        {/* Header con Perfil*/}
        <EncabezadoPerfil onToggleMenu={toggleDesplegable} />
        <MenuDesplegable visible={mostrarDesplegable} usuario={state.usuario} onLogout={logout} onRedirectAdmin={redirectAdmin} />

      {/* Barra de pestañas */}
      <BarraPestanasPerfil/>
      
  {loading ? (
        <ActivityIndicator size="large" color="#197278" />
      ) : (
        usuariosBloqueados.length === 0 ? (
          <View style={EstilosUsuariosBloqueados.noResultsContainer}>
                      <Image
                        source={require('./estilos/no-results.png')}
                        style={EstilosUsuariosBloqueados.noResultsImage}
                        resizeMode="contain"
                      />
                      <Text style={EstilosUsuariosBloqueados.mensajeNoUsuarios}>No tienes usuarios bloqueados.</Text> 
                    </View>

        ) : (
          <FlatList
            data={usuariosBloqueados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={EstilosUsuariosBloqueados.usuarioBloqueado}>
                <Image 
                  source={{ uri: item.foto || 'https://via.placeholder.com/50' }} 
                  style={EstilosUsuariosBloqueados.image} 
                />
                <Text>{item.nombre}</Text>
                <TouchableOpacity onPress={() => desbloquearUsuario(item.id)}>
                  <Text style={EstilosUsuariosBloqueados.botonDesbloquear}>Desbloquear</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={EstilosUsuariosBloqueados.listaUsuarios}
          />
        )
      )}

        {/* Barra de navegación inferior */}
        <BarraNavegacionInferior/>        
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default UsuariosBloqueados;
