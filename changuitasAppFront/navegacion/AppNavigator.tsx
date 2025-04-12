import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioDeSesion from '../Pantallas/Registro-Login/InicioDeSesion';


//Aca se definen los parametros que reciben las pantallas
export type RootStackParamList = {
  InicioDeSesion: undefined;

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
     
    </Stack.Navigator>
    </NavigationContainer>

  );
};