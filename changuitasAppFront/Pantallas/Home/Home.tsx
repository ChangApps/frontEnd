import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView,  TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { renovarToken } from '../../autenticacion/authService';
import EstilosHome from './estilos/EstilosHome';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import API_URL from '../../auxiliares/API_URL';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../../autenticacion/auth';
import MenuDesplegable from '../../auxiliares/MenuDesplegable';
import { Snackbar } from 'react-native-paper';

const PantallaHome = () => {
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const [state,setState] = useContext(AuthContext);
  const caracteristicas = [
    '+30 servicios',
     'Confiable',
     'Ushuaia'
      
  ];
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

  const verificarTrabajosPendientes = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/historial/proveedor/${userId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.warn("No se pudieron verificar trabajos pendientes");
      return;
    }

    const data = await response.json();

    if (data.message === "No se encontraron solicitudes para este usuario donde sea proveedor") {
      return; // No hacemos nada si no es proveedor o no hay solicitudes
    }

    // En caso de que data sea un arreglo de solicitudes, verifico trabajos pendientes
    if (Array.isArray(data)) {
      const trabajosPendientes = data.some((solicitud: any) => solicitud.estado === "PA");
      if (trabajosPendientes && !snackbarVisible) {
        setSnackbarVisible(true);
        console.log("Trabajo pendiente detectado: ", data);
      }
    }

  } catch (error) {
    console.error("Error al verificar trabajos pendientes:", error);
  }
};

  const fetchUsuarioLogueado = async () => {
    try {
        // 1. Obtengo el userId y el token desde AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!userId || !accessToken) {
        throw new Error('Faltan credenciales');
      }
  
      // 2. Obtengo los datos del usuario utilizando el  ID
      const response = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) throw new Error('Error al obtener el usuario');
  
      const data = await response.json();
      //setUsuario(data);//local
      await verificarTrabajosPendientes(data.id, accessToken);
    

    } catch (error) {
      console.error('Error al obtener usuario logueado:', error);
    }
  };
  
  

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
            await fetchUsuarioLogueado();
        }
      } catch (error) {
        console.error("Error al obtener el accessToken desde AsyncStorage:", error);
      }
    };
  
    fetchAccessToken();
  
    const intervalId = setInterval(async () => {
      try {
        const newAccessToken = await renovarToken();
      //  console.log("Intentando renovar token...");
  
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          await AsyncStorage.setItem('accessToken', newAccessToken);
        } else {
          console.warn("No se pudo renovar el token. Cerrando sesión...");
          logout(); 
        }
      } catch (err) {
        const error = err as AxiosError;
      
        console.error("Error al renovar el token:", error);
      
        if (error.response) {
          const status = error.response.status;
      
          if (status === 401) {
            console.warn("Token inválido o expirado. Cerrando sesión...");
          } else if (status >= 500) {
            console.warn("Error del servidor. Cerrando sesión...");
          } else {
            console.warn("Error inesperado");
          }
      
          Alert.alert("Error", "Ocurrió un problema con tu sesión. Serás redirigido al inicio.");
        } else if (error.request) {
          console.warn("No se pudo contactar con el servidor.");
          Alert.alert("Sin conexión", "No se pudo contactar con el servidor. Cerrando sesión.");
        } else {
          console.warn("Error desconocido:", error.message);
          Alert.alert("Error", "Ocurrió un error inesperado.");
        }
      
        logout();
      }
    }, 60000); // Cada 1 minuto
    return () => clearInterval(intervalId);
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

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosHome.contenedor}>
        {/* Encabezado */}
        <View style={EstilosHome.encabezado}>
          <Text style={EstilosHome.textoInicio}>Inicio</Text>
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

        {/* Contenido Principal */}
        <View style={EstilosHome.contenidoPrincipal}>
          <Text style={EstilosHome.tituloApp}>Changuitas{'\n'}App</Text>
          
          <View style={EstilosHome.contenedorCaracteristicas}>
            {caracteristicas.map((item, indice) => (
              <TouchableOpacity key={indice} style={EstilosHome.cajaCaracteristica}>
                <Text style={EstilosHome.textoCaracteristica}>• {item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <BarraNavegacionInferior/>
          <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}  // Ocultar el Snackbar cuando se cierre
              duration={Snackbar.DURATION_LONG} 
              action={{
                label: 'Tocá para ver ',
                onPress: () => {
                  setSnackbarVisible(false);
                  navigation.navigate("Historial2");
                },
              }}
              style={{
              position: 'absolute',
              top: -150,
              left: 0,
              right: 0,
              zIndex: 100000,  // Alto para asegurarse de que esté encima de otros elementos
              }}
              >
              <Text style ={{color:"white"}}>
              Tenés una solicitud de trabajo pendiente
              </Text> 
            </Snackbar>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PantallaHome;

