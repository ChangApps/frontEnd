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

//Aca se definen los parametros que reciben las pantallas
export type RootStackParamList = {
  InicioDeSesion: undefined;
  Registro: undefined;
  Verificacion1Mail: { datosUsuario: any };
  Verificacion2Registro: {datosUsuario:any};
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
          
          
     
    </Stack.Navigator>
    </NavigationContainer>

  );
};