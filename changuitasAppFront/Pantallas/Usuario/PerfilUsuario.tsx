
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Alert,Modal, Linking} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback} from 'react-native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import EstilosPerfilUsuario from './estilos/EstilosPerfilUsuario';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import API_URL from '../../auxiliares/API_URL';
import BarraPestanasPerfil from '../../auxiliares/BarraPestanasPerfil';
import { AuthContext } from '../../autenticacion/auth';
import MenuDesplegable from '../../auxiliares/MenuDesplegable';

const PerfilUsuario: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [usuarioId, setUsuarioId] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [state,setState] = useContext(AuthContext);

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
    is_staff:boolean;
  }



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
      setError('No se pudo cargar el perfil del usuario');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={EstilosPerfilUsuario.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={EstilosPerfilUsuario.errorContainer}>
        <Text style={EstilosPerfilUsuario.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosPerfilUsuario.contenedor}>
        {/* Encabezado con opciones de menú */}
        <View style={EstilosPerfilUsuario.encabezado}>
          <Text style={EstilosPerfilUsuario.textoEncabezado}>Perfil</Text>
          <TouchableOpacity onPress={toggleDesplegable}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#F2F2F2" />
          </TouchableOpacity>
        </View>

        {/* Menú Desplegable */}
        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />
        
        {/* Barra de pestañas */}
        <BarraPestanasPerfil/>

          {/* Información del Usuario */}
          <View style={EstilosPerfilUsuario.seccionUsuario}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image 
              source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
              style={EstilosPerfilUsuario.imagenUsuario} 
            />
          </TouchableOpacity>
          <Text style={EstilosPerfilUsuario.nombreCompleto}>{usuario?.username}</Text>
        </View>
        
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={EstilosPerfilUsuario.modalContainer}>
              <Image 
                source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
                style={EstilosPerfilUsuario.imagenModal} 
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Datos adicionales */}
        <View style={EstilosPerfilUsuario.datosExtras}>
          <View style={EstilosPerfilUsuario.datoItem}>
          <Text style={EstilosPerfilUsuario.datoNumero}>{(usuario as any)?.cantServiciosContratados ?? 0}</Text>
          {/*Esta parte convierte (o "castea") el objeto usuario al tipo any.
  El tipo any en TypeScript desactiva las verificaciones de tipo, permitiendo acceder a cualquier propiedad sin que TypeScript marque un error de momento temporal*/}
            <Text style={EstilosPerfilUsuario.datoLabel}>Contrató</Text>
          </View>
          <View style={EstilosPerfilUsuario.datoItem}>
          <Text style={EstilosPerfilUsuario.datoNumero}>{(usuario as any)?.cantServiciosTrabajados ?? 0}</Text>
            <Text style={EstilosPerfilUsuario.datoLabel}>Trabajó</Text>
          </View>
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate("Resenias", { idUsuario: usuarioId });
            }}
          >
          <View style={EstilosPerfilUsuario.datoItem}>
          <Text style={EstilosPerfilUsuario.datoNumero}>{(usuario as any)?.puntaje ?? 0}</Text>
            <Text style={EstilosPerfilUsuario.datoLabel}>Puntaje</Text>
          </View>
          </TouchableOpacity>
          
        </View>
  
        {/* Datos Personales */}
        <Text style={EstilosPerfilUsuario.tituloDatosPersonales}>DATOS PERSONALES</Text>
        <View style={EstilosPerfilUsuario.datosPersonales}>
          <View style={EstilosPerfilUsuario.datosPersonalesBox}>
            <Text style={EstilosPerfilUsuario.infoUsuario}>Nombre: {usuario?.first_name}</Text>
          </View>
          <View style={EstilosPerfilUsuario.datosPersonalesBox}>
            <Text style={EstilosPerfilUsuario.infoUsuario}>Apellido: {usuario?.last_name}</Text>
          </View>
          <View style={EstilosPerfilUsuario.datosPersonalesBox}>
            <Text style={EstilosPerfilUsuario.infoUsuario}>Fecha de Nacimiento: {usuario?.fechaNacimiento}</Text>
          </View>
          <View style={EstilosPerfilUsuario.datosPersonalesBox}>
          <Text style={EstilosPerfilUsuario.infoUsuario}>Correo Electrónico: {usuario?.email}</Text>
          </View>
          <View style={EstilosPerfilUsuario.datosPersonalesBox}>
            <Text style={EstilosPerfilUsuario.infoUsuario}>Teléfono: {usuario?.telefono}</Text>
          </View>
          <View style={EstilosPerfilUsuario.datosPersonalesBox}>
            <Text style={EstilosPerfilUsuario.infoUsuario}>
              Dirección: {usuario?.direccion.calle} {usuario?.direccion.altura}{''}
              {usuario?.direccion.piso ? `Piso ${usuario?.direccion.piso}` : ''}{''}
              {usuario?.direccion.nroDepto ? `Depto ${usuario?.direccion.nroDepto}` : ''}, {usuario?.direccion.barrio}
            </Text>
          </View>
        </View>
      <BarraNavegacionInferior/>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PerfilUsuario;
