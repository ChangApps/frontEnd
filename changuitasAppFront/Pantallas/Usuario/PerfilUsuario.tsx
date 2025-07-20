import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Linking, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback } from 'react-native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { cerrarSesion } from '../../autenticacion/authService';
import EstilosPerfilUsuario from './estilos/EstilosPerfilUsuario';
import API_URL from '../../utils/API_URL';
import BarraPestanasPerfil from '../../utils/BarraPestanasPerfil';
import { AuthContext } from '../../autenticacion/auth';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import EncabezadoPerfil from '../../componentes/perfilesUsuarios/EncabezadoPerfil';
import ImagenPerfilUsuario from '../../componentes/perfilesUsuarios/ImagenPerfilUsuario';
import ResumenServiciosUsuario from '../../componentes/perfilesUsuarios/ResumenServiciosUsuarios';
import DatosPersonalesUsuario from '../../componentes/perfilesUsuarios/DatosPersonales';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import PantallaCarga from '../../componentes/PantallaCarga';

const PerfilUsuario: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [usuarioId, setUsuarioId] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [state, setState] = useContext(AuthContext);

  const handleImagePress = () => {
    setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
  };

  // Interfaz para el tipo de datos del usuario
  interface Direccion {
    calle: string;
    altura: number;
    piso: number | null;
    nroDepto: number | null;
    barrio: string;
  }

  interface Usuario {
    username: string;
    first_name: string;
    last_name: string;
    fechaNacimiento: string;
    email: string;
    telefono: string;
    direccion: Direccion;
    fotoPerfil: string | null;
    is_staff: boolean;
  }



  const logout = async () => {
    try {

      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error: any) {
      console.log('Error en el cierre de sesión:', error.message);
    } finally {
      console.log("Intentando ir al iniciar sesion ");
      navigation.reset({
        index: 0,
        routes: [{ name: "InicioDeSesion" }],
      });
    }
  };

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Token obtenido de AsyncStorage:', accessToken);

      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }

      const userId = await AsyncStorage.getItem('userId');
      setUsuarioId(userId ?? ""); // Si es null, se asigna ""

      console.log('ID del usuario extraído:', userId);

      const response = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Error al obtener el usuario: ${response.status}`);
      }

      const data: Usuario = await response.json();
      console.log('Datos del usuario recibidos:', data);
      setUsuario(data);
      setImageUri(data.fotoPerfil || 'https://via.placeholder.com/80');

    } catch (error: any) {
      console.error('Error al cargar datos del usuario:', error);
      setMessage('Error al cargar datos del usuario');
      setVisible(true);
    } finally {
      setCargando(false);
    }
  };

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
        // Navegar a notificaciones
        break;
      case 'PerfilUsuario':
        navigation.navigate('PerfilUsuario');
        break;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => mostrarDesplegable && setMostrarDesplegable(false)}>
      <SafeAreaView edges={['top']} style={EstilosPerfilUsuario.safeContainer}>
        <ScrollView contentContainerStyle={EstilosPerfilUsuario.scrollContainer}>
        <EncabezadoPerfil onToggleMenu={toggleDesplegable} />
        <MenuDesplegable visible={mostrarDesplegable} usuario={state.usuario} onLogout={logout} onRedirectAdmin={redirectAdmin} />
        <BarraPestanasPerfil />
        {cargando ? (
          <PantallaCarga frase="Cargando perfil..." />
        ) : message ? (
          <Text style={EstilosPerfilUsuario.mensajeVacio}>{message}</Text>
        ) : (
          <>
            <View style={EstilosPerfilUsuario.seccionUsuario}>
              <ImagenPerfilUsuario
                imageUri={imageUri}
                modalVisible={modalVisible}
                onImagePress={handleImagePress}
                onCloseModal={handleCloseModal}
              />
              <Text style={EstilosPerfilUsuario.nombreCompleto}>{usuario?.username}</Text>
            </View>
            <ResumenServiciosUsuario
              usuarioId={usuarioId}
              contratados={(usuario as any)?.cantServiciosContratados ?? 0}
              trabajados={(usuario as any)?.cantServiciosTrabajados ?? 0}
              puntaje={(usuario as any)?.puntaje ?? 0}
            />
            {usuario && <DatosPersonalesUsuario usuario={usuario} />}
          </>
        )}
        <CustomSnackbar visible={visible} setVisible={setVisible} message={message}/>
        </ScrollView>
        {/* Barra de navegación inferior */}
        <NavBarInferior
          activeScreen="PerfilUsuario" // O el screen activo correspondiente
          onNavigate={handleNavigation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PerfilUsuario;
