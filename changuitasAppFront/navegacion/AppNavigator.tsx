import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//------------Registro-Login-------------
import InicioDeSesion from '../Pantallas/Registro-Login/InicioDeSesion';
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


  return (
    <NavigationContainer>

      <Stack.Navigator
      initialRouteName={"InicioDeSesion"}
      screenOptions={{
        cardStyle: { flex: 1 }, // Para que el scroll funcione en web
      }}
      >    
      <Stack.Screen 
              name="InicioDeSesion" 
              component={InicioDeSesion} 
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
      </Stack.Navigator>
    </NavigationContainer>

  );
};