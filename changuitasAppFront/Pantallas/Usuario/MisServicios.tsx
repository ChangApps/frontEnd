import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, Linking, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from '../../utils/API_URL';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import EstilosMisServicios from './estilos/EstilosMisServicios';
import BarraPestanasPerfil from '../../utils/BarraPestanasPerfil';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import EncabezadoPerfil from '../../componentes/perfilesUsuarios/EncabezadoPerfil';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../assets/Colors';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { redirectAdmin } from '../../utils/utils';
import {Servicio} from '../../types/interfaces';

const MisServicios = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [services, setServices] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState(null);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error: any) {
      console.log('Error en el cierre de sesión:', error.message);
      setMessage('Error al cerrar sesion');
      setVisible(true);
    } 
  };

  const EliminarServicio = async (serviceId: any) => {
    try {
      // Almacena el id del servicio en la variable de estado antes de borrar
      setIdServicioSeleccionado(serviceId);

      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Token de acceso no encontrado');
      }

      console.log("Eliminado el servicio: ", serviceId);

      const response = await fetch(`${API_URL}/servicios/${serviceId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {

        console.log("Se elimino el servicio correctamente");
        // Actualiza la lista de servicios eliminando el servicio borrado.
        setServices(services.filter(servicio => servicio.id !== serviceId));

        // Reinicia la variable de id a null después de borrar el servicio
        setIdServicioSeleccionado(null);
      } else {
        setMessage('Error al eliminar servicio');
        setVisible(true);
      }
    } catch (error) {
      console.error("Error eliminando el servicio:", error);
    }
  };


  const fetchUsuario = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error('Token de acceso o ID de usuario no encontrado');
      }

      const response = await fetch(`${API_URL}/servicios/por-usuario/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener servicios: ${response.status}`);
      }

      const data: Servicio[] = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error al cargar los servicios del usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const renderServiceItem = ({ item }: { item: Servicio }) => (
    <View style={EstilosMisServicios.servicioCard}>
      <Text style={EstilosMisServicios.nombreServicio}>{item.nombreServicio}</Text>
      <Text style={EstilosMisServicios.descripcion}>{item.descripcion}</Text>
      {item.dias && item.dias.map((dia, index) => (
        <Text key={index} style={EstilosMisServicios.horario}>
          {dia.dia}: {dia.desdeHora} - {dia.hastaHora}
        </Text>
      ))}
      {/* Fallback for original single day format */}
      {!item.dias && (
        <Text style={EstilosMisServicios.horario}>
          {item.dia}: {item.desdeHora} - {item.hastaHora}
        </Text>
      )}

      {/* Botón para eliminar el servicio */}
      <TouchableOpacity
        style={EstilosMisServicios.botonEliminar}
        onPress={() => EliminarServicio(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

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

    const EmptyComponent = () => (
    <View style={EstilosMisServicios.noResultsContainer}>
      <Text style={EstilosMisServicios.sinServicios}>Aún no tienes servicios vinculados.</Text>
      <Image
        source={require('./estilos/bored.png')}
        style={EstilosMisServicios.noResultsImage}
        resizeMode="contain"
      />
    </View>
  );

return (
  <TouchableWithoutFeedback onPress={() => mostrarDesplegable && setMostrarDesplegable(false)}>
    <View style={{ flex: 1 }}>
      <SafeAreaView style={EstilosMisServicios.safeContainer}>
        <EncabezadoPerfil onToggleMenu={toggleDesplegable} />
        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />
        <BarraPestanasPerfil />

        <TouchableOpacity
          style={EstilosMisServicios.botonAgregarServicio}
          onPress={() => navigation.navigate('AgregarServicio1')}
        >
          <Ionicons name="add" size={20} color={Colors.naranja} />
          <Text style={EstilosMisServicios.textoBoton}>Agregar servicio</Text>
        </TouchableOpacity>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          contentContainerStyle={EstilosMisServicios.listaServicios}
          ListEmptyComponent={!loading ? <EmptyComponent /> : null}
          ListHeaderComponent={
            loading ? (
              <Text style={EstilosMisServicios.cargando}>Cargando servicios...</Text>
            ) : null
          }
          showsVerticalScrollIndicator={true}
        />

        <NavBarInferior activeScreen="MisServicios" onNavigate={handleNavigation} />
      </SafeAreaView>

      <CustomSnackbar visible={visible} setVisible={setVisible} message={message} />
    </View>
  </TouchableWithoutFeedback>
);
};

export default MisServicios;