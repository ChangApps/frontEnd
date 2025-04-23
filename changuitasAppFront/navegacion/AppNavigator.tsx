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
};

// Crea una instancia(como una lista) del stack navigator con el tipo RootStackParamList(rutas a navegar)
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {


  return (
    <NavigationContainer >

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
     
    </Stack.Navigator>
    </NavigationContainer>

  );
};