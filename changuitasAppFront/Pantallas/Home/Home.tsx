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
  const [trabajosNotificados, setTrabajosNotificados] = useState<any[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [trabajoActual, setTrabajoActual] = useState<any | null>(null);

  const caracteristicas = [
    '+30 servicios',
     'Confiable',
     'Ushuaia'
      
  ];

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

  const onDismissSnackbar = () => {
  setSnackbarVisible(false);

  // Después de un pequeño delay, limpiar `trabajoActual` para permitir mostrar el siguiente
  setTimeout(() => {
    setTrabajoActual(null);
  }, 300); // tiempo suficiente para evitar solapamiento visual
};

  const guardarTrabajosNotificados = async (ids: string[]) => {
  try {
    await AsyncStorage.setItem('trabajosNotificados', JSON.stringify(ids));
  } catch (error) {
    console.error("Error al guardar trabajos notificados:", error);
  }
};

const obtenerTrabajosNotificados = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem('trabajosNotificados');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al obtener trabajos notificados:", error);
    return [];
  }
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
      const trabajosNotificados = await obtenerTrabajosNotificados();

      // Filtrar trabajos nuevos (pendientes y no notificados aún)
      const trabajosNuevos = data.filter((solicitud: any) => 
        solicitud.estado === "PA" && !trabajosNotificados.includes(String(solicitud.id))
      );

      if (trabajosNuevos.length > 0) {
       const nuevosIds = trabajosNuevos.map((solicitud: any) => String(solicitud.id));
       await guardarTrabajosNotificados([...trabajosNotificados, ...nuevosIds]);

       setTrabajosNotificados(trabajosNuevos); // Cola de solicitudes
       console.log("Trabajo nuevo pendiente detectado:", trabajosNuevos);
      }
    }

  } catch (error) {
    console.error("Error al verificar trabajos pendientes:", error);
  }
};

  const guardarTrabajosNotificadosCliente = async (ids: string[]) => {
  try {
    await AsyncStorage.setItem('solicitudesAceptadasNotificadas', JSON.stringify(ids));
  } catch (error) {
    console.error("Error al guardar solicitudes aceptadas:", error);
  }
};

const obtenerTrabajosNotificadosCliente = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem('solicitudesAceptadasNotificadas');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al obtener solicitudes aceptadas:", error);
    return [];
  }
};

  const verificarSolicitudesAceptadas = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/historial/cliente/${userId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.warn("No se pudieron verificar solicitudes aceptadas del cliente");
      return;
    }

    const data = await response.json();
    if (!Array.isArray(data)) return;

    const trabajosNotificadosCliente = await obtenerTrabajosNotificadosCliente();

    const solicitudesAceptadas = data.filter((solicitud: any) =>
      solicitud.estado === "I" && !trabajosNotificadosCliente.includes(String(solicitud.id))
    );

    if (solicitudesAceptadas.length > 0) {
      const nuevosIds = solicitudesAceptadas.map((solicitud: any) => String(solicitud.id));
      await guardarTrabajosNotificadosCliente([...trabajosNotificadosCliente, ...nuevosIds]);

      setTrabajosNotificados(prev => [...prev, ...solicitudesAceptadas]); // Se acumulan
    }

  } catch (error) {
    console.error("Error al verificar solicitudes aceptadas:", error);
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
      await verificarTrabajosPendientes(data.id, accessToken); //proveedor
      await verificarSolicitudesAceptadas(data.id, accessToken); // cliente

    } catch (error) {
      console.error('Error al obtener usuario logueado:', error);
       logout(); 
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
          logout(); 
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

  useEffect(() => {
  if (!snackbarVisible && trabajosNotificados.length > 0 && !trabajoActual) {
    const siguiente = trabajosNotificados[0];
    setTrabajoActual(siguiente);
    setTrabajosNotificados(prev => prev.slice(1));
    setSnackbarVisible(true);
  }
}, [trabajosNotificados, snackbarVisible, trabajoActual]);

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    }  catch (error: any) {
        console.log('Error en el cierre de sesión:', error.message);
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
              onDismiss={onDismissSnackbar}  // Ocultar el Snackbar cuando se cierre
              duration={Snackbar.DURATION_SHORT} 
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
              {trabajoActual && (
              <Text style ={{color:"white"}}>
                {trabajoActual.estado === "PA"
                  ? `${trabajoActual.cliente_nombre} solicitó tu servicio de ${trabajoActual.nombreServicio}`
                  : `La solicitud que mandaste para ${trabajoActual.nombreServicio} fue aceptada`}
              </Text>
            )}
            </Snackbar>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PantallaHome;

