import {SafeAreaView,Text, TextInput, TouchableOpacity, View, useWindowDimensions, } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosInicioDeSesion from './estilos/EstilosInicioDeSesion';
import API_URL from "../../auxiliares/API_URL";

const InicioDeSesion = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  const login = async () => {
    // Verifica si los campos están vacíos o contienen solo espacios
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }
  
    try {
      // Realiza la solicitud POST a la api
      const { data } = await axios.post(`${API_URL}/login/`, { username, password });
  
      // Verifica si la respuesta contiene un error relacionado con las credenciales
      if (data.error) {
        // Si la API devuelve un error, muestra el mensaje adecuado
        if (data.error.includes('invalid')) {
          setErrorMessage('Nombre de usuario o contraseña incorrectos.');
        } else {
          setErrorMessage(data.error);  // Muestra cualquier otro error que pueda venir
        }
        return;  // Sale si hay un error en los datos recibidos
      }
  
      // Almacena el token en AsyncStorage
      await AsyncStorage.setItem('@auth', JSON.stringify({ token: data.access }));
      console.log('Token guardado:', data.access);
  
      // Almacena los tokens y el userId en AsyncStorage
      await AsyncStorage.setItem('accessToken', data.access);
      await AsyncStorage.setItem('refreshToken', data.refresh);
      await AsyncStorage.setItem('userId', data.id.toString());
  
      // Limpia los campos de username y password después del login exitoso
      setusername('');
      setPassword('');
  
      // Navega a la pantalla principal (Home)
      navigation.navigate('Home');
  
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Solicitud incorrecta. Verifica tu nombre de usuario y contraseña.');
      } else {
        // Si ocurre un error inesperado o de red
        setErrorMessage(error.message || 'Error de red o servidor.');
      }
    }
  };
  
  return (
    <SafeAreaView style={EstilosInicioDeSesion.areaSegura}>
      <View style={[EstilosInicioDeSesion.contenedor, width > 600 && EstilosInicioDeSesion.contenedorWeb]}>
        <View style={EstilosInicioDeSesion.encabezado}>
          <Text style={EstilosInicioDeSesion.titulo}>Iniciar sesión</Text>
        </View>

       {/* Mensaje de error */}
        {errorMessage && (
          <View style={EstilosInicioDeSesion.errorContainer}>
            <Text style={EstilosInicioDeSesion.errorText}>Error: {errorMessage}</Text>
          </View>
        )}
        {/* Campos de entrada */}
        <View style={EstilosInicioDeSesion.contenedorEntrada}>
          <Text style={EstilosInicioDeSesion.etiqueta}>Nombre de usuario</Text>
          <TextInput
            placeholder="changuitas1"
            placeholderTextColor="#666"
            style={EstilosInicioDeSesion.entrada}
            value={username}
            onChangeText={setusername}
          />

          <Text style={EstilosInicioDeSesion.etiqueta}>Contraseña</Text>
          <View style={EstilosInicioDeSesion.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={EstilosInicioDeSesion.entradaContrasena}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={EstilosInicioDeSesion.iconoOjo}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            >
              <Ionicons
                name={mostrarContrasena ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>


        {/* Botón de ingresar */}
        <TouchableOpacity onPress={login}>
          <LinearGradient
            colors={["#197278", "#9BCDC8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={EstilosInicioDeSesion.degradadoBoton}
          >
            <Text style={EstilosInicioDeSesion.textoBoton}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

      {/* Botón ayuda */}
    <TouchableOpacity onPress={() => navigation.navigate('PantallaAyuda')}>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>Ayuda</Text>
        </TouchableOpacity>

      {/* Botón de registrarse */}
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>

    {/* Botón de recuperar nombre de usuario */}
    <TouchableOpacity onPress={() => navigation.navigate('RecuperarNombreUsuario')}>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>Olvidé mi nombre de usuario</Text>
        </TouchableOpacity>
        
   {/* Botón de recuperar contraseña */}
    <TouchableOpacity onPress={() => navigation.navigate('RecuperarContrasena1')}>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>Olvidé mi contraseña</Text>
        </TouchableOpacity>

 </View>
    </SafeAreaView>
  );
};

export default InicioDeSesion;