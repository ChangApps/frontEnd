import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,Alert, FlatList, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from '../../auxiliares/API_URL';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import EstilosMisServicios from './estilos/EstilosMisServicios';
import BarraPestanasPerfil from '../../auxiliares/BarraPestanasPerfil';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import MenuDesplegable from '../../auxiliares/MenuDesplegable';

const MisServicios = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  interface Servicio {
    id: number;
    nombreServicio: string;
    descripcion: string;
    dia?: string;
    desdeHora?: string;
    hastaHora?: string;
    dias?: Array<{
      dia: string;
      desdeHora: string;
      hastaHora: string;
    }>;
  }
  
  const [services, setServices] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state,setState] = useContext(AuthContext);
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState(null);
  
  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };
 
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
  
  const EliminarServicio = async (serviceId: any) => {
    try {
      // Almacena el id del servicio en la variable de estado antes de borrar
      setIdServicioSeleccionado(serviceId);

      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Token de acceso no encontrado');
      }

     console.log("Eliminado el servicio: ",serviceId);

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
        alert("Error al eliminar el servicio");
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
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosMisServicios.contenedor}>
        {/* Header con Perfil*/}
        <View style={EstilosMisServicios.header}>
          <Text style={EstilosMisServicios.textoEncabezado}>Perfil</Text>
          <TouchableOpacity onPress={toggleDesplegable}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
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

        {/* Botón Agregar Servicio */}
        <TouchableOpacity 
          style={EstilosMisServicios.botonAgregarServicio} 
             onPress={() => navigation.navigate('AgregarServicio1')}
        >
          <Ionicons name="add" size={20} color="#197278" />
          <Text style={EstilosMisServicios.textoBoton}>Agregar servicio</Text>
        </TouchableOpacity>

         {/* Muestra la lista de Servicios y en caso de que aun no tenga ninguno muestra un mensaje */}
         {loading ? (
          <Text style={EstilosMisServicios.cargando}>Cargando servicios...</Text>
        ) : services.length === 0 ? (
          <View style={EstilosMisServicios.noResultsContainer}>
          <Text style={EstilosMisServicios.sinServicios}>Aún no tienes servicios vinculados.</Text>
          <Image
              source={require('./estilos/bored.png')}
              style={EstilosMisServicios.noResultsImage}
              resizeMode="contain"
            />
          </View>
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderServiceItem}
            contentContainerStyle={EstilosMisServicios.listaServicios}
          />
        )}

      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>        
    </SafeAreaView>
 </TouchableWithoutFeedback>
  );
};

export default MisServicios;