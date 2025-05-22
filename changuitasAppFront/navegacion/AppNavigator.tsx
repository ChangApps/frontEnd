import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../autenticacion/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
//------------Registro-Login-------------
import InicioDeSesion from '../Pantallas/Registro-Login/InicioDeSesion';
import PantallaAyuda from '../Pantallas/Registro-Login/PantallaAyuda';
import Registro from '../Pantallas/Registro-Login/Registro';
//----------------------------------------

//------------Verificacion-------------
import Verificacion1Mail from '../Pantallas/Verificacion/Verificacion1Mail';
import Verificacion2Registro from '../Pantallas/Verificacion/Verificacion2Registro';
//----------------------------------------

import RecuperarContrasena1 from '../Pantallas/RecuperarAcceso/RecuperarContrasena1';
import RecuperarContrasena2 from '../Pantallas/RecuperarAcceso/RecuperarContrasena2';
import RecuperarContrasena3 from '../Pantallas/RecuperarAcceso/RecuperarContrasena3';
import RecuperarNombreUsuario from '../Pantallas/RecuperarAcceso/RecuperarNombreUsuario';

import Home from '../Pantallas/Home/Home';

import PerfilUsuario from '../Pantallas/Usuario/PerfilUsuario';
import Resenias from '../Pantallas/Usuario/Resenias';
import UsuariosBloqueados from '../Pantallas/Usuario/UsuariosBloqueados';
import MisServicios from '../Pantallas/Usuario/MisServicios';
import EditarPerfil from '../Pantallas/Usuario/EditarPerfil';

import AgregarServicio1 from '../Pantallas/Servicios/AgregarServicio1';
import AgregarServicio2 from '../Pantallas/Servicios/AgregarServicio2';

import BuscarServicio1 from '../Pantallas/Buscar/BuscarServicio1';
import BuscarServicio2 from '../Pantallas/Buscar/BuscarServicio2';
import ResultadosBusqueda from '../Pantallas/Buscar/ResultadosBusqueda';
import PerfilProveedor from '../Pantallas/Buscar/PerfilProveedor';
import DetalleTarea from '../Pantallas/Buscar/DetalleTarea';
import CalificarTarea from '../Pantallas/Buscar/CalificarTarea';

import Historial1 from '../Pantallas/Historial/Historial1';
import Historial2 from '../Pantallas/Historial/Historial2';

//Aca se definen los parametros que reciben las pantallas
export type RootStackParamList = {
  InicioDeSesion: undefined;
  PantallaAyuda: undefined;
  Registro: undefined;
  Verificacion1Mail: { datosUsuario: any };
  Verificacion2Registro: {datosUsuario:any};
  RecuperarContrasena1: undefined;
  RecuperarContrasena2: { email: string }; 
  RecuperarContrasena3: { id: any[] };
  RecuperarNombreUsuario: undefined;
  Home:undefined;
  PerfilUsuario:undefined;
  Resenias:{idUsuario: any };
  UsuariosBloqueados:undefined;
  MisServicios:undefined;
  EditarPerfil:undefined;
  AgregarServicio1:undefined;
  AgregarServicio2: { selectedServices: string[] }; // Define que AgregarServicio2 espera un parametro
  BuscarServicio1:undefined;
  BuscarServicio2: { selectedService: string[] };
  ResultadosBusqueda: { 
    proveedores: any[]; 
    error?: string; // Para el mensaje de error
  };
  PerfilProveedor: { id: any[] };
  DetalleTarea: { id: string; idSolicitud: string };
  CalificarTarea: { idSolicitud: string };
  Historial1: undefined;
  Historial2: undefined;
};

// Crea una instancia(como una lista) del stack navigator con el tipo RootStackParamList(rutas a navegar)
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [state] = useContext(AuthContext);

  const authenticated = state.token !== "";
  const PERSISTENCE_KEY = "NAVIGATION_STATE";

  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        if (savedState) {
          setInitialState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error("Error al restaurar el estado de navegación:", error);
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) {
    return null; //Puede ser una pantalla de carga
  }


  const linking = {
    prefixes: ['http://localhost:8081', 'https://localhost:8081'],
    config: {
      screens: {
        InicioDeSesion: 'inicio-sesion/',
        Registro: 'registro/',
        Verificacion1Mail: 'verificacion-mail/',
        Verificacion2Registro: 'verificacion-registro/',
        RecuperarContrasena1: 'recuperar-contrasena/',
        RecuperarContrasena2: 'recuperar-contrasena-2-email/',  
        RecuperarContrasena3: 'recuperar-contrasena-3/',
        RecuperarNombreUsuario: 'recuperar-nombre-usuario/',
        Home: 'home/',
        PerfilUsuario: 'perfil/',  
        Resenias: 'resenias/', 
        UsuariosBloqueados: 'usuarios-bloqueados/',
        MisServicios: 'mis-servicios/',
        EditarPerfil: 'editar-perfil/', 
        AgregarServicio1: 'agregar-servicio-1/',
        AgregarServicio2: 'agregar-servicio-2/',
        BuscarServicio1: 'buscar-servicio-1/',
        BuscarServicio2: 'buscar-servicio-2/',  
        ResultadosBusqueda: 'resultados-busqueda/',
        PerfilProveedor: 'perfil-proveedor/', 
        DetalleTarea: 'detalle-tarea/', 
        CalificarTarea: 'calificar-tarea/', 
        Historial1: 'historial-1/',
        Historial2: 'historial-2/',
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      initialState={initialState}
      onStateChange={async (state) => {
        try {
          const stateString = JSON.stringify(state);
          await AsyncStorage.setItem(PERSISTENCE_KEY, stateString);
        } catch (error) {
          console.error("Error al guardar el estado de navegación:", error);
        }
      }}
    >
     
    <Stack.Navigator
      initialRouteName={authenticated ? "Home" : "InicioDeSesion"}
      screenOptions={{
        cardStyle: { flex: 1 }, // Para que el scroll funcione en web
      }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PerfilUsuario"
            component={PerfilUsuario}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Resenias"
            component={Resenias}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UsuariosBloqueados"
            component={UsuariosBloqueados}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MisServicios"
            component={MisServicios}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AgregarServicio1"
            component={AgregarServicio1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AgregarServicio2"
            component={AgregarServicio2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuscarServicio1"
            component={BuscarServicio1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuscarServicio2"
            component={BuscarServicio2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResultadosBusqueda"
            component={ResultadosBusqueda}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PerfilProveedor"
            component={PerfilProveedor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalleTarea"
            component={DetalleTarea}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CalificarTarea"
            component={CalificarTarea}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Historial1"
            component={Historial1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Historial2"
            component={Historial2}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
         <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen
            name="InicioDeSesion"
            component={InicioDeSesion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PantallaAyuda"
            component={PantallaAyuda}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verificacion1Mail"
            component={Verificacion1Mail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verificacion2Registro"
            component={Verificacion2Registro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecuperarContrasena1"
            component={RecuperarContrasena1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecuperarContrasena2"
            component={RecuperarContrasena2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecuperarContrasena3"
            component={RecuperarContrasena3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecuperarNombreUsuario"
            component={RecuperarNombreUsuario}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
}