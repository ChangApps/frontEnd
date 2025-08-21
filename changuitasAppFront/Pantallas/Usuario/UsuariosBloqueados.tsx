import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from '../../utils/API_URL';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import { ActivityIndicator } from 'react-native';
import EstilosUsuariosBloqueados from './estilos/EstilosUsuariosBloqueados';
import BarraPestanasPerfil from '../../utils/BarraPestanasPerfil';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import EncabezadoPerfil from '../../componentes/perfilesUsuarios/EncabezadoPerfil';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import  {redirectAdmin} from '../../utils/utils';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import EstiloOverlay from '../../componentes/estiloOverlayMenuDesplegable';


const UsuariosBloqueados = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext);
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
    } catch (error) {
      console.error('Error en el cierre de sesión:', error);
      setMessage('Error al cerrar sesión');
      setVisible(true);
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

      if (response.ok) {
        setMessage("Éxito , Usuario desbloqueado con éxito.");
        setVisible(true);
        // Filtramos la lista para quitar al usuario desbloqueado
        setUsuariosBloqueados(prevUsuarios =>
          prevUsuarios.filter(usuario => usuario.id !== idUsuario)
        );


      } else {
        setMessage("Error, No se pudo desbloquear al usuario.");
        setVisible(true);
      }
    } catch (error) {
      console.error("Error al desbloquear usuario:", error);
      setMessage("Error, No se pudo desbloquear al usuario.");
      setVisible(true);
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

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Historial1':
        navigation.navigate('Historial1');
        break;
      case 'Add':
        navigation.navigate('AgregarServicio1');
        break;
      case 'Notifications':
        navigation.navigate('Notificaciones');
        break;
      case 'PerfilUsuario':
        navigation.navigate('PerfilUsuario');
        break;
    }
  };


  return (
      <SafeAreaView style={EstilosUsuariosBloqueados.safeContainer}>
        <EncabezadoPerfil onToggleMenu={toggleDesplegable} />
        <BarraPestanasPerfil />
        {/* Overlay transparente cuando el menú está abierto para que al tocar la pantalla se cierre el menú */}
        {mostrarDesplegable && (
          <TouchableWithoutFeedback onPress={() => setMostrarDesplegable(false)}>
            <View style={EstiloOverlay.overlay} />
          </TouchableWithoutFeedback>
        )}

        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />
        <ScrollView contentContainerStyle={EstilosUsuariosBloqueados.scrollContainer}>
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
                <Text style={EstilosUsuariosBloqueados.mensajeNoUsuarios}>No tenés usuarios bloqueados</Text>
              </View>

            ) : (
              <FlatList
                data={usuariosBloqueados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={EstilosUsuariosBloqueados.usuarioBloqueado}>
                    <View style={EstilosUsuariosBloqueados.infoUsuario}>
                      <Image
                        source={{ uri: item.foto || 'https://via.placeholder.com/50' }}
                        style={EstilosUsuariosBloqueados.image}
                      />
                      <Text style={EstilosUsuariosBloqueados.nombreUsuarioBloqueado}>
                        {item.nombre}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => desbloquearUsuario(item.id)} style={EstilosUsuariosBloqueados.botonDesbloquear}>
                      <Text style={EstilosUsuariosBloqueados.botonTexto}>Desbloquear</Text>
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={EstilosUsuariosBloqueados.listaUsuarios}
              />
            )
          )}

        </ScrollView>
        {/* Barra de navegación inferior */}
        <NavBarInferior
          activeScreen="UsuarioBloqueados" // O el screen activo correspondiente
          onNavigate={handleNavigation}
        />
        <CustomSnackbar visible={visible} setVisible={setVisible} message={message}/>
      </SafeAreaView>
  );
};
export default UsuariosBloqueados;
