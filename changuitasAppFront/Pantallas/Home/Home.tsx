import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView,  TouchableOpacity} from 'react-native';
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { renovarToken } from '../../autenticacion/authService';
import EstilosHome from './estilos/EstilosHome';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';

//import { AuthContext } from '../Autenticacion/auth';


const PantallaHome = () => {
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [accessToken, setAccessToken] = useState('');
//  const [state,setState] = useContext(AuthContext);
  const caracteristicas = [
    '+30 servicios',
     'Confiable',
     'Ushuaia'
      
  ];



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
  //    setState({ token: "" });
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
    <SafeAreaView style={EstilosHome.contenedor}>
      {/* Encabezado */}
      <View style={EstilosHome.encabezado}>
        <Text style={EstilosHome.textoInicio}>Inicio</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Text style={EstilosHome.menuPuntos}>...</Text>
        </TouchableOpacity>
      </View>

      {/* Menú Desplegable */}
      {mostrarDesplegable && (
        <View style={EstilosHome.desplegable}>
          <TouchableOpacity style={EstilosHome.opcionDesplegable}>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosHome.opcionDesplegable}>
            <Text onPress={logout} style={EstilosHome.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

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
    </SafeAreaView>
  );
};

export default PantallaHome;

